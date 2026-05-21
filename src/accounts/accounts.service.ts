import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountStatus } from '../../generated/prisma';
import { getPagination, paginate } from '../common/dto/paginated-response.dto';
import { single } from '../common/dto/single-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { FilterAccountDto } from './dto/filter-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createAccountDto: CreateAccountDto) {
    const account = await this.prisma.account.create({
      data: {
        userId,
        name: createAccountDto.name,
        type: createAccountDto.type,
        initialBalance: createAccountDto.initialBalance,
        currentBalance: createAccountDto.initialBalance,
        currency: createAccountDto.currency || 'IDR',
        status: AccountStatus.ACTIVE,
      },
    });

    return single(account);
  }

  async findAll(userId: string, filter: FilterAccountDto = {}) {
    const { page, limit, skip } = getPagination(filter.page, filter.limit);
    const where = {
      userId,
      status: filter.status || AccountStatus.ACTIVE,
      type: filter.type,
      currency: filter.currency,
      ...(filter.name
        ? { name: { contains: filter.name, mode: 'insensitive' as const } }
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

    return paginate(data, total, page, limit);
  }

  async findOne(id: string, userId: string) {
    const account = await this.prisma.account.findUniqueOrThrow({
      where: { id, userId },
    });

    return single(account);
  }

  async update(id: string, userId: string, updateAccountDto: UpdateAccountDto) {
    const account = await this.prisma.account.update({
      where: { id, userId },
      data: {
        name: updateAccountDto.name,
        type: updateAccountDto.type,
        currency: updateAccountDto.currency,
      },
    });

    return single(account);
  }

  async archive(id: string, userId: string) {
    const account = await this.prisma.account.update({
      where: { id, userId },
      data: { status: AccountStatus.ARCHIVED },
    });

    return single(account);
  }

  async unarchive(id: string, userId: string) {
    const account = await this.prisma.account.update({
      where: { id, userId },
      data: { status: AccountStatus.ACTIVE },
    });

    return single(account);
  }

  async remove(id: string, userId: string) {
    const transactionsCount = await this.prisma.transaction.count({
      where: {
        userId,
        OR: [{ sourceAccountId: id }, { destinationAccountId: id }],
      },
    });

    if (transactionsCount > 0) {
      throw new BadRequestException(
        'Cannot delete account with existing transactions. Please archive it instead.',
      );
    }

    const account = await this.prisma.account.delete({
      where: { id, userId },
    });

    return single(account);
  }

  async getTotalBalance(userId: string) {
    const result = await this.prisma.account.aggregate({
      where: { userId, status: AccountStatus.ACTIVE },
      _sum: {
        currentBalance: true,
      },
      _count: true,
    });

    return single({
      totalBalance: Number(result._sum.currentBalance || 0),
      accountCount: result._count,
    });
  }
}
