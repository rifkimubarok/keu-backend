import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountStatus, AccountType, CategoryStatus, TransactionType } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class TelegramService {
  constructor(
    private prisma: PrismaService,
    private transactionsService: TransactionsService,
  ) {}

  async linkAccount(telegramId: string, token: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { telegramLinkToken: token },
    });

    if (!user) return false;
    if (user.telegramLinkExpiry && user.telegramLinkExpiry < new Date()) return false;

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

  async findUserByTelegramId(telegramId: string) {
    return this.prisma.user.findUnique({
      where: { telegramId: String(telegramId) },
    });
  }

  async getBalances(userId: string) {
    return this.prisma.account.findMany({
      where: { userId, status: AccountStatus.ACTIVE },
      orderBy: { name: 'asc' },
    });
  }

  async getRecentTransactions(userId: string, limit = 5) {
    return this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { transactionDate: 'desc' },
      take: limit,
      include: { category: true, sourceAccount: true, destinationAccount: true },
    });
  }

  async getMonthlySummary(userId: string) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const transactions = await this.prisma.transaction.findMany({
      where: { userId, transactionDate: { gte: startOfMonth, lte: endOfMonth } },
    });

    const income = transactions
      .filter((t) => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
      .filter((t) => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const transferFees = transactions
      .filter((t) => t.type === TransactionType.TRANSFER && t.feeAmount)
      .reduce((sum, t) => sum + Number(t.feeAmount || 0), 0);

    return { income, expense: expense + transferFees, month: now };
  }

  async findCategoryByName(userId: string, name: string, type: TransactionType) {
    return this.prisma.category.findFirst({
      where: {
        OR: [{ userId }, { isDefault: true }],
        name: { contains: name, mode: 'insensitive' },
        transactionType: type,
        status: CategoryStatus.ACTIVE,
      },
    });
  }

  async getFirstActiveAccount(userId: string) {
    const account = await this.prisma.account.findFirst({
      where: { userId, status: AccountStatus.ACTIVE },
      orderBy: { createdAt: 'asc' },
    });

    if (!account) throw new NotFoundException('No active account found');
    return account;
  }

  async createTransaction(
    userId: string,
    type: TransactionType,
    amount: number,
    note: string,
    categoryName?: string,
    accountName?: string,
  ) {
    const account = accountName
      ? ((await this.findAccountByName(userId, accountName)) ??
        (await this.getFirstActiveAccount(userId)))
      : await this.getFirstActiveAccount(userId);
    let categoryId: string | undefined;

    if (categoryName) {
      const category = await this.findCategoryByName(userId, categoryName, type);
      categoryId = category?.id;
    }

    const dto = {
      type,
      amount,
      note,
      categoryId,
      sourceAccountId: type === TransactionType.EXPENSE ? account.id : undefined,
      destinationAccountId: type === TransactionType.INCOME ? account.id : undefined,
    };

    return this.transactionsService.create(userId, dto as any);
  }

  async createAccount(
    userId: string,
    name: string,
    type: string,
    initialBalance: number,
  ) {
    return this.prisma.account.create({
      data: {
        userId,
        name,
        type: type as AccountType,
        initialBalance,
        currentBalance: initialBalance,
        currency: 'IDR',
        status: AccountStatus.ACTIVE,
      },
    });
  }

  async getAccountsByStatus(userId: string, status: string) {
    return this.prisma.account.findMany({
      where: {
        userId,
        status: status as AccountStatus,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findAccountByName(userId: string, name: string) {
    return this.prisma.account.findFirst({
      where: {
        userId,
        name: { contains: name, mode: 'insensitive' },
      },
    });
  }

  async archiveAccount(accountId: string, userId: string) {
    return this.prisma.account.update({
      where: { id: accountId, userId },
      data: { status: AccountStatus.ARCHIVED },
    });
  }

  async unarchiveAccount(accountId: string, userId: string) {
    return this.prisma.account.update({
      where: { id: accountId, userId },
      data: { status: AccountStatus.ACTIVE },
    });
  }
}
