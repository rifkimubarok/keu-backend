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
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../generated/prisma");
const prisma_service_1 = require("../prisma/prisma.service");
const transactions_service_1 = require("../transactions/transactions.service");
let TelegramService = class TelegramService {
    prisma;
    transactionsService;
    constructor(prisma, transactionsService) {
        this.prisma = prisma;
        this.transactionsService = transactionsService;
    }
    async linkAccount(telegramId, token) {
        const user = await this.prisma.user.findUnique({
            where: { telegramLinkToken: token },
        });
        if (!user)
            return false;
        if (user.telegramLinkExpiry && user.telegramLinkExpiry < new Date())
            return false;
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                telegramId: String(telegramId),
                telegramLinkToken: null,
                telegramLinkExpiry: null,
            },
        });
        return true;
    }
    async findUserByTelegramId(telegramId) {
        return this.prisma.user.findUnique({
            where: { telegramId: String(telegramId) },
        });
    }
    async getBalances(userId) {
        return this.prisma.account.findMany({
            where: { userId, status: prisma_1.AccountStatus.ACTIVE },
            orderBy: { name: 'asc' },
        });
    }
    async getRecentTransactions(userId, limit = 5) {
        return this.prisma.transaction.findMany({
            where: { userId },
            orderBy: { transactionDate: 'desc' },
            take: limit,
            include: { category: true, sourceAccount: true, destinationAccount: true },
        });
    }
    async getMonthlySummary(userId) {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        const transactions = await this.prisma.transaction.findMany({
            where: { userId, transactionDate: { gte: startOfMonth, lte: endOfMonth } },
        });
        const income = transactions
            .filter((t) => t.type === prisma_1.TransactionType.INCOME)
            .reduce((sum, t) => sum + Number(t.amount), 0);
        const expense = transactions
            .filter((t) => t.type === prisma_1.TransactionType.EXPENSE)
            .reduce((sum, t) => sum + Number(t.amount), 0);
        const transferFees = transactions
            .filter((t) => t.type === prisma_1.TransactionType.TRANSFER && t.feeAmount)
            .reduce((sum, t) => sum + Number(t.feeAmount || 0), 0);
        return { income, expense: expense + transferFees, month: now };
    }
    async findCategoryByName(userId, name, type) {
        return this.prisma.category.findFirst({
            where: {
                OR: [{ userId }, { isDefault: true }],
                name: { contains: name, mode: 'insensitive' },
                transactionType: type,
                status: prisma_1.CategoryStatus.ACTIVE,
            },
        });
    }
    async getFirstActiveAccount(userId) {
        const account = await this.prisma.account.findFirst({
            where: { userId, status: prisma_1.AccountStatus.ACTIVE },
            orderBy: { createdAt: 'asc' },
        });
        if (!account)
            throw new common_1.NotFoundException('No active account found');
        return account;
    }
    async createTransaction(userId, type, amount, note, categoryName, accountName) {
        const account = accountName
            ? ((await this.findAccountByName(userId, accountName)) ??
                (await this.getFirstActiveAccount(userId)))
            : await this.getFirstActiveAccount(userId);
        let categoryId;
        if (categoryName) {
            const category = await this.findCategoryByName(userId, categoryName, type);
            categoryId = category?.id;
        }
        const dto = {
            type,
            amount,
            note,
            categoryId,
            sourceAccountId: type === prisma_1.TransactionType.EXPENSE ? account.id : undefined,
            destinationAccountId: type === prisma_1.TransactionType.INCOME ? account.id : undefined,
        };
        return this.transactionsService.create(userId, dto);
    }
    async createAccount(userId, name, type, initialBalance) {
        return this.prisma.account.create({
            data: {
                userId,
                name,
                type: type,
                initialBalance,
                currentBalance: initialBalance,
                currency: 'IDR',
                status: prisma_1.AccountStatus.ACTIVE,
            },
        });
    }
    async getAccountsByStatus(userId, status) {
        return this.prisma.account.findMany({
            where: {
                userId,
                status: status,
            },
            orderBy: { name: 'asc' },
        });
    }
    async findAccountByName(userId, name) {
        return this.prisma.account.findFirst({
            where: {
                userId,
                name: { contains: name, mode: 'insensitive' },
            },
        });
    }
    async archiveAccount(accountId, userId) {
        return this.prisma.account.update({
            where: { id: accountId, userId },
            data: { status: prisma_1.AccountStatus.ARCHIVED },
        });
    }
    async unarchiveAccount(accountId, userId) {
        return this.prisma.account.update({
            where: { id: accountId, userId },
            data: { status: prisma_1.AccountStatus.ACTIVE },
        });
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        transactions_service_1.TransactionsService])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map