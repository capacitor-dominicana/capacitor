/**
 * Own
 */
import { ITuple } from "@app/shared/tuple";

export interface ITableElemsForRender<T> {
    modelMetadata: any;
    tableDisplayedColumnKeys?: string[];
    tableDisplayedColumnNames?: ITuple<ITuple<boolean>>[];
    tableSortColumnNameActive?: string;
    tableSortColumnDirection?: string;
    originalTableDisplayedColumnNames?: ITuple<ITuple<boolean>>[];
    dataSource?: T[];
    tableDataSource?: any;
}
