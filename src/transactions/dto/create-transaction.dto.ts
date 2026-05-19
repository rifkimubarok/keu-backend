import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '../../../generated/prisma';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @ApiProperty({ enum: TransactionType, example: TransactionType.EXPENSE })
  @IsEnum(TransactionType)
  type!: TransactionType;

  @ApiPropertyOptional({ example: '2026-05-12T00:00:00Z' })
  @IsOptional()
  @Type(() => Date)
  transactionDate?: Date;

  @ApiProperty({ example: 50000 })
  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  amount!: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  feeAmount?: number;

  @ApiPropertyOptional({ example: 'uuid-source-account' })
  @IsOptional()
  @IsString()
  sourceAccountId?: string;

  @ApiPropertyOptional({ example: 'uuid-destination-account' })
  @IsOptional()
  @IsString()
  destinationAccountId?: string;

  @ApiPropertyOptional({ example: 'uuid-category' })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({ example: 'Lunch at mall' })
  @IsOptional()
  @IsString()
  note?: string;
}
