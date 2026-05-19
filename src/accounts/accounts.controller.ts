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
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { FilterAccountDto } from './dto/filter-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('Accounts')
@ApiBearerAuth()
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  create(
    @CurrentUser() user: AuthUser,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return this.accountsService.create(user.sub, createAccountDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all accounts for the user' })
  findAll(@CurrentUser() user: AuthUser, @Query() filter: FilterAccountDto) {
    return this.accountsService.findAll(user.sub, filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get account details' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  findOne(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.accountsService.findOne(id, user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an account' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.update(id, user.sub, updateAccountDto);
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archive an account' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  archive(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.accountsService.archive(id, user.sub);
  }

  @Patch(':id/unarchive')
  @ApiOperation({ summary: 'Unarchive an account' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  unarchive(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.accountsService.unarchive(id, user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an account' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.accountsService.remove(id, user.sub);
  }
}
