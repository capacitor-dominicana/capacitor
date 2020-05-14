import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

/**
 * Own
 */
// models
import { Base } from "@capacitor/shared/models";
import { ApiQueryOption } from "./api-query-option.model";

export interface IDataService {
    get<IApiResponse>(controller: string, id: any): Observable<IApiResponse>;
    getAll<IApiResponse>(controller: string, queryOption?: ApiQueryOption): Observable<IApiResponse>;
    getFullHttpResponse<IApiResponse>(controller: string, queryOption?: ApiQueryOption): Observable<HttpResponse<IApiResponse>>;
    addOrUpdate<IApiResponse, T extends Base>(controller: string, payload: T, id?: any): Observable<IApiResponse>;
    addMany<IApiResponse, T extends Base>(controller: string, payload: Array<T>): Observable<IApiResponse>;
    remove<IApiResponse>(controller: string, id: any): Observable<IApiResponse>;
}
