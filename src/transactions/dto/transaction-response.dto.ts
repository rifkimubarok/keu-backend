import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../../../generated/prisma';

export class TransactionDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'uuid-string' })
  userId: string;

  @ApiProperty({ enum: TransactionType, example: TransactionType.EXPENSE })
  type: TransactionType;

  @ApiProperty({ example: '2026-05-21T12:00:00.000Z' })
  transactionDate: Date;

  @ApiProperty({ example: '50000.00' })
  amount: string;

  @ApiProperty({ example: '2500.00', nullable: true })
  feeAmount: string | null;

  @ApiProperty({ example: 'uuid-string', nullable: true })
  sourceAccountId: string | null;

  @ApiProperty({ example: 'uuid-string', nullable: true })
  destinationAccountId: string | null;

  @ApiProperty({ example: 'uuid-string', nullable: true })
  categoryId: string | null;

  @ApiProperty({ example: 'Lunch at restaurant', nullable: true })
  note: string | null;

  @ApiProperty({ example: '2026-05-21T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-05-21T12:00:00.000Z' })
  updatedAt: Date;
}

export class TransactionResponseDto {
  @ApiProperty({ type: TransactionDto })
  data: TransactionDto;
}

export class TransactionListResponseDto {
  @ApiProperty({ type: [TransactionDto] })
  data: TransactionDto[];

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 10 })
  totalPages: number;
}
