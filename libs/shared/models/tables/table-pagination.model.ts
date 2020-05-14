export interface ITablePagination {
    /** The zero-based page index of the displayed list of items. Defaulted to 0. */
    currentPage?: number;

    /** The length of the total number of items that are being paginated. Defaulted to 0. */
    totalCount?: number;

    /** The length of the total number of items that are being paginated. Defaulted to 0. */
    totalPages?: number;

    /** Number of items to display on a page. By default set to 50. */
    perPage?: number;

    /** Optionally sorts the records from the server with the column name  */
    orderBy?: string;

    /** Previous page link based arguments of current queryString */
    previousPageLink: string;

    /** Link to next page based on arguments of current queryString */
    nextPageLink: string;

    /** Optional predicate through queryString in case you want to filter results with advanced search. */
    where?: string;
}
