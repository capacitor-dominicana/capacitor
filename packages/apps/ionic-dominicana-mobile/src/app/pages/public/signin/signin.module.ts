import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

/**
 * Own
 */
// modules
import { SigninPageRoutingModule } from "./signin-routing.module";

// pages
import { SigninPage } from "./signin.page";

@NgModule({
    imports: [CommonModule
        , FormsModule
        , IonicModule
        , SigninPageRoutingModule
    ],
    declarations: [SigninPage],
})
export class SigninPageModule {
    // to do
}
