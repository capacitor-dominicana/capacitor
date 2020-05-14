export interface IChildListParams<T> {
    relationshipController: string;
    detailsController: string;
    recordId: string;
    urlFragment: string;
    comparisonValue: string;
    mapById: string;
    currentListItems: T[];
}
