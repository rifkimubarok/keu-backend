import { Injectable } from '@nestjs/common';
import { AccountStatus, TransactionType } from '../../generated/prisma';
import { single } from '../common/dto/single-response.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary(userId: string) {
    // Total Balance (Active accounts)
    const activeAccounts = await this.prisma.account.findMany({
      where: { userId, status: AccountStatus.ACTIVE },
    });
    const totalBalance = activeAccounts.reduce(
      (sum, acc) => sum + Number(acc.currentBalance),
      0,
    );

    // This month dates
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    // Income & Expense this month
    const thisMonthTransactions = await this.prisma.transaction.findMany({
      where: {
        userId,
        transactionDate: { gte: startOfMonth, lte: endOfMonth },
      },
    });

    const incomeThisMonth = thisMonthTransactions
      .filter((t) => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expenseThisMonth = thisMonthTransactions
      .filter((t) => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // Fee from transfers counts as expense
    const transferFees = thisMonthTransactions
      .filter((t) => t.type === TransactionType.TRANSFER && t.feeAmount)
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

    return single({
      totalBalance,
      accounts: activeAccounts,
      thisMonth: {
        income: incomeThisMonth,
        expense: totalExpense,
      },
      recentTransactions,
    });
  }
}
