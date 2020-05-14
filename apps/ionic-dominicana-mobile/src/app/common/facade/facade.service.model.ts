/**
 * Own
 */
// services
import { IConfigService } from "../config/config.service.model";
import { ILifecycle } from "../../lifecycle";
import { IDataService } from "../data";
import { IProfileDataService } from "../profile/profile-data.service.model";
import { INotificationService, IUtilService } from "../utilities";
import { ITranslationService } from "../i18n/translation.service.model";
import { IAuthenticationService, IAuthorizationService } from "../../identity";
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
