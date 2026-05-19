import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TelegramModule } from '../telegram/telegram.module';
import { NlService } from './nl.service';
import { NlUpdate } from './nl.update';

@Module({
  imports: [PrismaModule, TelegramModule],
  providers: [NlService, NlUpdate],
})
export class NlModule {}
