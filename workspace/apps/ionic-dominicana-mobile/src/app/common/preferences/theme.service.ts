import { Injectable, Inject, EventEmitter, NgZone } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

/**
 * Own
 */
// services
import { Identifier } from "@app/shared/decorators/identifier";
import { THEME_SERVICE_TOKEN } from "../tokens";

// symbols
import { THEMES, ACTIVE_THEME, IAppTheme } from "./customs";
import { AppTheme } from "./customs/themes.enum";
import { IThemeService } from "./theme.service.model";

@Injectable({
    providedIn: "root",
})
@Identifier({
    token: THEME_SERVICE_TOKEN
})
export class ThemeService {

    public appCustomThemeKey = "app-custom-theme";
    public themeChange = new EventEmitter<IAppTheme>();
    public defaultDarkThemeOSConfig: MediaQueryList;
    public prefersThemExistingFromAppSettings: string;

    constructor(
        @Inject(THEMES) public themes: IAppTheme[],
        @Inject(ACTIVE_THEME) public theme: string,
        private translateService: TranslateService
    ) {
        // to do
    }

    public prepareAppCustomTheme(): void {
        this.getPrefersTheme();
    }

    public getActiveTheme(): IAppTheme {
        const theme = this.themes.find(t => t.name === this.theme);
        if (!theme) {
            throw new Error(`${this.translateService.instant("SYSTEM.COMMON.MESSAGES.ERRORS.CUSTOM_THEME_NOT_FOUND")}: '${this.theme}'`);
        }
        return theme;
    }

    public setTheme(name: string, fromOSConfig?: boolean): void {
        this.theme = name;
        if (!fromOSConfig) {
            localStorage.setItem(this.appCustomThemeKey, this.theme);
            this.prefersThemExistingFromAppSettings = this.theme;
            this.themeChange.emit(this.getActiveTheme());
            this.defaultDarkThemeOSConfig.removeEventListener("change", this.prefersOSThemeHandler.bind(this), true);
            return;
        }
        // production
        if (!this.prefersThemExistingFromAppSettings){
            this.themeChange.emit(this.getActiveTheme());
        }
    }

    private detectPrefersTheme() {
        // detect if prefers-color-scheme is supported
         if (this.defaultDarkThemeOSConfig.media !== "not all") {
             // set colorScheme to Dark if prefers-color-scheme is dark. Otherwise set to light
             const newPrefersTheme = this.defaultDarkThemeOSConfig.matches ? AppTheme.DARK : AppTheme.LIGHT;
             this.setTheme(newPrefersTheme, true);

             this.defaultDarkThemeOSConfig.addEventListener("change", this.prefersOSThemeHandler.bind(this), true);
             return;
        }
        // if the browser doesn't support prefers-color-scheme, set it as default to dark
        this.setTheme(AppTheme.LIGHT);
    }

    private prefersOSThemeHandler($evt: MediaQueryListEvent): void {
        this.setTheme(($evt.matches) ? AppTheme.DARK : AppTheme.LIGHT, true);
    }

    private getPrefersTheme() {
        this.prefersThemExistingFromAppSettings = localStorage.getItem(this.appCustomThemeKey);
        this.defaultDarkThemeOSConfig = window.matchMedia("(prefers-color-scheme: dark)");

        if (this.prefersThemExistingFromAppSettings) {
            this.setTheme(this.prefersThemExistingFromAppSettings)
            return;
        }
        this.detectPrefersTheme();
    }
}
