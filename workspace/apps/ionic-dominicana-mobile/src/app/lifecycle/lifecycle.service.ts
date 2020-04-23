import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs/";
import { distinctUntilChanged } from "rxjs/operators";
import * as _ from "lodash";

/**
 * Own
 */
import { ILifecycle } from "./lifecycle.service.model";
import { ILifecycleApp } from "./lifecycle";
import { IAppBranding } from "../app.branding.model";

@Injectable({
    providedIn: "root"
})
export class LifecycleFactory implements ILifecycle {

    private _routerInstance: Router;
    private _appProps: ILifecycleApp;
    private _appBranding: IAppBranding;
    private _appIsLoading: boolean;
    private _taskInProgress: boolean;
    private _bulkTaskInProgress: boolean;
    private _firebaseUserCredential: firebase.auth.UserCredential;

    public set routerInstance(value: Router) {
        this._routerInstance = this._routerInstance || value;
    }
    public get routerInstance(): Router {
        return this._routerInstance;
    }

    public set app(value: ILifecycleApp) {
        this._appProps = value;
        localStorage.setObject(this.appLifecycleListernerName, this.app);
    }
    public get app(): ILifecycleApp {
        return this._appProps;
    }

    public set branding(value: IAppBranding) {
        this._appBranding = value;
        localStorage.setObject(this.appBrandingListenerName, this.branding);
    }
    public get branding(): IAppBranding {
        return this._appBranding;
    }

    public set appIsLoading(value: boolean) {
        this._appIsLoading = value;
    }
    public get appIsLoading(): boolean {
        return this._appIsLoading;
    }

    public set taskInProgress(value: boolean) {
        this._taskInProgress = value;
    }
    public get taskInProgress(): boolean {
        return this._taskInProgress;
    }

    public set bulkTaskInProgress(value: boolean) {
        this._bulkTaskInProgress = value;
    }
    public get bulkTaskInProgress(): boolean {
        return this._bulkTaskInProgress;
    }

    public set firebaseUserCredential(value: firebase.auth.UserCredential) {
        this._firebaseUserCredential = value;
        localStorage.setObject(this.appFirebaseUserCredential, value);
    }
    public get firebaseUserCredential(): firebase.auth.UserCredential {
        return this._firebaseUserCredential;
    }

    public appLifecycleListernerName = "app-lifecycle";
    public appBrandingListenerName = "app-branding";
    public appFirebaseUserCredential = "app-firebase-user-credential";

    public appSubject: BehaviorSubject<ILifecycleApp>;
    public brandingSubject: BehaviorSubject<IAppBranding>;

    constructor() {
        this.init();
    }

    private init(): void {
        this.appSubject = new BehaviorSubject(this.app);
        this.brandingSubject = new BehaviorSubject(this.branding);
        this.app = localStorage.getObject(this.appLifecycleListernerName) || this.resetAppValues();
        this.branding = localStorage.getObject(this.appBrandingListenerName) || this.resetBranding();
        this.behaviorsEmitter();
    }

    public getLifecycleAppSubject(): Observable<ILifecycleApp> {
        return this.appSubject.asObservable();
    }

    public getLifecycleBrandSubject(): Observable<IAppBranding> {
        return this.brandingSubject.asObservable();
    }

    public resetAppValues(): ILifecycleApp {
        const defaultApp: ILifecycleApp = {
            ENABLE_DEBUG: false,
            IS_APPLICATION_INSIGHTS: false,
            IS_AUTHENTICATED: false,
            IS_HTTP_REQUEST_VALID: false,
            IS_THIRDPARTY_ENROLL: null,
            DEFAULT_COUNTRY: "USA",
            DEFAULT_BRANDING_LINK_ID: "brandLogoLink",
            DEFAULT_IMAGE_SRC: "./assets/img/image-default.png",
            DEFAULT_HEADER_LOGO_ID: "companyLogo",
            DEFAULT_HEADER_LOGO_SRC: "/assets/img/logo.png",
            SITE_MAINTENANCE_INFORMATION: null
        };
        this.appSubject.next(defaultApp);
        return defaultApp;
    }

    public resetBranding(holding?: boolean): IAppBranding {
        const defaultBranding: IAppBranding = {
            logoId: (holding) ? null : _.clone(this.app.DEFAULT_BRANDING_LINK_ID),
            logoLink: "https://www.solvex.com.do",
            logoImgId: null,
            logoImgSrc: (holding) ? null : _.clone(this.app.DEFAULT_HEADER_LOGO_SRC),
            fallbackImgSrc: _.clone(this.app.DEFAULT_IMAGE_SRC),
            logoCss: null,
            waiting: (holding) ? true : false
        };
        this.brandingSubject.next(defaultBranding);
        return defaultBranding;
    }

    private behaviorsEmitter(): void {
        const execChangeEmitter = (subject: BehaviorSubject<any>, source: any): Observable<any> => {
            return subject.pipe(distinctUntilChanged((a: any, b: any) => _.isEqual(a, b)));
        };
        execChangeEmitter(this.appSubject, this.app).subscribe((value: ILifecycleApp) => {
            this.app = _.assign(this.app, value);
        });
        execChangeEmitter(this.brandingSubject, this.branding).subscribe((value: IAppBranding) => {
            this.branding = _.assign(this.branding, value);
        });
    }

    public redirectToMain(routerService: Router): void {
        this.go(routerService, "/main/home");
    }

    public redirectToLogin(routerService: Router): void {
        this.go(routerService, "/login");
    }

    public go(routerService: Router, route?: string): void {
        const newRoute = route || "/login";
        this.appIsLoading = true;
        this.routerInstance = routerService;
        this.routerInstance.navigate([newRoute]);
    }

    public resetAllProgressLoadersToDefault(): void {
        this.taskInProgress = false;
        this.bulkTaskInProgress = false;
        this.appIsLoading = false;
    }
}
