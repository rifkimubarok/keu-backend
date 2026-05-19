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
exports.FilterAccountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const prisma_1 = require("../../../generated/prisma");
const pagination_query_dto_1 = require("../../common/dto/pagination-query.dto");
class FilterAccountDto extends pagination_query_dto_1.PaginationQueryDto {
    name;
    type;
    currency;
    status;
}
exports.FilterAccountDto = FilterAccountDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'BCA' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterAccountDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: prisma_1.AccountType, example: prisma_1.AccountType.BANK }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(prisma_1.AccountType),
    __metadata("design:type", String)
], FilterAccountDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'IDR' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterAccountDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: prisma_1.AccountStatus, example: prisma_1.AccountStatus.ACTIVE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(prisma_1.AccountStatus),
    __metadata("design:type", String)
], FilterAccountDto.prototype, "status", void 0);
//# sourceMappingURL=filter-account.dto.js.map