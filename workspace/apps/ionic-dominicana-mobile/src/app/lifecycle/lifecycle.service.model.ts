import { BehaviorSubject, Observable } from "rxjs/";
import { Router } from "@angular/router";

/**
 * Own
 */
import { IAppBranding } from "../app.branding.model";
import { ILifecycleApp } from "./lifecycle";

export interface ILifecycle {
    app: ILifecycleApp;
    appSubject: BehaviorSubject<ILifecycleApp>;
    branding: IAppBranding;
    brandingSubject: BehaviorSubject<IAppBranding>;
    appIsLoading: boolean;
    taskInProgress: boolean;
    bulkTaskInProgress: boolean;
    firebaseUserCredential: firebase.auth.UserCredential;
    getLifecycleAppSubject(): Observable<ILifecycleApp>;
    getLifecycleBrandSubject(): Observable<IAppBranding>;
    resetAppValues(): ILifecycleApp;
    resetBranding(holding?: boolean): IAppBranding;
    resetAllProgressLoadersToDefault(): void;
    redirectToMain(routerService: Router): void;
    go(routerService: Router, route?: string, fullReload?: boolean): void;
}
