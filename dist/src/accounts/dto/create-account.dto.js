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
exports.CreateAccountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const prisma_1 = require("../../../generated/prisma");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateAccountDto {
    name;
    type;
    initialBalance;
    currency;
}
exports.CreateAccountDto = CreateAccountDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BCA Main' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: prisma_1.AccountType, example: prisma_1.AccountType.BANK }),
    (0, class_validator_1.IsEnum)(prisma_1.AccountType),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000000 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAccountDto.prototype, "initialBalance", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'IDR' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "currency", void 0);
//# sourceMappingURL=create-account.dto.js.map