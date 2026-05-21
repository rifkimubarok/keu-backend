import { Controller, Delete, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/auth-user.type';
import { UsersService } from './users.service';
import { TelegramLinkDto, TelegramStatusResponseDto, UserResponseDto } from './dto/user-response.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  getProfile(@CurrentUser() user: AuthUser) {
    return this.usersService.getProfile(user.sub);
  }

  @Post('telegram-link')
  @ApiOperation({ summary: 'Generate a one-time Telegram link token (expires in 15 min)' })
  @ApiResponse({ status: 200, type: TelegramLinkDto })
  async generateTelegramLink(@CurrentUser() user: AuthUser) {
    const token = await this.usersService.generateTelegramLinkToken(user.sub);
    return { token, expiresIn: 900 };
  }

  @Get('telegram-status')
  @ApiOperation({ summary: 'Check if Telegram account is linked' })
  @ApiResponse({ status: 200, type: TelegramStatusResponseDto })
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
