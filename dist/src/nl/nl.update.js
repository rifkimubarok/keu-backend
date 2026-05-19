"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NlUpdate = void 0;
const nestjs_telegraf_1 = require("nestjs-telegraf");
const telegraf_1 = require("telegraf");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const nl_service_1 = require("./nl.service");
const telegram_service_1 = require("../telegram/telegram.service");
let NlUpdate = class NlUpdate {
    nlService;
    telegramService;
    constructor(nlService, telegramService) {
        this.nlService = nlService;
        this.telegramService = telegramService;
    }
    async onNlMode(ctx) {
        const telegramId = String(ctx.from?.id);
        const enabled = await this.nlService.toggleNlMode(telegramId);
        await ctx.reply(enabled
            ? '✅ NL mode aktif. Kamu bisa chat natural tanpa prefix /\nContoh: "catat 50rb makan siang"'
            : '❌ NL mode nonaktif. Gunakan command seperti /catat, /saldo, dll.');
    }
    async onText(ctx) {
        const telegramId = String(ctx.from?.id);
        const text = ctx.message?.text ?? '';
        if (text.startsWith('/'))
            return;
        if (!(await this.nlService.isNlEnabled(telegramId)))
            return;
        this.nlService.addContext(telegramId, 'user', text);
        const pending = this.nlService.getPending(telegramId);
        if (pending) {
            if (/^(ya|iya|yes|ok|oke)/i.test(text)) {
                this.nlService.clearPending(telegramId);
                await this.executePending(ctx, telegramId, pending);
                return;
            }
            if (/^(tidak|no|gak|nggak|batal|cancel)/i.test(text)) {
                this.nlService.clearPending(telegramId);
                await ctx.reply('Dibatalkan.');
                return;
            }
        }
        const context = this.nlService.getContext(telegramId);
        const parsed = await this.nlService.parseIntent(text, context);
        if (parsed.intent === 'unknown') {
            await ctx.reply('❓ Tidak mengerti. Contoh: "catat 50rb makan" atau ketik /help');
            return;
        }
        if (parsed.confidence === 'low') {
            const question = parsed.clarificationQuestion ?? 'Apakah maksudmu itu benar?';
            this.nlService.setPending(telegramId, {
                intent: parsed.intent,
                params: parsed.params,
                question,
            });
            await ctx.reply(question, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '✅ Ya', callback_data: 'nl_confirm_yes' },
                            { text: '❌ Tidak', callback_data: 'nl_confirm_no' },
                        ],
                    ],
                },
            });
            return;
        }
        const user = await this.telegramService.findUserByTelegramId(telegramId);
        if (!user) {
            await ctx.reply('❌ Akun belum terhubung. Kirim `/start <token>` untuk menghubungkan.', { parse_mode: 'Markdown' });
            return;
        }
        try {
            const reply = await this.nlService.executeIntent(user.id, parsed);
            this.nlService.addContext(telegramId, 'bot', reply);
            await ctx.reply(reply, { parse_mode: 'Markdown' });
        }
        catch {
            await ctx.reply('❌ Gagal mengeksekusi perintah. Coba lagi.');
        }
    }
    async onConfirmYes(ctx) {
        const telegramId = String(ctx.from?.id);
        const pending = this.nlService.getPending(telegramId);
        if (!pending) {
            await ctx.answerCbQuery('Tidak ada perintah pending.');
            return;
        }
        this.nlService.clearPending(telegramId);
        await ctx.answerCbQuery();
        const user = await this.telegramService.findUserByTelegramId(telegramId);
        if (!user) {
            await ctx.editMessageText('❌ Akun belum terhubung. Kirim /start <token>.');
            return;
        }
        try {
            const reply = await this.nlService.executeIntent(user.id, {
                intent: pending.intent,
                confidence: 'high',
                params: pending.params,
            });
            this.nlService.addContext(telegramId, 'bot', reply);
            await ctx.editMessageText(reply, { parse_mode: 'Markdown' });
        }
        catch {
            await ctx.editMessageText('❌ Gagal mengeksekusi perintah. Coba lagi.');
        }
    }
    async onConfirmNo(ctx) {
        const telegramId = String(ctx.from?.id);
        this.nlService.clearPending(telegramId);
        await ctx.answerCbQuery();
        await ctx.editMessageText('Dibatalkan.');
    }
    async executePending(ctx, telegramId, pending) {
        const user = await this.telegramService.findUserByTelegramId(telegramId);
        if (!user) {
            await ctx.reply('❌ Akun belum terhubung. Kirim `/start <token>` untuk menghubungkan.', { parse_mode: 'Markdown' });
            return;
        }
        try {
            const reply = await this.nlService.executeIntent(user.id, {
                intent: pending.intent,
                confidence: 'high',
                params: pending.params,
            });
            this.nlService.addContext(telegramId, 'bot', reply);
            await ctx.reply(reply, { parse_mode: 'Markdown' });
        }
        catch {
            await ctx.reply('❌ Gagal mengeksekusi perintah. Coba lagi.');
        }
    }
};
exports.NlUpdate = NlUpdate;
__decorate([
    (0, nestjs_telegraf_1.Command)('nlmode'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], NlUpdate.prototype, "onNlMode", null);
__decorate([
    (0, nestjs_telegraf_1.On)('text'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], NlUpdate.prototype, "onText", null);
__decorate([
    (0, nestjs_telegraf_1.Action)('nl_confirm_yes'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], NlUpdate.prototype, "onConfirmYes", null);
__decorate([
    (0, nestjs_telegraf_1.Action)('nl_confirm_no'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], NlUpdate.prototype, "onConfirmNo", null);
exports.NlUpdate = NlUpdate = __decorate([
    (0, nestjs_telegraf_1.Update)(),
    (0, public_decorator_1.Public)(),
    __metadata("design:paramtypes", [nl_service_1.NlService,
        telegram_service_1.TelegramService])
], NlUpdate);
//# sourceMappingURL=nl.update.js.map