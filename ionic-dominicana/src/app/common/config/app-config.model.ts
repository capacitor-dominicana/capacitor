/**
 * Own
 */
import { IAppMaintenance } from "./maintenance";

export interface IAppConfig {
    maintenance: IAppMaintenance;
    supportEmail: string;
 }
