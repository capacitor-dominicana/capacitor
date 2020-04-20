/**
 * Own
 */
import { Base } from "@app/shared/models/base/base.model";
import { EventType } from "./event-type.enum";

export class BusinessLog extends Base {
    public eventType?: EventType;
    public eventName?: string;
    public moduleName?: string;
    public objectType?: string;
    public createdBy?: string;
    public icon?: string;
}
