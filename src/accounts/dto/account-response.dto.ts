import { ApiProperty } from '@nestjs/swagger';
import { AccountStatus, AccountType } from '../../../generated/prisma';

export class AccountDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'uuid-string' })
  userId: string;

  @ApiProperty({ example: 'BCA Savings' })
  name: string;

  @ApiProperty({ enum: AccountType, example: AccountType.BANK })
  type: AccountType;

  @ApiProperty({ example: '1000000.00' })
  initialBalance: string;

  @ApiProperty({ example: '1500000.00' })
  currentBalance: string;

  @ApiProperty({ example: 'IDR' })
  currency: string;

  @ApiProperty({ enum: AccountStatus, example: AccountStatus.ACTIVE })
  status: AccountStatus;

  @ApiProperty({ example: '2026-05-21T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-05-21T12:00:00.000Z' })
  updatedAt: Date;
}

export class AccountResponseDto {
  @ApiProperty({ type: AccountDto })
  data: AccountDto;
}

export class AccountListResponseDto {
  @ApiProperty({ type: [AccountDto] })
  data: AccountDto[];

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 25 })
  total: number;

  @ApiProperty({ example: 3 })
  totalPages: number;
}

export class TotalBalanceDto {
  @ApiProperty({ example: 1500000 })
  totalBalance: number;

  @ApiProperty({ example: 3 })
  accountCount: number;
}

export class TotalBalanceResponseDto {
  @ApiProperty({ type: TotalBalanceDto })
  data: TotalBalanceDto;
}
