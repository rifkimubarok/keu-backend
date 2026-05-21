import { ApiProperty } from '@nestjs/swagger';
import { AccountStatus, AccountType, TransactionType } from '../../../generated/prisma';

class AccountSummaryDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'BCA Savings' })
  name: string;

  @ApiProperty({ enum: AccountType, example: AccountType.BANK })
  type: AccountType;

  @ApiProperty({ example: '1500000.00' })
  currentBalance: string;

  @ApiProperty({ example: 'IDR' })
  currency: string;

  @ApiProperty({ enum: AccountStatus, example: AccountStatus.ACTIVE })
  status: AccountStatus;
}

class MonthSummaryDto {
  @ApiProperty({ example: 5000000 })
  income: number;

  @ApiProperty({ example: 3000000 })
  expense: number;
}

class CategorySummaryDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'Food & Beverage' })
  name: string;

  @ApiProperty({ enum: TransactionType, example: TransactionType.EXPENSE })
  transactionType: TransactionType;

  @ApiProperty({ example: '🍔', nullable: true })
  icon: string | null;

  @ApiProperty({ example: '#FF5733', nullable: true })
  color: string | null;
}

class AccountRefDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'BCA Savings' })
  name: string;

  @ApiProperty({ enum: AccountType, example: AccountType.BANK })
  type: AccountType;
}

class TransactionSummaryDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ enum: TransactionType, example: TransactionType.EXPENSE })
  type: TransactionType;

  @ApiProperty({ example: '2026-05-21T12:00:00.000Z' })
  transactionDate: Date;

  @ApiProperty({ example: '50000.00' })
  amount: string;

  @ApiProperty({ example: 'Lunch', nullable: true })
  note: string | null;

  @ApiProperty({ type: CategorySummaryDto, nullable: true })
  category: CategorySummaryDto | null;

  @ApiProperty({ type: AccountRefDto, nullable: true })
  sourceAccount: AccountRefDto | null;

  @ApiProperty({ type: AccountRefDto, nullable: true })
  destinationAccount: AccountRefDto | null;
}

export class DashboardSummaryDto {
  @ApiProperty({ example: 5000000 })
  totalBalance: number;

  @ApiProperty({ type: [AccountSummaryDto] })
  accounts: AccountSummaryDto[];

  @ApiProperty({ type: MonthSummaryDto })
  thisMonth: MonthSummaryDto;

  @ApiProperty({ type: [TransactionSummaryDto] })
  recentTransactions: TransactionSummaryDto[];
}

export class DashboardResponseDto {
  @ApiProperty({ type: DashboardSummaryDto })
  data: DashboardSummaryDto;
}
