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
exports.CreateTransactionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const prisma_1 = require("../../../generated/prisma");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateTransactionDto {
    type;
    transactionDate;
    amount;
    feeAmount;
    sourceAccountId;
    destinationAccountId;
    categoryId;
    note;
}
exports.CreateTransactionDto = CreateTransactionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: prisma_1.TransactionType, example: prisma_1.TransactionType.EXPENSE }),
    (0, class_validator_1.IsEnum)(prisma_1.TransactionType),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-05-12T00:00:00Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateTransactionDto.prototype, "transactionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50000 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "feeAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-source-account' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "sourceAccountId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-destination-account' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "destinationAccountId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-category' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Lunch at mall' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "note", void 0);
//# sourceMappingURL=create-transaction.dto.js.map