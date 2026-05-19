import { Context, Telegraf } from 'telegraf';
import { TelegramService } from './telegram.service';
import { OnModuleInit } from '@nestjs/common';
export declare class TelegramUpdate implements OnModuleInit {
    private readonly bot;
    private readonly telegramService;
    constructor(bot: Telegraf<Context>, telegramService: TelegramService);
    onModuleInit(): Promise<void>;
    onStart(ctx: Context): Promise<void>;
    onHelp(ctx: Context): Promise<void>;
    onCatat(ctx: Context): Promise<void>;
    onMasuk(ctx: Context): Promise<void>;
    onSaldo(ctx: Context): Promise<void>;
    onTransaksi(ctx: Context): Promise<void>;
    onLaporan(ctx: Context): Promise<void>;
    onTambahAkun(ctx: Context): Promise<void>;
    onAkun(ctx: Context): Promise<void>;
    onArsipkan(ctx: Context): Promise<void>;
    onAktifkan(ctx: Context): Promise<void>;
    private handleTransaction;
    private getUser;
    onListActive(ctx: Context): Promise<void>;
    onListArchived(ctx: Context): Promise<void>;
    onArchiveAccount(ctx: Context): Promise<void>;
    onUnarchiveAccount(ctx: Context): Promise<void>;
    onBackToMenu(ctx: Context): Promise<void>;
    hallo(ctx: Context): Promise<void>;
}
