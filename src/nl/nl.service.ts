import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TransactionType } from '../../generated/prisma';
import { TelegramService } from '../telegram/telegram.service';
import { PrismaService } from '../prisma/prisma.service';

export type Intent =
  | 'catat'
  | 'masuk'
  | 'saldo'
  | 'transaksi'
  | 'laporan'
  | 'tambahakun'
  | 'akun'
  | 'arsipkan'
  | 'aktifkan'
  | 'unknown';

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

const MAX_CONTEXT = 5;

const PATTERNS: Array<{
  intent: Intent;
  regex: RegExp;
  extract: (m: RegExpMatchArray) => ParsedIntent['params'];
}> = [
  {
    intent: 'catat',
    regex: /^(catat|bayar|beli|habis|keluar)\s+(\S+)\s+(.+?)(?:\s+(?:dari|pakai|pake|via|lewat)\s+(.+))?$/i,
    extract: (m) => ({
      amount: parseAmount(m[2]) ?? undefined,
      note: m[3].trim(),
      accountName: m[4]?.trim(),
    }),
  },
  {
    intent: 'masuk',
    regex: /^(masuk|terima|dapat|gajian|income)\s+(\S+)\s*(.*?)(?:\s+(?:ke|ke akun)\s+(.+))?$/i,
    extract: (m) => ({
      amount: parseAmount(m[2]) ?? undefined,
      note: m[3]?.trim() || '',
      accountName: m[4]?.trim(),
    }),
  },
  {
    intent: 'saldo',
    regex: /^(saldo|cek saldo|lihat saldo|balance)/i,
    extract: () => ({}),
  },
  {
    intent: 'transaksi',
    regex: /^(transaksi|riwayat|histori|history)/i,
    extract: () => ({}),
  },
  {
    intent: 'laporan',
    regex: /^(laporan|rekap|ringkasan|report)/i,
    extract: () => ({}),
  },
  {
    intent: 'tambahakun',
    regex: /^(tambah akun|buat akun|tambahakun)\s+(\S+)\s+(\S+)\s+(\S+)/i,
    extract: (m) => ({
      accountName: m[2],
      accountType: m[3].toUpperCase(),
      initialBalance: parseAmount(m[4]) ?? 0,
    }),
  },
  {
    intent: 'akun',
    regex: /^(akun|daftar akun|list akun)/i,
    extract: () => ({}),
  },
  {
    intent: 'arsipkan',
    regex: /^(arsipkan|arsip)\s+(.+)/i,
    extract: (m) => ({ accountName: m[2].trim() }),
  },
  {
    intent: 'aktifkan',
    regex: /^(aktifkan)\s+(.+)/i,
    extract: (m) => ({ accountName: m[2].trim() }),
  },
];

function parseAmount(raw: string): number | null {
  if (!raw) return null;
  const cleaned = raw.toLowerCase().trim();
  if (/^\d+(\.\d+)?jt$/.test(cleaned)) return parseFloat(cleaned) * 1_000_000;
  if (/^\d+(\.\d+)?rb$/.test(cleaned)) return parseFloat(cleaned) * 1_000;
  if (/^\d+(\.\d+)?k$/.test(cleaned)) return parseFloat(cleaned) * 1_000;
  const num = parseFloat(cleaned.replace(/[.,]/g, ''));
  return isNaN(num) ? null : num;
}

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

const GEMINI_SYSTEM_PROMPT = `Kamu adalah parser intent untuk aplikasi keuangan berbahasa Indonesia.
Analisis pesan user dan kembalikan JSON ONLY, tanpa markdown, tanpa kode blok.

Intent yang tersedia:
- catat: catat pengeluaran (params: amount, note, category?, accountName? — akun sumber, keyword: "dari/pakai/pake/via/lewat <nama akun>")
- masuk: catat pemasukan (params: amount, note, category?, accountName? — akun tujuan, keyword: "ke/ke akun <nama akun>")
- saldo: lihat saldo akun
- transaksi: lihat riwayat transaksi
- laporan: lihat laporan bulanan
- tambahakun: buat akun baru (params: accountName, accountType[BANK|CASH|EWALLET|SAVINGS|OTHER], initialBalance)
- akun: lihat daftar akun
- arsipkan: arsipkan akun (params: accountName)
- aktifkan: aktifkan akun (params: accountName)
- unknown: tidak dikenali

Parsing amount: "50rb"→50000, "1.5jt"→1500000, "500k"→500000, "50000"→50000.

Return format (JSON only):
{"intent":"<intent>","confidence":"high"|"low","params":{...},"clarificationQuestion":"<hanya jika confidence=low>"}`;

@Injectable()
export class NlService {
  private readonly contextMap = new Map<string, ContextMessage[]>();
  private readonly pendingMap = new Map<string, PendingIntent>();
  private readonly gemini: GoogleGenerativeAI;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly telegramService: TelegramService,
  ) {
    this.gemini = new GoogleGenerativeAI(
      this.configService.getOrThrow<string>('GEMINI_API_KEY'),
    );
  }

  async isNlEnabled(telegramId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { telegramId },
      select: { nlModeEnabled: true },
    });
    return user?.nlModeEnabled ?? false;
  }

  async toggleNlMode(telegramId: string): Promise<boolean> {
    const current = await this.isNlEnabled(telegramId);
    const next = !current;
    await this.prisma.user.update({
      where: { telegramId },
      data: { nlModeEnabled: next },
    });
    return next;
  }

  addContext(telegramId: string, role: 'user' | 'bot', text: string): void {
    const ctx = this.contextMap.get(telegramId) ?? [];
    ctx.push({ role, text });
    if (ctx.length > MAX_CONTEXT) ctx.shift();
    this.contextMap.set(telegramId, ctx);
  }

  getContext(telegramId: string): ContextMessage[] {
    return this.contextMap.get(telegramId) ?? [];
  }

  setPending(telegramId: string, pending: PendingIntent): void {
    this.pendingMap.set(telegramId, pending);
  }

  getPending(telegramId: string): PendingIntent | null {
    return this.pendingMap.get(telegramId) ?? null;
  }

  clearPending(telegramId: string): void {
    this.pendingMap.delete(telegramId);
  }

  tryRegex(text: string): ParsedIntent | null {
    for (const p of PATTERNS) {
      const m = text.match(p.regex);
      if (m) {
        const params = p.extract(m);
        if (p.intent === 'catat' || p.intent === 'masuk') {
          if (!params.amount || params.amount <= 0) return null;
        }
        return { intent: p.intent, confidence: 'high', params };
      }
    }
    return null;
  }

  async callGemini(
    text: string,
    context: ContextMessage[],
  ): Promise<ParsedIntent> {
    try {
      const model = this.gemini.getGenerativeModel({
        model: 'gemini-2.0-flash',
        systemInstruction: GEMINI_SYSTEM_PROMPT,
      });

      const contextStr =
        context.length > 0
          ? `Konteks percakapan:\n${context.map((m) => `${m.role}: ${m.text}`).join('\n')}\n\n`
          : '';

      const result = await model.generateContent(
        `${contextStr}Pesan: "${text}"`,
      );
      const raw = result.response.text().trim();
      const parsed = JSON.parse(raw) as ParsedIntent;
      return parsed;
    } catch {
      return { intent: 'unknown', confidence: 'low', params: {} };
    }
  }

  async parseIntent(
    text: string,
    context: ContextMessage[],
  ): Promise<ParsedIntent> {
    const regexResult = this.tryRegex(text);
    if (regexResult) return regexResult;
    return this.callGemini(text, context);
  }

  async executeIntent(userId: string, parsed: ParsedIntent): Promise<string> {
    const { intent, params } = parsed;

    switch (intent) {
      case 'catat': {
        await this.telegramService.createTransaction(
          userId,
          TransactionType.EXPENSE,
          params.amount!,
          params.note ?? '',
          params.category,
          params.accountName,
        );
        const accLabel = params.accountName ? ` (${params.accountName})` : '';
        return `✅ Pengeluaran *${formatRupiah(params.amount!)}* dicatat!\nCatatan: ${params.note ?? '-'}${accLabel}`;
      }

      case 'masuk': {
        await this.telegramService.createTransaction(
          userId,
          TransactionType.INCOME,
          params.amount!,
          params.note ?? '',
          params.category,
          params.accountName,
        );
        const accLabel = params.accountName ? ` (${params.accountName})` : '';
        return `✅ Pemasukan *${formatRupiah(params.amount!)}* dicatat!\nCatatan: ${params.note ?? '-'}${accLabel}`;
      }

      case 'saldo': {
        const accounts = await this.telegramService.getBalances(userId);
        if (accounts.length === 0) return 'Belum ada akun aktif.';
        const lines = accounts.map(
          (a) => `• *${a.name}* (${a.type})\n  ${formatRupiah(Number(a.currentBalance))}`,
        );
        return `💰 *Saldo Akun:*\n\n${lines.join('\n\n')}`;
      }

      case 'transaksi': {
        const txs = await this.telegramService.getRecentTransactions(userId);
        if (txs.length === 0) return 'Belum ada transaksi.';
        const lines = txs.map((t) => {
          const sign =
            t.type === TransactionType.INCOME
              ? '+'
              : t.type === TransactionType.EXPENSE
                ? '-'
                : '↔';
          const cat = t.category?.name ?? '-';
          const acc =
            t.type === TransactionType.INCOME
              ? t.destinationAccount?.name
              : t.sourceAccount?.name;
          const date = t.transactionDate.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
          });
          return `${sign} *${formatRupiah(Number(t.amount))}* — ${t.note ?? cat}\n  📁 ${cat} | 🏦 ${acc ?? '-'} | ${date}`;
        });
        return `📋 *5 Transaksi Terakhir:*\n\n${lines.join('\n\n')}`;
      }

      case 'laporan': {
        const summary = await this.telegramService.getMonthlySummary(userId);
        const net = summary.income - summary.expense;
        const netSign = net >= 0 ? '+' : '';
        const month = summary.month.toLocaleString('id-ID', {
          month: 'long',
          year: 'numeric',
        });
        return (
          `📊 *Laporan ${month}:*\n\n` +
          `🟢 Pemasukan: ${formatRupiah(summary.income)}\n` +
          `🔴 Pengeluaran: ${formatRupiah(summary.expense)}\n` +
          `─────────────────\n` +
          `💼 Net: ${netSign}${formatRupiah(net)}`
        );
      }

      case 'tambahakun': {
        const validTypes = ['BANK', 'CASH', 'EWALLET', 'SAVINGS', 'OTHER'];
        if (!validTypes.includes(params.accountType ?? '')) {
          return `❌ Tipe akun tidak valid. Pilih: ${validTypes.join(', ')}`;
        }
        await this.telegramService.createAccount(
          userId,
          params.accountName!,
          params.accountType!,
          params.initialBalance ?? 0,
        );
        return `✅ Akun *${params.accountName}* berhasil ditambahkan!\nTipe: ${params.accountType}\nSaldo awal: ${formatRupiah(params.initialBalance ?? 0)}`;
      }

      case 'akun': {
        const accounts = await this.telegramService.getAccountsByStatus(
          userId,
          'ACTIVE',
        );
        if (accounts.length === 0) return 'Belum ada akun aktif.';
        const lines = accounts.map(
          (a) => `• *${a.name}* (${a.type}) — ${formatRupiah(Number(a.currentBalance))}`,
        );
        return `📋 *Akun Aktif:*\n\n${lines.join('\n')}`;
      }

      case 'arsipkan': {
        const account = await this.telegramService.findAccountByName(
          userId,
          params.accountName!,
        );
        if (!account) return `❌ Akun "${params.accountName}" tidak ditemukan.`;
        if (account.status === 'ARCHIVED')
          return `❌ Akun "${params.accountName}" sudah diarsipkan.`;
        await this.telegramService.archiveAccount(account.id, userId);
        return `✅ Akun *${account.name}* berhasil diarsipkan.`;
      }

      case 'aktifkan': {
        const account = await this.telegramService.findAccountByName(
          userId,
          params.accountName!,
        );
        if (!account) return `❌ Akun "${params.accountName}" tidak ditemukan.`;
        if (account.status === 'ACTIVE')
          return `❌ Akun "${params.accountName}" sudah aktif.`;
        await this.telegramService.unarchiveAccount(account.id, userId);
        return `✅ Akun *${account.name}* berhasil diaktifkan.`;
      }

      default:
        return '❓ Tidak mengerti perintah. Ketik /help untuk daftar perintah.';
    }
  }
}
