/**
 * Own
 */
import { AuthorizationRole } from "../identity";
import { IAppMaintenance } from "../common/config/maintenance/maintenance.model";

export interface ILifecycleApp {
    ENABLE_DEBUG?: boolean;
    IS_APPLICATION_INSIGHTS?: boolean;
    IS_AUTHENTICATED?: boolean;
    IS_HTTP_REQUEST_VALID?: boolean;
    IS_THIRDPARTY_ENROLL?: AuthorizationRole;
    DEFAULT_COUNTRY?: string;
    DEFAULT_BRANDING_LINK_ID?: string;
    DEFAULT_IMAGE_SRC?: string;
    DEFAULT_HEADER_LOGO_ID?: string;
    DEFAULT_HEADER_LOGO_SRC?: string;
    SITE_MAINTENANCE_INFORMATION?: IAppMaintenance;
}
