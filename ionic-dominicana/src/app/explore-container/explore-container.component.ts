import { Component, OnInit, Input } from "@angular/core";

/**
 * Own
 */
@Component({
    selector: "app-explore-container",
    templateUrl: "./explore-container.component.html",
    styleUrls: ["./explore-container.component.scss"],
})
export class ExploreContainerComponent implements OnInit {
    @Input() name: string;

    constructor() {
        // to do
    }

    ngOnInit() {
        // to do
    }
}
