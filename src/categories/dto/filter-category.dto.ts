import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TransactionType } from '../../../generated/prisma';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class FilterCategoryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ example: 'Food' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: TransactionType, example: TransactionType.EXPENSE })
  @IsOptional()
  @IsEnum(TransactionType)
  transactionType?: TransactionType;
}
