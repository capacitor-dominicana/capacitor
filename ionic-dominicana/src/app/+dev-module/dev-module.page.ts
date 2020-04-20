import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dev-module",
  templateUrl: "./dev-module.page.html",
})
export class DevModulePage implements OnInit {

  public ngOnInit() {
    console.log("hello `DevModule` page");
  }
}
