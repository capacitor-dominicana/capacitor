import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

/**
 * Own
 */
// components
import { HomeComponent } from "./home.component";

export const HomeRoutes: Routes = [
    {
        path: "",
        component: HomeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(HomeRoutes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {
    // to do
}
