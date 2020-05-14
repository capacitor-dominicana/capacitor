import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { of, Observable, Observer } from "rxjs";

/**
 * Own
 */
// models
import { IApiResponse } from "./common/config/api";
import { LifecycleFactory } from "./lifecycle";
import { ComponentEvent } from "./common";

@Injectable()
export class DataResolver implements Resolve<any> {
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return of({
            res: "I am data"
        });
    }

      public observerHandler<T>(observer: Observer<IApiResponse<T>>
        ,                       event: T
        ,                       success: boolean
        ,                       errorNum?: number
        ,                       reason?: any|Error): void {
        if (success) {
            observer.next({
                eventType: event as any,
                errorNumber: errorNum,
                errorMessage: (success) ? null : reason,
                result: (!success) ? null : reason
            });
        } else {
            observer.error({
                eventType: event as any,
                result: reason
            });
        }
        observer.complete();
    }
}

/**
 * An array of services to resolve routes with data.
 */
export const APP_RESOLVER_PROVIDERS = [
    DataResolver,
    LifecycleFactory
];
