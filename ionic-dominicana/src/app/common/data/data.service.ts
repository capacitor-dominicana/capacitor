import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable, Observer } from "rxjs";

/**
 * Own
 */
import { environment } from "src/environments/environment";

// models
import { DATA_SERVICE_TOKEN } from "../tokens";
import { Base } from "@app/shared/models/base/base.model";
import { Identifier } from "@app/shared/decorators/identifier";
import { ApiQueryOption } from "./api-query-option.model";

// providers
import { IDataService } from "./data.service.model";

@Injectable({
    providedIn: "root"
})
@Identifier({
    token: DATA_SERVICE_TOKEN
})
export class DataService implements IDataService {
    public baseUrl: string;
    public apiUrl: string;
    public headers: { header: string };

    constructor(public httpClient: HttpClient) {
        this.baseUrl = environment.COMMON_API_URL;
        this.apiUrl = `${this.baseUrl}/api`;
    }

    public get<IApiResponse>(controller: string, id: any): Observable<IApiResponse> {
        return this.httpClient.get<IApiResponse>(`${this.apiUrl}/${controller}/${id}`);
    }

    public getAll<IApiResponse>(controller: string, queryOption?: ApiQueryOption): Observable<IApiResponse> {
        let params: {} = null;
        if (queryOption) {
            params = this.setPaginationOptions(queryOption);
        }

        return this.httpClient.get<IApiResponse>(`${this.apiUrl}/${controller}`, { params });
    }

    public getFullHttpResponse<IApiResponse>(controller: string, queryOption?: ApiQueryOption): Observable<HttpResponse<IApiResponse>> {
        let params: {} = null;
        if (queryOption) {
            params = this.setPaginationOptions(queryOption);
        }

        return this.httpClient.get<IApiResponse>(`${this.apiUrl}/${controller}`, { params, observe: "response" });
    }

    public addOrUpdate<IApiResponse, T extends Base>(controller: string, payload: T, id?: any): Observable<IApiResponse> {
        try {
            if (!id) {
                return this.httpClient.post<IApiResponse>(`${this.apiUrl}/${controller}`, payload, { headers: this.headers });
            } else {
                payload.id = id;
                return this.httpClient.put<IApiResponse>(`${this.apiUrl}/${controller}/${id}`, payload, { headers: this.headers });
            }
        } catch (error) {
            throw error;
        }
    }

    public addMany<IApiResponse, T extends Base>(controller: string, payload: Array<T>): Observable<IApiResponse> {
        return this.httpClient.post<IApiResponse>(`${this.apiUrl}/${controller}/CreateMultiple`, payload, { headers: this.headers });
    }

    public remove<IApiResponse>(controller: string, id: any): Observable<IApiResponse> {
        return this.httpClient.delete<IApiResponse>(`${this.apiUrl}/${controller}/${id}`);
    }

    private setPaginationOptions(queryOption: ApiQueryOption): {} {
        return {
            Where: queryOption.where ?? "",
            OrderBy: queryOption.orderBy ?? "asc",
            Page: queryOption.page ?? 1,
            PerPage: queryOption.perPage ?? 10
        };
    }
}
