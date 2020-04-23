import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicModule } from "@ionic/angular";

/**
 * Own
 */
// workspace elements
import { UIModule as UIWebModule } from "@workspace/web";

// components
import { UI_COMPONENTS } from "./components";

const MODULES = [UIWebModule, IonicModule];

@NgModule({
    imports: [...MODULES],
    declarations: [...UI_COMPONENTS],
    exports: [...MODULES, ...UI_COMPONENTS],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UIModule {
    // to do
}
