import { ClassProvider, NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

/**
 * Own
 */
// JS extensions (only for this project)
import "@capacitor/extensions/lookup";
import "@capacitor/extensions/map-and-filter";
import "@capacitor/extensions/storage";

// tokens
import * as ProviderTokens from "./tokens";

// providers
import { FacadeService } from "./facade";
import { ConfigService } from "./config/config.service";
import { DataService } from "./data/data.service";
import { UtilService } from "./utilities/util.service";
import { NotificationService } from "./utilities/notification.service";
import { ProfileDataService } from "./profile/profile-data.service";
import { TranslationService } from "./i18n/translation.service";
import { QuestionControlService } from "./forms";
import { ThemeService } from "./preferences/theme.service";

export const COMMON_PROVIDERS: ClassProvider[] = [
    { provide: ProviderTokens.FACADE_SERVICE_TOKEN,                     useClass: FacadeService }
    , { provide: ProviderTokens.CONFIG_SERVICE_TOKEN,                   useClass: ConfigService }
    , { provide: ProviderTokens.DATA_SERVICE_TOKEN,                     useClass: DataService }
    , { provide: ProviderTokens.UTIL_SERVICE_TOKEN,                     useClass: UtilService }
    , { provide: ProviderTokens.NOTIFICATION_SERVICE_TOKEN,             useClass: NotificationService }
    , { provide: ProviderTokens.PROFILE_DATA_SERVICE_TOKEN,             useClass: ProfileDataService }
    , { provide: ProviderTokens.TRANSLATION_SERVICE_TOKEN,              useClass: TranslationService }
    , { provide: ProviderTokens.QUESTION_CONTROL_SERVICE_TOKEN,         useClass: QuestionControlService }
    , { provide: ProviderTokens.THEME_SERVICE_TOKEN,                    useClass: ThemeService }
];

@NgModule({
    imports: [
        CommonModule
    ]
})
export class FeatureModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: FeatureModule,
            providers: [...COMMON_PROVIDERS]
        };
    }
}
