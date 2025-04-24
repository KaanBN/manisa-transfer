export type PaginationHandle = {
    previousPage: () => void;
    nextPage: () => void;
    getCanNextPage: () => boolean;
    getCanPreviousPage: () => boolean;
};
