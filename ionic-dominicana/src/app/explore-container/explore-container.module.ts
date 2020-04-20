import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

/**
 * Own
 */
import { ExploreContainerComponent } from "./explore-container.component";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [ExploreContainerComponent],
    exports: [ExploreContainerComponent],
})
export class ExploreContainerComponentModule {
    // to do
}
