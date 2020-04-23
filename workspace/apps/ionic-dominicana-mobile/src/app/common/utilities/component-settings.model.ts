/**
 * Own
 */
import { ITuple } from "@app/shared/tuple";

export interface IComponentSettings {
    entityName: string;
    viewName?: string;
    viewIconName?: string;
    isSvgIcon?: boolean;
    parentCss?: string;
    cancelActionDescription?: string;
    disableFooterActions?: boolean;
    disabledContainerAndFormWrapper?: boolean;
    id?: string;
}
