import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

/**
 * Own
 */
import { UI_PIPES } from "./pipes";

const MODULES = [TranslateModule];

@NgModule({
    imports: [...MODULES],
    declarations: [...UI_PIPES],
    exports: [...MODULES, ...UI_PIPES],
})
export class UISharedModule {
    // to do
}
