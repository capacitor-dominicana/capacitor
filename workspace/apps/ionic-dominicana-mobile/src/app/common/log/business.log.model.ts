/**
 * Own
 */
import { Base } from "@capacitor/shared/models";
import { EventType } from ".";

export class BusinessLog extends Base {
    public eventType?: EventType;
    public eventName?: string;
    public moduleName?: string;
    public objectType?: string;
    public createdBy?: string;
    public icon?: string;
}
