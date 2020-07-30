export interface IApiResponse<T> {
    success: boolean;
    data?: T;
    errorCode?: number;
    errorMessage?: string;
}
