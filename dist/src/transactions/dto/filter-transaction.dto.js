"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterTransactionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const prisma_1 = require("../../../generated/prisma");
const pagination_query_dto_1 = require("../../common/dto/pagination-query.dto");
class FilterTransactionDto extends pagination_query_dto_1.PaginationQueryDto {
    type;
    accountId;
    categoryId;
    from;
    to;
    minAmount;
    maxAmount;
    search;
}
exports.FilterTransactionDto = FilterTransactionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: prisma_1.TransactionType, example: prisma_1.TransactionType.EXPENSE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(prisma_1.TransactionType),
    __metadata("design:type", String)
], FilterTransactionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-account' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterTransactionDto.prototype, "accountId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-category' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterTransactionDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-05-01T00:00:00Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], FilterTransactionDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-05-31T23:59:59Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], FilterTransactionDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FilterTransactionDto.prototype, "minAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 100000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FilterTransactionDto.prototype, "maxAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'lunch' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterTransactionDto.prototype, "search", void 0);
//# sourceMappingURL=filter-transaction.dto.js.map