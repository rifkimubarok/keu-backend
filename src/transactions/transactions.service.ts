import { BadRequestException, Injectable } from '@nestjs/common';
import {
  Prisma,
  Transaction,
  TransactionType,
} from '../../generated/prisma';
import { getPagination, paginate } from '../common/dto/paginated-response.dto';
import { single } from '../common/dto/single-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterTransactionDto } from './dto/filter-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

type TxClient = Prisma.TransactionClient;

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
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

      return single(transaction);
    });
  }

  async findAll(userId: string, filter: FilterTransactionDto = {}) {
    const { page, limit, skip } = getPagination(filter.page, filter.limit);
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

    return paginate(data, total, page, limit);
  }

  async findOne(id: string, userId: string) {
    const transaction = await this.prisma.transaction.findUniqueOrThrow({
      where: { id, userId },
      include: {
        sourceAccount: true,
        destinationAccount: true,
        category: true,
      },
    });

    return single(transaction);
  }

  async update(
    id: string,
    userId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const oldTransaction = await tx.transaction.findUniqueOrThrow({
        where: { id, userId },
      });
      const nextTransaction = {
        type: updateTransactionDto.type ?? oldTransaction.type,
        transactionDate:
          updateTransactionDto.transactionDate ??
          oldTransaction.transactionDate,
        amount: updateTransactionDto.amount ?? Number(oldTransaction.amount),
        feeAmount:
          updateTransactionDto.feeAmount ??
          (oldTransaction.feeAmount
            ? Number(oldTransaction.feeAmount)
            : undefined),
        sourceAccountId:
          updateTransactionDto.sourceAccountId ??
          oldTransaction.sourceAccountId ??
          undefined,
        destinationAccountId:
          updateTransactionDto.destinationAccountId ??
          oldTransaction.destinationAccountId ??
          undefined,
        categoryId:
          updateTransactionDto.categoryId ??
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

      return single(transaction);
    });
  }

  async remove(id: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.findUniqueOrThrow({
        where: { id, userId },
      });

      await this.rollbackBalance(tx, userId, transaction);

      const deletedTransaction = await tx.transaction.delete({
        where: { id },
      });

      return single(deletedTransaction);
    });
  }

  private buildWhere(
    userId: string,
    filter: FilterTransactionDto,
  ): Prisma.TransactionWhereInput {
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

  private async applyBalance(
    tx: TxClient,
    userId: string,
    transaction: CreateTransactionDto,
  ) {
    this.validateTransaction(transaction);

    if (transaction.type === TransactionType.INCOME) {
      await tx.account.update({
        where: { id: transaction.destinationAccountId, userId },
        data: { currentBalance: { increment: Number(transaction.amount) } },
      });
      return;
    }

    if (transaction.type === TransactionType.EXPENSE) {
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

  private async rollbackBalance(
    tx: TxClient,
    userId: string,
    transaction: Transaction,
  ) {
    if (
      transaction.type === TransactionType.INCOME &&
      transaction.destinationAccountId
    ) {
      await tx.account.update({
        where: { id: transaction.destinationAccountId, userId },
        data: { currentBalance: { decrement: Number(transaction.amount) } },
      });
      return;
    }

    if (
      transaction.type === TransactionType.EXPENSE &&
      transaction.sourceAccountId
    ) {
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

  private validateTransaction(transaction: CreateTransactionDto) {
    if (
      transaction.type === TransactionType.INCOME &&
      !transaction.destinationAccountId
    ) {
      throw new BadRequestException('Income must have a destination account');
    }

    if (
      transaction.type === TransactionType.EXPENSE &&
      !transaction.sourceAccountId
    ) {
      throw new BadRequestException('Expense must have a source account');
    }

    if (transaction.type !== TransactionType.TRANSFER) {
      return;
    }

    if (!transaction.sourceAccountId || !transaction.destinationAccountId) {
      throw new BadRequestException(
        'Transfer must have source and destination accounts',
      );
    }
    if (transaction.sourceAccountId === transaction.destinationAccountId) {
      throw new BadRequestException(
        'Source and destination accounts must be different',
      );
    }
  }
}
