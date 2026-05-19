import { Action, Command, Ctx, On, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { Public } from '../auth/decorators/public.decorator';
import { NlService } from './nl.service';
import { TelegramService } from '../telegram/telegram.service';

@Update()
@Public()
export class NlUpdate {
  constructor(
    private readonly nlService: NlService,
    private readonly telegramService: TelegramService,
  ) {}

  @Command('nlmode')
  async onNlMode(@Ctx() ctx: Context) {
    const telegramId = String(ctx.from?.id);
    const enabled = await this.nlService.toggleNlMode(telegramId);
    await ctx.reply(
      enabled
        ? '✅ NL mode aktif. Kamu bisa chat natural tanpa prefix /\nContoh: "catat 50rb makan siang"'
        : '❌ NL mode nonaktif. Gunakan command seperti /catat, /saldo, dll.',
    );
  }

  @On('text')
  async onText(@Ctx() ctx: Context) {
    const telegramId = String(ctx.from?.id);
    const text = (ctx.message as any)?.text ?? '';

    if (text.startsWith('/')) return;
    if (!(await this.nlService.isNlEnabled(telegramId))) return;

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
      await ctx.reply(
        '❓ Tidak mengerti. Contoh: "catat 50rb makan" atau ketik /help',
      );
      return;
    }

    if (parsed.confidence === 'low') {
      const question =
        parsed.clarificationQuestion ?? 'Apakah maksudmu itu benar?';
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
      await ctx.reply(
        '❌ Akun belum terhubung. Kirim `/start <token>` untuk menghubungkan.',
        { parse_mode: 'Markdown' },
      );
      return;
    }

    try {
      const reply = await this.nlService.executeIntent(user.id, parsed);
      this.nlService.addContext(telegramId, 'bot', reply);
      await ctx.reply(reply, { parse_mode: 'Markdown' });
    } catch {
      await ctx.reply('❌ Gagal mengeksekusi perintah. Coba lagi.');
    }
  }

  @Action('nl_confirm_yes')
  async onConfirmYes(@Ctx() ctx: Context) {
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
      await ctx.editMessageText(
        '❌ Akun belum terhubung. Kirim /start <token>.',
      );
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
    } catch {
      await ctx.editMessageText('❌ Gagal mengeksekusi perintah. Coba lagi.');
    }
  }

  @Action('nl_confirm_no')
  async onConfirmNo(@Ctx() ctx: Context) {
    const telegramId = String(ctx.from?.id);
    this.nlService.clearPending(telegramId);
    await ctx.answerCbQuery();
    await ctx.editMessageText('Dibatalkan.');
  }

  private async executePending(
    ctx: Context,
    telegramId: string,
    pending: { intent: any; params: any },
  ) {
    const user = await this.telegramService.findUserByTelegramId(telegramId);
    if (!user) {
      await ctx.reply(
        '❌ Akun belum terhubung. Kirim `/start <token>` untuk menghubungkan.',
        { parse_mode: 'Markdown' },
      );
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
    } catch {
      await ctx.reply('❌ Gagal mengeksekusi perintah. Coba lagi.');
    }
  }
}
