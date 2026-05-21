import { ApiProperty } from '@nestjs/swagger';

export class DailyFlowDto {
  @ApiProperty({ example: 1 })
  day: number;

  @ApiProperty({ example: 500000 })
  income: number;

  @ApiProperty({ example: 300000 })
  expense: number;

  @ApiProperty({ example: 200000 })
  net: number;
}

export class CashflowTrendDto {
  @ApiProperty({ type: [DailyFlowDto] })
  dailyFlow: DailyFlowDto[];

  @ApiProperty({ example: 5 })
  month: number;

  @ApiProperty({ example: 2026 })
  year: number;
}

export class CashflowTrendResponseDto {
  @ApiProperty({ type: CashflowTrendDto })
  data: CashflowTrendDto;
}

export class CategoryBreakdownDto {
  @ApiProperty({ example: 'uuid-string' })
  categoryId: string;

  @ApiProperty({ example: 'Food & Beverage' })
  categoryName: string;

  @ApiProperty({ example: 1500000 })
  total: number;

  @ApiProperty({ example: 15 })
  transactionCount: number;
}

export class ExpenseByCategoryDto {
  @ApiProperty({ type: [CategoryBreakdownDto] })
  categories: CategoryBreakdownDto[];

  @ApiProperty({ example: 3000000 })
  totalExpense: number;

  @ApiProperty({ example: 5 })
  month: number;

  @ApiProperty({ example: 2026 })
  year: number;
}

export class ExpenseByCategoryResponseDto {
  @ApiProperty({ type: ExpenseByCategoryDto })
  data: ExpenseByCategoryDto;
}

export class IncomeByCategoryDto {
  @ApiProperty({ type: [CategoryBreakdownDto] })
  categories: CategoryBreakdownDto[];

  @ApiProperty({ example: 5000000 })
  totalIncome: number;

  @ApiProperty({ example: 5 })
  month: number;

  @ApiProperty({ example: 2026 })
  year: number;
}

export class IncomeByCategoryResponseDto {
  @ApiProperty({ type: IncomeByCategoryDto })
  data: IncomeByCategoryDto;
}
