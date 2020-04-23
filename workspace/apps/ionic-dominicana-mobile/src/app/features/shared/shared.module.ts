import { NgModule } from "@angular/core";

/**
 * Own
 */
// xplat
import { UIModule } from "@workspace/ionic";

const MODULES = [UIModule];

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES],
})
export class SharedModule {
    // to do
}
