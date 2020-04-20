import { InjectionToken } from "@angular/core";

/**
 * Models
 */
import { IFacadeService, IDataService, IProfileDataService } from "../common";
import { IAuthenticationService, IAuthorizationService } from "../identity";
import { IConfigService } from "./config/config.service.model";
import { ITranslationService } from "./i18n/translation.service.model";
import { IUtilService, INotificationService } from "./utilities";
import { IQuestionControlService } from "./forms/question-control.service.model";
import { IDocumentGenerationService } from "./utilities/reports/document-generation.service.model";
import { IThemeService } from "./preferences/theme.service.model";

/**
 * Tokens
 */
export const AUTHENTICATION_SERVICE_TOKEN: InjectionToken<IAuthenticationService> = new InjectionToken<IAuthenticationService>("authenticationService");
export const AUTHORIZATION_SERVICE_TOKEN: InjectionToken<IAuthorizationService> = new InjectionToken<IAuthorizationService>("authorizationService");
export const FACADE_SERVICE_TOKEN: InjectionToken<IFacadeService> = new InjectionToken<IFacadeService>("facadeService");
export const CONFIG_SERVICE_TOKEN: InjectionToken<IConfigService> = new InjectionToken<IConfigService>("configService");
export const DATA_SERVICE_TOKEN: InjectionToken<IDataService> = new InjectionToken<IDataService>("dataService");
export const PROFILE_DATA_SERVICE_TOKEN: InjectionToken<IProfileDataService> = new InjectionToken<IProfileDataService>("profileDataService");
export const TRANSLATION_SERVICE_TOKEN: InjectionToken<ITranslationService> = new InjectionToken<ITranslationService>("translationService");
export const NOTIFICATION_SERVICE_TOKEN: InjectionToken<INotificationService> = new InjectionToken<INotificationService>("notificationService");
export const UTIL_SERVICE_TOKEN: InjectionToken<IUtilService> = new InjectionToken<IUtilService>("utilService");
export const QUESTION_CONTROL_SERVICE_TOKEN: InjectionToken<IQuestionControlService> = new InjectionToken<IQuestionControlService>("questionControlService");
export const DOCUMENT_GENERATION_SERVICE_TOKEN: InjectionToken<IDocumentGenerationService> = new InjectionToken<IDocumentGenerationService>("documentGenerationService");
export const THEME_SERVICE_TOKEN: InjectionToken<IThemeService> = new InjectionToken<IThemeService>("documentGenerationService");
