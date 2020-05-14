import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject} from "rxjs/";
import { map } from "rxjs/operators";

/**
 * Own
 */
import { IAppSettings } from "./common/config/settings/app-settings";

@Injectable({
    providedIn: "root"
})
export class BootstrapService {
    private appSettingsSubject = new Subject<IAppSettings>();
    private appSettings: IAppSettings;

    constructor(private http: HttpClient) {
        //
     }

    public getAppSettings(): Observable<IAppSettings> {
        return this.appSettingsSubject.asObservable();
    }

    public getAppSettingsResource(): Promise<any> {
        return this.http.get("/api/v1/settings").pipe(map((res: any) => {
            return (res instanceof Object) ? res : res.json();
        }))
        .toPromise()
        .then((data: IAppSettings) => {
            this.appSettings = data;
            this.appSettingsSubject.next(this.appSettings);
        })
        .catch((err: any) => Promise.reject(err));
    }
}
