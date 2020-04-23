import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

/**
 * Own
 */
import { UISharedModule } from "@workspace/ui";

// modules
import { SharedModule } from "../../features/shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";

// components
import { HomeComponent } from "./home.component";

@NgModule({
    imports: [SharedModule, HomeRoutingModule, UISharedModule],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {
    // to do
}
