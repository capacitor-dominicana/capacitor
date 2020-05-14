import { EventEmitter } from "@angular/core";

/**
 * Own
 */
// symbols
import { IAppTheme } from "./customs";

export interface IThemeService {
    themeChange: EventEmitter<IAppTheme>;
    prepareAppCustomTheme(): void;
    getActiveTheme(): IAppTheme;
    setTheme(name: string, fromOSConfig?: boolean): void;
}
