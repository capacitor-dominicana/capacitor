import { Observable } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

/**
 * Own
 */
// models
import { IApiResponse } from "../config/api";
import { ITuple } from "@capacitor/shared/helpers";

export interface ITranslationService {
    getI18nSource(langIsoCode?: string, localTranslationsInstead?: any): Observable<IApiResponse<any>>;
    getTranslation(lang: string, localTranslationsInstead?: boolean): Observable<any>;
    getInstantText(key: string | string[]): string;
    updateTranslations(keyValue: ITuple<string>, langIsoCode?: string): Observable<any>;
    syncLocalTranslationsToServer(langIsoCode?: string): Observable<any>;
    resetTranslationConfig(langIsoCode: string, translations: object, shouldMerge?: boolean, setDefault?: boolean, handler?: (success: boolean, reason: any) => void): void;
}
