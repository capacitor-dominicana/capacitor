import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class NoopGuard implements CanActivate {
    constructor(private router: Router) {
        // to do
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (state.url && state.url.toLowerCase() === "/auth") {
            this.router.navigate([ state.url.concat("/signin") ]);
        }
        return true;
    }
}
