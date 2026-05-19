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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../generated/prisma");
const single_response_dto_1 = require("../common/dto/single-response.dto");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSummary(userId) {
        const activeAccounts = await this.prisma.account.findMany({
            where: { userId, status: prisma_1.AccountStatus.ACTIVE },
        });
        const totalBalance = activeAccounts.reduce((sum, acc) => sum + Number(acc.currentBalance), 0);
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        const thisMonthTransactions = await this.prisma.transaction.findMany({
            where: {
                userId,
                transactionDate: { gte: startOfMonth, lte: endOfMonth },
            },
        });
        const incomeThisMonth = thisMonthTransactions
            .filter((t) => t.type === prisma_1.TransactionType.INCOME)
            .reduce((sum, t) => sum + Number(t.amount), 0);
        const expenseThisMonth = thisMonthTransactions
            .filter((t) => t.type === prisma_1.TransactionType.EXPENSE)
            .reduce((sum, t) => sum + Number(t.amount), 0);
        const transferFees = thisMonthTransactions
            .filter((t) => t.type === prisma_1.TransactionType.TRANSFER && t.feeAmount)
            .reduce((sum, t) => sum + (Number(t.feeAmount) || 0), 0);
        const totalExpense = expenseThisMonth + transferFees;
        const recentTransactions = await this.prisma.transaction.findMany({
            where: { userId },
            orderBy: { transactionDate: 'desc' },
            take: 5,
            include: {
                category: true,
                sourceAccount: true,
                destinationAccount: true,
            },
        });
        return (0, single_response_dto_1.single)({
            totalBalance,
            accounts: activeAccounts,
            thisMonth: {
                income: incomeThisMonth,
                expense: totalExpense,
            },
            recentTransactions,
        });
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map