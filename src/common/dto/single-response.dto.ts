export interface SingleResponse<T> {
  data: T;
}

export function single<T>(data: T): SingleResponse<T> {
  return { data };
}
