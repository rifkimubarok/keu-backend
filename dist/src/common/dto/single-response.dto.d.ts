export interface SingleResponse<T> {
    data: T;
}
export declare function single<T>(data: T): SingleResponse<T>;
