/**
 * Own
 */
import { ComponentEvent } from "@app/common/utilities";

export interface IApiResponse<T> {
    result?: T;
    errorNumber?: number;
    errorMessage?: string;
    eventType?: ComponentEvent;
}
