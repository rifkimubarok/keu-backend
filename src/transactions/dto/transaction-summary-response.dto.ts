import { ApiProperty } from '@nestjs/swagger';

export class TransactionSummaryDto {
  @ApiProperty({ example: 5000000 })
  totalIncome: number;

  @ApiProperty({ example: 3000000 })
  totalExpense: number;

  @ApiProperty({ example: 2000000 })
  netCashFlow: number;

  @ApiProperty({ example: 5 })
  month: number;

  @ApiProperty({ example: 2026 })
  year: number;
}

export class TransactionSummaryResponseDto {
  @ApiProperty({ type: TransactionSummaryDto })
  data: TransactionSummaryDto;
}
