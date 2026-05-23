import { Controller, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { Public } from '../auth/decorators/public.decorator';

@Controller('telegram')
@Public()
export class TelegramWebhookController {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Post('webhook')
  async handleWebhook(
    @Body() update: object,
    @Headers('x-telegram-bot-api-secret-token') secretToken: string,
  ) {
    const expectedToken = process.env.TELEGRAM_SECRET_TOKEN;
    if (expectedToken && secretToken !== expectedToken) {
      throw new UnauthorizedException();
    }
    await this.bot.handleUpdate(update as any);
  }
}
