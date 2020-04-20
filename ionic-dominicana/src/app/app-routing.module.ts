import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

/**
 * Own
 */
const routes: Routes = [
    {
        path: "",
        loadChildren: () =>
            import("./tabs/tabs.module").then((m) => m.TabsPageModule),
    },
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
    // to do
}
