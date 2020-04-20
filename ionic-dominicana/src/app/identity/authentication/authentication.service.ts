import { Injectable } from "@angular/core";

/**
 * Own
 */
// models
import { IAuthenticationService } from "./authentication.service.model";

// services
import { Identifier } from "@app/shared";
import { AUTHENTICATION_SERVICE_TOKEN } from "@app/common";

@Injectable({
    providedIn: "root"
})
@Identifier({
    token: AUTHENTICATION_SERVICE_TOKEN
})
export class AuthenticationService implements IAuthenticationService {

    constructor() {
        //
    }
}
