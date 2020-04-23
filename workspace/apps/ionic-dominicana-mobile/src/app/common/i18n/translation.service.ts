import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFirestore, DocumentSnapshot } from "@angular/fire/firestore";
import { TranslateService, TranslateLoader } from "@ngx-translate/core";
import { Observable, Observer } from "rxjs";
import * as _ from "lodash";

/**
 * Own
 */
// models
import { TRANSLATION_SERVICE_TOKEN, FACADE_SERVICE_TOKEN } from "../tokens";
import { ITranslationService } from "./translation.service.model";
import { Identifier, ITuple } from "@app/shared";
import { IApiResponse } from "../config/api";

// services
import { DataService } from "@app/common/data";
import { DataResolver } from "@app/app.resolver";
import { IFacadeService } from "../facade/facade.service.model";

@Injectable({
    providedIn: "root"
})
@Identifier({
    token: TRANSLATION_SERVICE_TOKEN
})
export class TranslationService extends DataService implements TranslateLoader, ITranslationService {
    public i18CollectionName = "i18n";

    constructor(public httpClient: HttpClient
        ,       @Inject(FACADE_SERVICE_TOKEN) public facadeService: IFacadeService
        ,       private dataResolver: DataResolver
        ,       private ngFirestore: AngularFirestore
        ,       private translateService: TranslateService
        ) {
            super(httpClient);
    }

    /**
     *
     * @param langIsoCode Specify a specific iso code to search for resources from it (e.g .: es or en)
     * @param localTranslationsInstead Specify true if you want to get local translations (project static files - fallback) instead of server translations
     */
    public getI18nSource(langIsoCode?: string, localTranslationsInstead?: any): Observable<IApiResponse<any>> {
        const stream = new Observable((observer: Observer<IApiResponse<any>>) => {
            const currentLangs = this.translateService.getLangs();
            if (currentLangs && currentLangs.length) {
                langIsoCode = langIsoCode || this.translateService.currentLang;
                langIsoCode = currentLangs.filter(x => x.toLocaleLowerCase() === langIsoCode)[0];
                if (langIsoCode) {
                    const currentTranslationObject = this.getTranslation(langIsoCode, localTranslationsInstead);
                    if (currentTranslationObject && currentTranslationObject._subscribe) {
                        currentTranslationObject.subscribe((response: IApiResponse<any>) => {
                            this.dataResolver.observerHandler(observer, null, true, null, {
                                    text: langIsoCode,
                                    value: response.result
                                } as ITuple<string>);
                        }, (reason: any) => {
                            this.dataResolver.observerHandler(observer, null, false, 1001, reason);
                        });
                        return;
                    } else {
                        this.dataResolver.observerHandler(observer, null, false, 1001, null);
                    }
                } else {
                    this.dataResolver.observerHandler(observer, null, false, 1001, null);
                }
            }
        });
        return stream;
    }

    /**
     * // own TranslateLoader that always loads the latest translation file available during your application build
     * @param lang current iso code from application
     * @localTranslationsInstead Specify true if you want to get local translations (project static files - fallback) instead of server translations
     */
    public getTranslation(lang: string, localTranslationsInstead?: boolean): Observable<any> {
        const stream = new Observable((observer: Observer<any>) => {
            if (localTranslationsInstead) {
                this.translateService.getTranslation(lang).subscribe((translations: any) => {
                    this.dataResolver.observerHandler(observer, null, true, null, translations);
                });
                return;
            }
            const i18nDocument = this.ngFirestore.collection(this.i18CollectionName).doc(lang);
                const i18nItem = i18nDocument.get()
                const unbscribeI18nDoc = i18nItem.subscribe((response: DocumentSnapshot<any>) => {
                    this.dataResolver.observerHandler(observer, null, true, null, response.data());
                    unbscribeI18nDoc.unsubscribe();
                }, (reason: any) => {
                    this.dataResolver.observerHandler(observer, null, false, null, reason);
                    unbscribeI18nDoc.unsubscribe();
                });
        });
        return stream;
    }

    public getInstantText(key: string | string[]): string {
        return this.translateService.instant(key);
    }

    public updateTranslations(keyValue: ITuple<string>, langIsoCode?: string): Observable<any> {
        const stream = new Observable((observer: Observer<any>) => {
            if (keyValue) {
                this.getI18nSource(langIsoCode).subscribe((response: IApiResponse<ITuple<string>>) => {
                    const keyExists = _.get(response.result.value, keyValue.value);
                    if (keyExists) {
                        // reason: https://stackoverflow.com/a/31303609/2904959
                        _.set(response.result.value as any, keyValue.value, keyValue.text);

                        // get firebase collection (e.g.: i18n)
                        const i18nDocument = this.ngFirestore.collection(this.i18CollectionName).doc(response.result.text);

                        // get firebase document id (e.g.: es or en)
                        i18nDocument.set(response.result.value).then((firebaseResult: void) => {
                            this.resetTranslationConfig(response.result.text, response.result.value as any, true, false, ((success: boolean, reason: any) => {
                                this.dataResolver.observerHandler(observer, null, success, null, reason);
                            }));
                        });
                    }
                    this.facadeService.lifecycle.appIsLoading = false;
                }, (reason: any) => {
                    this.facadeService.lifecycle.appIsLoading = false;
                });
            }
        });
        return stream;
    }

    public syncLocalTranslationsToServer(langIsoCode?: string): Observable<any> {
        const stream = new Observable((observer: Observer<any>) => {
            this.getI18nSource(langIsoCode, true).subscribe((response: IApiResponse<ITuple<string>>) => {
                // get firebase collection (e.g.: i18n)
                const i18nDocument = this.ngFirestore.collection(this.i18CollectionName).doc(response.result.text);

                // get document data from firestore reference
                i18nDocument.ref.get().then((val: firebase.firestore.DocumentSnapshot<any>) => {
                    // create or overwrite firebase document
                    i18nDocument.set(_.merge(response.result.value, (val.data() || {}))).then((firebaseResult: void) => {
                        this.resetTranslationConfig(response.result.text, response.result.value as any, true, false, ((success: boolean, reason: any) => {
                            this.dataResolver.observerHandler(observer, null, success, null, reason);
                        }));
                    });
                });
            }, (reason: any) => {
                this.dataResolver.observerHandler(observer, null, false, null, reason);
            });
        });
        return stream;
    }

    public resetTranslationConfig(langIsoCode: string, translations: object, shouldMerge?: boolean, setDefault?: boolean, handler?: (success: boolean, reason: any) => void): void {
        if (translations) {
            this.translateService.setTranslation(langIsoCode, translations, shouldMerge);
        }
        if (setDefault) {
            this.translateService.setDefaultLang(langIsoCode);
        }
        this.translateService.use(langIsoCode).subscribe((result: any) => {
            if (handler) {
                handler(true, result);
            }
        }, (reason: any) => {
            if (handler) {
                handler(false, reason);
            }
        });
    }
}
