import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TransactionType } from '../../../generated/prisma';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class FilterTransactionDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: TransactionType, example: TransactionType.EXPENSE })
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @ApiPropertyOptional({ example: 'uuid-account' })
  @IsOptional()
  @IsString()
  accountId?: string;

  @ApiPropertyOptional({ example: 'uuid-category' })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({ example: '2026-05-01T00:00:00Z' })
  @IsOptional()
  @Type(() => Date)
  from?: Date;

  @ApiPropertyOptional({ example: '2026-05-31T23:59:59Z' })
  @IsOptional()
  @Type(() => Date)
  to?: Date;

  @ApiPropertyOptional({ example: 10000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minAmount?: number;

  @ApiPropertyOptional({ example: 100000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxAmount?: number;

  @ApiPropertyOptional({ example: 'lunch' })
  @IsOptional()
  @IsString()
  search?: string;
}
