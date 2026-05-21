import { ApiProperty } from '@nestjs/swagger';
import { CategoryStatus, TransactionType } from '../../../generated/prisma';

export class CategoryDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'uuid-string', nullable: true })
  userId: string | null;

  @ApiProperty({ example: 'Food & Beverage' })
  name: string;

  @ApiProperty({ enum: TransactionType, example: TransactionType.EXPENSE })
  transactionType: TransactionType;

  @ApiProperty({ example: '🍔', nullable: true })
  icon: string | null;

  @ApiProperty({ example: '#FF5733', nullable: true })
  color: string | null;

  @ApiProperty({ example: false })
  isDefault: boolean;

  @ApiProperty({ enum: CategoryStatus, example: CategoryStatus.ACTIVE })
  status: CategoryStatus;

  @ApiProperty({ example: '2026-05-21T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-05-21T12:00:00.000Z' })
  updatedAt: Date;
}

export class CategoryResponseDto {
  @ApiProperty({ type: CategoryDto })
  data: CategoryDto;
}

export class CategoryListResponseDto {
  @ApiProperty({ type: [CategoryDto] })
  data: CategoryDto[];

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 25 })
  total: number;

  @ApiProperty({ example: 3 })
  totalPages: number;
}
