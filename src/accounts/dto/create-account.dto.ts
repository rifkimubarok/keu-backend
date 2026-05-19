import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AccountType } from '../../../generated/prisma';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAccountDto {
  @ApiProperty({ example: 'BCA Main' })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ enum: AccountType, example: AccountType.BANK })
  @IsEnum(AccountType)
  type!: AccountType;

  @ApiProperty({ example: 1000000 })
  @Type(() => Number)
  @IsNumber()
  initialBalance!: number;

  @ApiPropertyOptional({ example: 'IDR' })
  @IsOptional()
  @IsString()
  currency?: string;
}
