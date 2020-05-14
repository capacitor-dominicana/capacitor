/**
 * Own
 */

import { ComponentEvent } from "../../utilities/component-event.enum";

export interface IApiResponse<T> {
    result?: T;
    errorNumber?: number;
    errorMessage?: string;
    eventType?: ComponentEvent;
}
