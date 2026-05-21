import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/auth-user.type';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterTransactionDto } from './dto/filter-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';
import { TransactionListResponseDto, TransactionResponseDto } from './dto/transaction-response.dto';
import { TransactionSummaryFilterDto } from './dto/transaction-summary-filter.dto';
import { TransactionSummaryResponseDto } from './dto/transaction-summary-response.dto';
import { CashflowTrendFilterDto } from './dto/cashflow-trend-filter.dto';
import {
  CashflowTrendResponseDto,
  ExpenseByCategoryResponseDto,
  IncomeByCategoryResponseDto,
} from './dto/transaction-analytics-response.dto';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({ status: 201, type: TransactionResponseDto })
  create(
    @CurrentUser() user: AuthUser,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(user.sub, createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'List transactions with filters' })
  @ApiResponse({ status: 200, type: TransactionListResponseDto })
  findAll(
    @CurrentUser() user: AuthUser,
    @Query() filter: FilterTransactionDto,
  ) {
    return this.transactionsService.findAll(user.sub, filter);
  }

  @Get('summary/monthly')
  @ApiOperation({ summary: 'Get monthly transaction summary (income, expense, net cash flow)' })
  @ApiResponse({ status: 200, type: TransactionSummaryResponseDto })
  getSummary(
    @CurrentUser() user: AuthUser,
    @Query() filter: TransactionSummaryFilterDto,
  ) {
    return this.transactionsService.getSummary(user.sub, filter);
  }

  @Get('summary/cashflow-trend')
  @ApiOperation({ summary: 'Get daily cashflow trend for a month' })
  @ApiResponse({ status: 200, type: CashflowTrendResponseDto })
  getCashflowTrend(
    @CurrentUser() user: AuthUser,
    @Query() filter: CashflowTrendFilterDto,
  ) {
    return this.transactionsService.getCashflowTrend(user.sub, filter);
  }

  @Get('summary/expense-by-category')
  @ApiOperation({ summary: 'Get expense breakdown by category' })
  @ApiResponse({ status: 200, type: ExpenseByCategoryResponseDto })
  getExpenseByCategory(
    @CurrentUser() user: AuthUser,
    @Query() filter: TransactionSummaryFilterDto,
  ) {
    return this.transactionsService.getExpenseByCategory(user.sub, filter);
  }

  @Get('summary/income-by-category')
  @ApiOperation({ summary: 'Get income breakdown by category' })
  @ApiResponse({ status: 200, type: IncomeByCategoryResponseDto })
  getIncomeByCategory(
    @CurrentUser() user: AuthUser,
    @Query() filter: TransactionSummaryFilterDto,
  ) {
    return this.transactionsService.getIncomeByCategory(user.sub, filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction details' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiResponse({ status: 200, type: TransactionResponseDto })
  findOne(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.transactionsService.findOne(id, user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a transaction' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiResponse({ status: 200, type: TransactionResponseDto })
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, user.sub, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiResponse({ status: 200, type: TransactionResponseDto })
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.transactionsService.remove(id, user.sub);
  }
}
