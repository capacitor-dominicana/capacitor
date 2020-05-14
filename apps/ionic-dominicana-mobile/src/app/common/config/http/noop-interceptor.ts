import { Injectable, Inject } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";


@Injectable()
export class NoopInterceptor implements HttpInterceptor {

    constructor(
        // @Inject(AUTHENTICATION_SERVICE_TOKEN) public authenticationService: IAuthenticationService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // const authToken = this.authenticationService.getAuthorizationToken();

        // // clone the request and set the new header in one step.
        // const authReq = req.clone({
        //     setHeaders: {
        //         Authorization: this.configService.getRestConfig().headers
        //     }
        // });

        // send cloned request with header to the next handler.
        // return next.handle(authReq);
        return next.handle(req);
    }
}
