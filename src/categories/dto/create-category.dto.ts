import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '../../../generated/prisma';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Food' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ enum: TransactionType, example: TransactionType.EXPENSE })
  @IsEnum(TransactionType)
  transactionType!: TransactionType;

  @ApiPropertyOptional({ example: 'utensils' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ example: '#FF5733' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
