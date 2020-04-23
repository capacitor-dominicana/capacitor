import { InjectionToken } from "@angular/core";

/**
 * Own
 */
// models
import { IAppTheme } from "./app-theme.model";

// consts
export const THEMES = new InjectionToken("THEMES");
export const ACTIVE_THEME = new InjectionToken("ACTIVE_THEME");

export interface IAppThemeOptions {
    themes: IAppTheme[];
    active: string;
}
