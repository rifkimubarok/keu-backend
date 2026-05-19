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
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/auth-user.type';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterTransactionDto } from './dto/filter-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  create(
    @CurrentUser() user: AuthUser,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(user.sub, createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'List transactions with filters' })
  findAll(
    @CurrentUser() user: AuthUser,
    @Query() filter: FilterTransactionDto,
  ) {
    return this.transactionsService.findAll(user.sub, filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction details' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  findOne(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.transactionsService.findOne(id, user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a transaction' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
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
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.transactionsService.remove(id, user.sub);
  }
}
