import { Directive, OnInit, ElementRef, Inject } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

/**
 * Own
 */
// settings
import { IAppTheme } from "../customs";

// services

import { DOCUMENT } from "@angular/common";
import { FACADE_SERVICE_TOKEN } from "../../tokens";
import { IFacadeService } from "../../facade/facade.service.model";

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "[appCustomTheme]"
})
export class ThemeDirective implements OnInit {

    private unsubscribe = new Subject();
    constructor(private _elementRef: ElementRef,
        @Inject(DOCUMENT) private document: Document,
        @Inject(FACADE_SERVICE_TOKEN) private facadeService: IFacadeService
    ) {
        // to do
    }

    ngOnInit() {
        const active = this.facadeService.theme.getActiveTheme();
        if (active) {
            this.updateTheme(active);
        }

        this.facadeService.theme.themeChange.pipe(takeUntil(this.unsubscribe))
            .subscribe((theme: IAppTheme) => {
                this.updateTheme(theme);
        });
    }

    public updateTheme(theme: IAppTheme) {
        // update classes
        if (theme && theme.cssClasses) {
            this.document.body.classList.forEach((val: string) => {
                if (val.match(/\b(\-theme)$/gi)) {
                    this.document.body.classList.remove(val);
                }
            });

            theme.cssClasses.forEach((val: string) => {
                this.document.body.classList.add(val);
            });
        }

        // update properties if exist
        for (const key in theme.properties) {
            if (theme.properties.hasOwnProperty(key)) {
                this._elementRef.nativeElement.style.setProperty(key, theme.properties[key]);
            }
        }
    }
}
