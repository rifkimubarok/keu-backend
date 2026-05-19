import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { TelegramService } from './telegram.service';
import { TelegramUpdate } from './telegram.update';

@Module({
  imports: [PrismaModule, TransactionsModule],
  providers: [TelegramService, TelegramUpdate],
  exports: [TelegramService],
})
export class TelegramModule {}
