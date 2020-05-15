import { Injectable } from "@angular/core";
import { SigninStore, SigninState } from "./signin.store";

/**
 * Own
 */
// services
import { NgEntityService } from "@datorama/akita-ng-entity-service";

@Injectable({ providedIn: "root" })
export class SigninService extends NgEntityService<SigninState> {
    constructor(protected store: SigninStore) {
        super(store);
    }
}
