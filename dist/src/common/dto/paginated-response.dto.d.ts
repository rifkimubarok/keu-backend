export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
}
export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}
export declare function getPagination(page?: number, limit?: number): {
    page: number;
    limit: number;
    skip: number;
};
export declare function paginate<T>(data: T[], total: number, page?: number, limit?: number): {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
    };
};
