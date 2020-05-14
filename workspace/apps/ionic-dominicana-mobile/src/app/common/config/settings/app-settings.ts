/**
 * Own
 */
import { IAppConfig } from "..";
import { IConfigUrl } from "../url/url.model";

export interface IAppSettings {
    appConfig: IAppConfig;
    apiKey: string;
    apiId: string;
    bindId: string;
    "Telemetry.AI.InstrumentationKey": string;
    urls: IConfigUrl;
}
