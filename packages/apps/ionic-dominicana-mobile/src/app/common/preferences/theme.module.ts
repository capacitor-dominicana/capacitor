import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

/**
 * Own
 */
import { ThemeService } from "./theme.service";
import { ThemeDirective } from "./directives/theme.directive";
import { THEMES, ACTIVE_THEME, IAppThemeOptions } from "./customs";

@NgModule({
    imports: [CommonModule],
    providers: [ThemeService],
    declarations: [ThemeDirective],
    exports: [ThemeDirective]
})
export class ThemeModule {
    static forRoot(options: IAppThemeOptions): ModuleWithProviders {
        return {
            ngModule: ThemeModule,
            providers: [{
                    provide: THEMES,
                    useValue: options.themes
                },
                {
                    provide: ACTIVE_THEME,
                    useValue: options.active
                }
            ]
        };
    }
}
