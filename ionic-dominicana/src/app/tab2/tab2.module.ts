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
import { Tab2Page } from "./tab2.page";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild([{ path: "", component: Tab2Page }]),
    ],
    declarations: [Tab2Page],
})
export class Tab2PageModule {
  // to do
}
