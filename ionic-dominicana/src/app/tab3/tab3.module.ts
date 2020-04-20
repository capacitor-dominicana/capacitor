import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

/**
 * Own
 */
// modules
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";

// pages
import { Tab3Page } from "./tab3.page";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild([{ path: "", component: Tab3Page }]),
    ],
    declarations: [Tab3Page],
})
export class Tab3PageModule {
    // to do
}
