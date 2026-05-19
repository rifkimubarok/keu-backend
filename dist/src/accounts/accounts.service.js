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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../generated/prisma");
const paginated_response_dto_1 = require("../common/dto/paginated-response.dto");
const single_response_dto_1 = require("../common/dto/single-response.dto");
const prisma_service_1 = require("../prisma/prisma.service");
let AccountsService = class AccountsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createAccountDto) {
        const account = await this.prisma.account.create({
            data: {
                userId,
                name: createAccountDto.name,
                type: createAccountDto.type,
                initialBalance: createAccountDto.initialBalance,
                currentBalance: createAccountDto.initialBalance,
                currency: createAccountDto.currency || 'IDR',
                status: prisma_1.AccountStatus.ACTIVE,
            },
        });
        return (0, single_response_dto_1.single)(account);
    }
    async findAll(userId, filter = {}) {
        const { page, limit, skip } = (0, paginated_response_dto_1.getPagination)(filter.page, filter.limit);
        const where = {
            userId,
            status: filter.status || prisma_1.AccountStatus.ACTIVE,
            type: filter.type,
            currency: filter.currency,
            ...(filter.name
                ? { name: { contains: filter.name, mode: 'insensitive' } }
                : {}),
        };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.account.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.account.count({ where }),
        ]);
        return (0, paginated_response_dto_1.paginate)(data, total, page, limit);
    }
    async findOne(id, userId) {
        const account = await this.prisma.account.findUniqueOrThrow({
            where: { id, userId },
        });
        return (0, single_response_dto_1.single)(account);
    }
    async update(id, userId, updateAccountDto) {
        const account = await this.prisma.account.update({
            where: { id, userId },
            data: {
                name: updateAccountDto.name,
                type: updateAccountDto.type,
                currency: updateAccountDto.currency,
            },
        });
        return (0, single_response_dto_1.single)(account);
    }
    async archive(id, userId) {
        const account = await this.prisma.account.update({
            where: { id, userId },
            data: { status: prisma_1.AccountStatus.ARCHIVED },
        });
        return (0, single_response_dto_1.single)(account);
    }
    async unarchive(id, userId) {
        const account = await this.prisma.account.update({
            where: { id, userId },
            data: { status: prisma_1.AccountStatus.ACTIVE },
        });
        return (0, single_response_dto_1.single)(account);
    }
    async remove(id, userId) {
        const transactionsCount = await this.prisma.transaction.count({
            where: {
                userId,
                OR: [{ sourceAccountId: id }, { destinationAccountId: id }],
            },
        });
        if (transactionsCount > 0) {
            throw new common_1.BadRequestException('Cannot delete account with existing transactions. Please archive it instead.');
        }
        const account = await this.prisma.account.delete({
            where: { id, userId },
        });
        return (0, single_response_dto_1.single)(account);
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map