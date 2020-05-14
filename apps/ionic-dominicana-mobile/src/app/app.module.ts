import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ServiceWorkerModule } from "@angular/service-worker";
import { BUCKET } from "@angular/fire/storage";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

/**
 * Own
 */
import { environment } from "../environments/environment";

// modules
import { AppRoutingModule } from "./app-routing.module";
import { FeatureModule } from "./common/feature.module";
import { DevModuleModule } from "./+dev-module";
import { HTTP_INTERCEPTORS_PROVIDERS } from "./common/config/http";
import { ThemeModule } from "./common/preferences/theme.module";

// providers
import { APP_RESOLVER_PROVIDERS } from "./app.resolver";
import { BootstrapService } from "./bootstrap.service";
import { InternalStateType, AppState } from "./app.service";

// components
import { AppComponent } from "./app.component";

// symbols
import { AppTheme } from "./common/preferences/customs/themes.enum";
import { appLightTheme, appDarkTheme } from "./common/preferences/customs";
import { NG_ENTITY_SERVICE_CONFIG } from "@datorama/akita-ng-entity-service";
import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";
import { AkitaNgRouterStoreModule } from "@datorama/akita-ng-router-store";

interface StoreType {
    state: InternalStateType;
    restoreInputValues: () => void;
    disposeOldHosts: () => void;
}

// application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState,
    BootstrapService,
    AngularFireAuthGuard,
    {
        provide: BUCKET,
        useValue: environment.firebase.storageBucket
    }
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FeatureModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ThemeModule.forRoot({
            themes: [appLightTheme, appDarkTheme],
            active: AppTheme.LIGHT
        }),
        SweetAlert2Module.forRoot(),
        environment.production
            ? ServiceWorkerModule.register("/ngsw-worker.js")
            : [],

        /**
         * This section will import the `DevModuleModule` only in certain build types.
         * When the module is not imported it will get tree shaked.
         * This is a simple example, a big app should probably implement some logic
         */
        ...(environment.showDevModule ? [DevModuleModule] : []),

        environment.production ? [] : AkitaNgDevtools,
        AkitaNgRouterStoreModule
    ],
    providers: [
        environment.ENV_PROVIDERS,
        APP_PROVIDERS,
        HTTP_INTERCEPTORS_PROVIDERS,
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: "https://jsonplaceholder.typicode.com" }}
        // currently, getAppSettingsResources from factory promise doesn"t have developed
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: (startupService: BootstrapService) => () => startupService.getAppSettingsResource(),
        //     deps: [BootstrapService],
        //     multi: true
        // }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    // to do
}
