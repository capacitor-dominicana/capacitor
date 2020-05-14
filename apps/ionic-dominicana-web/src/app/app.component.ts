import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

/**
 * Own
 */
// models
import { Message } from "@capacitor/api-interfaces";

@Component({
    selector: "capacitor-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    hello$ = this.http.get<Message>("/api/hello");
    constructor(private http: HttpClient) {}
}
