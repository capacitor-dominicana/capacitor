import { Component, OnInit } from "@angular/core";

/**
 * Own
 */
// services
import { SigninService } from "../state/signin.service";
import { SigninQuery } from "../state/signin.query";

@Component({
    selector: "capacitor-signin",
    templateUrl: "./signin.page.html",
    styleUrls: ["./signin.page.scss"],
})
export class SigninPage implements OnInit {
    constructor(private signinService: SigninService, private signinQuery: SigninQuery) {
        // to do
    }

    ngOnInit() {
        console.log("Signin Page here!");
    }
}
