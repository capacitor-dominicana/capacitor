import { Injectable } from "@angular/core";

/**
 * Own
 */
// models
import { IAuthenticationService } from "./authentication.service.model";

// services
import { Identifier } from "@capacitor/shared/decorators";
import { AUTHENTICATION_SERVICE_TOKEN } from "../../common/tokens";

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
