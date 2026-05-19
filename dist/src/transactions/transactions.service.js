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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../generated/prisma");
const paginated_response_dto_1 = require("../common/dto/paginated-response.dto");
const single_response_dto_1 = require("../common/dto/single-response.dto");
const prisma_service_1 = require("../prisma/prisma.service");
let TransactionsService = class TransactionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createTransactionDto) {
        return this.prisma.$transaction(async (tx) => {
            await this.applyBalance(tx, userId, createTransactionDto);
            const transaction = await tx.transaction.create({
                data: {
                    userId,
                    type: createTransactionDto.type,
                    transactionDate: createTransactionDto.transactionDate || new Date(),
                    amount: createTransactionDto.amount,
                    feeAmount: createTransactionDto.feeAmount,
                    sourceAccountId: createTransactionDto.sourceAccountId,
                    destinationAccountId: createTransactionDto.destinationAccountId,
                    categoryId: createTransactionDto.categoryId,
                    note: createTransactionDto.note,
                },
            });
            return (0, single_response_dto_1.single)(transaction);
        });
    }
    async findAll(userId, filter = {}) {
        const { page, limit, skip } = (0, paginated_response_dto_1.getPagination)(filter.page, filter.limit);
        const where = this.buildWhere(userId, filter);
        const include = {
            sourceAccount: true,
            destinationAccount: true,
            category: true,
        };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.transaction.findMany({
                where,
                orderBy: { transactionDate: 'desc' },
                include,
                skip,
                take: limit,
            }),
            this.prisma.transaction.count({ where }),
        ]);
        return (0, paginated_response_dto_1.paginate)(data, total, page, limit);
    }
    async findOne(id, userId) {
        const transaction = await this.prisma.transaction.findUniqueOrThrow({
            where: { id, userId },
            include: {
                sourceAccount: true,
                destinationAccount: true,
                category: true,
            },
        });
        return (0, single_response_dto_1.single)(transaction);
    }
    async update(id, userId, updateTransactionDto) {
        return this.prisma.$transaction(async (tx) => {
            const oldTransaction = await tx.transaction.findUniqueOrThrow({
                where: { id, userId },
            });
            const nextTransaction = {
                type: updateTransactionDto.type ?? oldTransaction.type,
                transactionDate: updateTransactionDto.transactionDate ??
                    oldTransaction.transactionDate,
                amount: updateTransactionDto.amount ?? Number(oldTransaction.amount),
                feeAmount: updateTransactionDto.feeAmount ??
                    (oldTransaction.feeAmount
                        ? Number(oldTransaction.feeAmount)
                        : undefined),
                sourceAccountId: updateTransactionDto.sourceAccountId ??
                    oldTransaction.sourceAccountId ??
                    undefined,
                destinationAccountId: updateTransactionDto.destinationAccountId ??
                    oldTransaction.destinationAccountId ??
                    undefined,
                categoryId: updateTransactionDto.categoryId ??
                    oldTransaction.categoryId ??
                    undefined,
                note: updateTransactionDto.note ?? oldTransaction.note ?? undefined,
            };
            await this.rollbackBalance(tx, userId, oldTransaction);
            await this.applyBalance(tx, userId, nextTransaction);
            const transaction = await tx.transaction.update({
                where: { id, userId },
                data: nextTransaction,
            });
            return (0, single_response_dto_1.single)(transaction);
        });
    }
    async remove(id, userId) {
        return this.prisma.$transaction(async (tx) => {
            const transaction = await tx.transaction.findUniqueOrThrow({
                where: { id, userId },
            });
            await this.rollbackBalance(tx, userId, transaction);
            const deletedTransaction = await tx.transaction.delete({
                where: { id },
            });
            return (0, single_response_dto_1.single)(deletedTransaction);
        });
    }
    buildWhere(userId, filter) {
        return {
            userId,
            type: filter.type,
            categoryId: filter.categoryId,
            ...(filter.accountId
                ? {
                    OR: [
                        { sourceAccountId: filter.accountId },
                        { destinationAccountId: filter.accountId },
                    ],
                }
                : {}),
            ...(filter.from || filter.to
                ? {
                    transactionDate: {
                        gte: filter.from,
                        lte: filter.to,
                    },
                }
                : {}),
            ...(filter.minAmount || filter.maxAmount
                ? {
                    amount: {
                        gte: filter.minAmount,
                        lte: filter.maxAmount,
                    },
                }
                : {}),
            ...(filter.search
                ? {
                    OR: [
                        { note: { contains: filter.search, mode: 'insensitive' } },
                        {
                            category: {
                                name: { contains: filter.search, mode: 'insensitive' },
                            },
                        },
                    ],
                }
                : {}),
        };
    }
    async applyBalance(tx, userId, transaction) {
        this.validateTransaction(transaction);
        if (transaction.type === prisma_1.TransactionType.INCOME) {
            await tx.account.update({
                where: { id: transaction.destinationAccountId, userId },
                data: { currentBalance: { increment: Number(transaction.amount) } },
            });
            return;
        }
        if (transaction.type === prisma_1.TransactionType.EXPENSE) {
            await tx.account.update({
                where: { id: transaction.sourceAccountId, userId },
                data: { currentBalance: { decrement: Number(transaction.amount) } },
            });
            return;
        }
        await tx.account.update({
            where: { id: transaction.sourceAccountId, userId },
            data: { currentBalance: { decrement: Number(transaction.amount) } },
        });
        await tx.account.update({
            where: { id: transaction.destinationAccountId, userId },
            data: { currentBalance: { increment: Number(transaction.amount) } },
        });
        if (Number(transaction.feeAmount) && Number(transaction.feeAmount) > 0) {
            await tx.account.update({
                where: { id: transaction.sourceAccountId, userId },
                data: { currentBalance: { decrement: Number(transaction.feeAmount) } },
            });
        }
    }
    async rollbackBalance(tx, userId, transaction) {
        if (transaction.type === prisma_1.TransactionType.INCOME &&
            transaction.destinationAccountId) {
            await tx.account.update({
                where: { id: transaction.destinationAccountId, userId },
                data: { currentBalance: { decrement: Number(transaction.amount) } },
            });
            return;
        }
        if (transaction.type === prisma_1.TransactionType.EXPENSE &&
            transaction.sourceAccountId) {
            await tx.account.update({
                where: { id: transaction.sourceAccountId, userId },
                data: { currentBalance: { increment: Number(transaction.amount) } },
            });
            return;
        }
        if (transaction.sourceAccountId && transaction.destinationAccountId) {
            await tx.account.update({
                where: { id: transaction.sourceAccountId, userId },
                data: { currentBalance: { increment: Number(transaction.amount) } },
            });
            await tx.account.update({
                where: { id: transaction.destinationAccountId, userId },
                data: { currentBalance: { decrement: Number(transaction.amount) } },
            });
            if (transaction.feeAmount && Number(transaction.feeAmount) > 0) {
                await tx.account.update({
                    where: { id: transaction.sourceAccountId, userId },
                    data: {
                        currentBalance: { increment: Number(transaction.feeAmount) },
                    },
                });
            }
        }
    }
    validateTransaction(transaction) {
        if (transaction.type === prisma_1.TransactionType.INCOME &&
            !transaction.destinationAccountId) {
            throw new common_1.BadRequestException('Income must have a destination account');
        }
        if (transaction.type === prisma_1.TransactionType.EXPENSE &&
            !transaction.sourceAccountId) {
            throw new common_1.BadRequestException('Expense must have a source account');
        }
        if (transaction.type !== prisma_1.TransactionType.TRANSFER) {
            return;
        }
        if (!transaction.sourceAccountId || !transaction.destinationAccountId) {
            throw new common_1.BadRequestException('Transfer must have source and destination accounts');
        }
        if (transaction.sourceAccountId === transaction.destinationAccountId) {
            throw new common_1.BadRequestException('Source and destination accounts must be different');
        }
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map