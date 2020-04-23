/**
 * Own
 */
// services
import { IConfigService } from "../config/config.service.model";
import { IDataService } from "../data";
import { ILifecycle } from "src/app/lifecycle";
import { IProfileDataService } from "../profile/profile-data.service.model";
import { IAuthenticationService, IAuthorizationService } from "src/app/identity";
import { INotificationService, IUtilService } from "../utilities";
import { ITranslationService } from "../i18n/translation.service.model";
import { IQuestionControlService } from "../forms";
import { IThemeService } from "../preferences";

export interface IFacadeService {
    config: IConfigService;
    data: IDataService;
    profileData: IProfileDataService;
    authentication: IAuthenticationService;
    authorization: IAuthorizationService;
    notification: INotificationService;
    util: IUtilService;
    lifecycle?: ILifecycle;
    translation?: ITranslationService;
    questionControl?: IQuestionControlService;
    theme?: IThemeService;
}
