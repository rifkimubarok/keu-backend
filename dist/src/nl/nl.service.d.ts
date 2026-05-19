import { ConfigService } from '@nestjs/config';
import { TelegramService } from '../telegram/telegram.service';
import { PrismaService } from '../prisma/prisma.service';
export type Intent = 'catat' | 'masuk' | 'saldo' | 'transaksi' | 'laporan' | 'tambahakun' | 'akun' | 'arsipkan' | 'aktifkan' | 'unknown';
export interface ContextMessage {
    role: 'user' | 'bot';
    text: string;
}
export interface ParsedIntent {
    intent: Intent;
    confidence: 'high' | 'low';
    params: {
        amount?: number;
        note?: string;
        category?: string;
        accountName?: string;
        accountType?: string;
        initialBalance?: number;
    };
    clarificationQuestion?: string;
}
export interface PendingIntent {
    intent: Intent;
    params: ParsedIntent['params'];
    question: string;
}
export declare class NlService {
    private readonly configService;
    private readonly prisma;
    private readonly telegramService;
    private readonly contextMap;
    private readonly pendingMap;
    private readonly gemini;
    constructor(configService: ConfigService, prisma: PrismaService, telegramService: TelegramService);
    isNlEnabled(telegramId: string): Promise<boolean>;
    toggleNlMode(telegramId: string): Promise<boolean>;
    addContext(telegramId: string, role: 'user' | 'bot', text: string): void;
    getContext(telegramId: string): ContextMessage[];
    setPending(telegramId: string, pending: PendingIntent): void;
    getPending(telegramId: string): PendingIntent | null;
    clearPending(telegramId: string): void;
    tryRegex(text: string): ParsedIntent | null;
    callGemini(text: string, context: ContextMessage[]): Promise<ParsedIntent>;
    parseIntent(text: string, context: ContextMessage[]): Promise<ParsedIntent>;
    executeIntent(userId: string, parsed: ParsedIntent): Promise<string>;
}
