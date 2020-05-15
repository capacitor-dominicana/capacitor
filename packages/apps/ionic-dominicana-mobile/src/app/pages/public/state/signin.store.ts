import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";

/**
 * Own
 */
// models
import { Signin } from "./signin.model";

export interface SigninState extends EntityState<Signin> {
    // to do
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "signin" })
export class SigninStore extends EntityStore<SigninState> {
    constructor() {
        super();
    }
}
