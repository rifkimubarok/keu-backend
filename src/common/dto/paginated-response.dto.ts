export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export function getPagination(page = 1, limit = 20) {
  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
}

export function paginate<T>(data: T[], total: number, page = 1, limit = 20) {
  return {
    data,
    meta: {
      total,
      page,
      limit,
    },
  };
}
