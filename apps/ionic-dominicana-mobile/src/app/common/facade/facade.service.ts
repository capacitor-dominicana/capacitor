import { Injectable, Injector } from "@angular/core";

/**
 * Own
 */
import * as ProviderTokens from "../tokens";

// services
import { Identifier } from "@capacitor/shared/decorators";
import { IFacadeService } from "./facade.service.model";
import { IConfigService } from "../config/config.service.model";
import { ILifecycle, LifecycleFactory } from "../../lifecycle";
import { IDataService } from "../data/data.service.model";
import { IProfileDataService } from "../profile/profile-data.service.model";
import { IAuthenticationService, IAuthorizationService } from "../../identity";
import { INotificationService, IUtilService } from "../utilities";
import { ITranslationService } from "../i18n/translation.service.model";
import { IQuestionControlService } from "../forms";
import { IDocumentGenerationService } from "../utilities/reports";
import { IThemeService } from "../preferences";

@Injectable()
@Identifier({
    token: ProviderTokens.FACADE_SERVICE_TOKEN
})
export class FacadeService implements IFacadeService {

    private _config: IConfigService;
    private _lifecycle: ILifecycle;
    private _data: IDataService;
    private _profileData: IProfileDataService;
    private _authentication: IAuthenticationService;
    private _authorization: IAuthorizationService;
    private _notification: INotificationService;
    private _util: IUtilService;
    private _translation: ITranslationService;
    private _questionControl: IQuestionControlService;
    private _documentGeneration: IDocumentGenerationService;
    private _theme: IThemeService

    public get config(): IConfigService {
        if (!this._config) {
            this._config = this.injector.get(ProviderTokens.CONFIG_SERVICE_TOKEN);
        }
        return this._config;
    }

    public get lifecycle(): ILifecycle {
        if (!this._lifecycle) {
            this._lifecycle = (LifecycleFactory) ? this.injector.get(LifecycleFactory) : null;
        }
        return this._lifecycle;
    }

    public get data(): IDataService {
        if (!this._data) {
            this._data = this.injector.get(ProviderTokens.DATA_SERVICE_TOKEN);
        }
        return this._data;
    }

    public get profileData(): IProfileDataService {
        if (!this._profileData) {
            this._profileData = this.injector.get(ProviderTokens.PROFILE_DATA_SERVICE_TOKEN);
        }
        return this._profileData;
    }

    public get authentication(): IAuthenticationService {
        if (!this._authentication) {
            this._authentication = this.injector.get(ProviderTokens.AUTHENTICATION_SERVICE_TOKEN);
        }
        return this._authentication;
    }

    public get authorization(): IAuthorizationService {
        if (!this._authorization) {
            this._authorization = this.injector.get(ProviderTokens.AUTHORIZATION_SERVICE_TOKEN);
        }
        return this._authorization;
    }

    public get notification(): INotificationService {
        if (!this._notification) {
            this._notification = this.injector.get(ProviderTokens.NOTIFICATION_SERVICE_TOKEN);
        }
        return this._notification;
    }

    public get util(): IUtilService {
        if (!this._util) {
            this._util = this.injector.get(ProviderTokens.UTIL_SERVICE_TOKEN);
        }
        return this._util;
    }

    public get translation(): ITranslationService {
        if (!this._translation) {
            this._translation = this.injector.get(ProviderTokens.TRANSLATION_SERVICE_TOKEN);
        }
        return this._translation;
    }

    public get questionControl(): IQuestionControlService {
        if (!this._questionControl) {
            this._questionControl = this.injector.get(ProviderTokens.QUESTION_CONTROL_SERVICE_TOKEN);
        }
        return this._questionControl;
    }

    public get documentGeneration(): IDocumentGenerationService {
        if (!this._documentGeneration) {
            this._documentGeneration = this.injector.get(ProviderTokens.DOCUMENT_GENERATION_SERVICE_TOKEN);
        }
        return this._documentGeneration;
    }

    public get theme(): IThemeService {
        if (!this._theme) {
            this._theme = this.injector.get(ProviderTokens.THEME_SERVICE_TOKEN);
        }
        return this._theme;
    }

    constructor(private injector: Injector) {
        // to do
    }
}
