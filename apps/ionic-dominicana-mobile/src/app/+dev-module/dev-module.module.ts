import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

/**
 * Own
 */
import { routes } from "./dev-module.routes";
import { DevModulePage } from "./dev-module.page";

/*
    Don"t leave side-effects outside of classes so this will tree-shake nicely on prod
    e.g. `console.log("something")` is a side effect.
*/
@NgModule({
    declarations: [DevModulePage],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
})
export class DevModuleModule {
    public static routes = routes;
    constructor() {
        console.log("`DevModuleModule` module initialized");
    }
}
