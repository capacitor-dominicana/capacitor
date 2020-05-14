/**
 * Own
 */
// models
import { IAppTheme } from "./app-theme.model";
import { AppTheme } from "./themes.enum";

export const appLightTheme: IAppTheme = {
    name: AppTheme.LIGHT,
    // ["app-light-theme"] currently default is light-theme. If you want to separate, put light instead of default
    cssClasses: ["app-default-theme"]
};
