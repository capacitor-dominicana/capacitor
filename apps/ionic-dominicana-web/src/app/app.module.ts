import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NG_ENTITY_SERVICE_CONFIG } from "@datorama/akita-ng-entity-service";
import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";
import { AkitaNgRouterStoreModule } from "@datorama/akita-ng-router-store";

/**
 * Own
 */
// modules
import { AppRoutingModule } from "./app-routing.module";

// environments
import { environment } from "../environments/environment";

// components
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        environment.production ? [] : AkitaNgDevtools,
        AkitaNgRouterStoreModule,
        AppRoutingModule
    ],
    providers: [
        {
            provide: NG_ENTITY_SERVICE_CONFIG,
            useValue: { baseUrl: "https://jsonplaceholder.typicode.com" },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    // to do
}
