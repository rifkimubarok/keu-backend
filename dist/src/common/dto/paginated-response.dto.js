"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = getPagination;
exports.paginate = paginate;
function getPagination(page = 1, limit = 20) {
    return {
        page,
        limit,
        skip: (page - 1) * limit,
    };
}
function paginate(data, total, page = 1, limit = 20) {
    return {
        data,
        meta: {
            total,
            page,
            limit,
        },
    };
}
//# sourceMappingURL=paginated-response.dto.js.map