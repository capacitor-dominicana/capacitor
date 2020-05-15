import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";

/**
 * Own
 */
// stores
import { SigninStore, SigninState } from "./signin.store";

@Injectable({ providedIn: "root" })
export class SigninQuery extends QueryEntity<SigninState> {
    constructor(protected store: SigninStore) {
        super(store);
    }
}
