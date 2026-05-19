import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AccountStatus, AccountType } from '../../../generated/prisma';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class FilterAccountDto extends PaginationQueryDto {
  @ApiPropertyOptional({ example: 'BCA' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: AccountType, example: AccountType.BANK })
  @IsOptional()
  @IsEnum(AccountType)
  type?: AccountType;

  @ApiPropertyOptional({ example: 'IDR' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ enum: AccountStatus, example: AccountStatus.ACTIVE })
  @IsOptional()
  @IsEnum(AccountStatus)
  status?: AccountStatus;
}
