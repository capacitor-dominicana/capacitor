import { NgModule } from "@angular/core";
import { PreloadAllModules, Routes, RouterModule } from "@angular/router";

/**
 * Own
 */
// routes
const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    {
        path: "signin",
        loadChildren: () =>
            import("./pages/public/signin/signin.module").then(
                (m) => m.SigninPageModule
            ),
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
