import { Controller, Delete, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/auth-user.type';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('telegram-link')
  @ApiOperation({ summary: 'Generate a one-time Telegram link token (expires in 15 min)' })
  async generateTelegramLink(@CurrentUser() user: AuthUser) {
    const token = await this.usersService.generateTelegramLinkToken(user.sub);
    return { token, expiresIn: 900 };
  }

  @Get('telegram-status')
  @ApiOperation({ summary: 'Check if Telegram account is linked' })
  getTelegramStatus(@CurrentUser() user: AuthUser) {
    return this.usersService.getTelegramStatus(user.sub);
  }

  @Delete('telegram-link')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Unlink Telegram account' })
  async unlinkTelegram(@CurrentUser() user: AuthUser) {
    await this.usersService.unlinkTelegram(user.sub);
  }
}
