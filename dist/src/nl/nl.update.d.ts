import { Context } from 'telegraf';
import { NlService } from './nl.service';
import { TelegramService } from '../telegram/telegram.service';
export declare class NlUpdate {
    private readonly nlService;
    private readonly telegramService;
    constructor(nlService: NlService, telegramService: TelegramService);
    onNlMode(ctx: Context): Promise<void>;
    onText(ctx: Context): Promise<void>;
    onConfirmYes(ctx: Context): Promise<void>;
    onConfirmNo(ctx: Context): Promise<void>;
    private executePending;
}
