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
exports.TelegramUpdate = void 0;
const nestjs_telegraf_1 = require("nestjs-telegraf");
const telegraf_1 = require("telegraf");
const prisma_1 = require("../../generated/prisma");
const telegram_service_1 = require("./telegram.service");
const public_decorator_1 = require("../auth/decorators/public.decorator");
function parseAmount(raw) {
    const cleaned = raw.toLowerCase().trim();
    if (/^\d+(\.\d+)?jt$/.test(cleaned))
        return parseFloat(cleaned) * 1_000_000;
    if (/^\d+(\.\d+)?rb$/.test(cleaned))
        return parseFloat(cleaned) * 1_000;
    if (/^\d+(\.\d+)?k$/.test(cleaned))
        return parseFloat(cleaned) * 1_000;
    const num = parseFloat(cleaned.replace(/[.,]/g, ''));
    return isNaN(num) ? null : num;
}
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}
function getMonthName(date) {
    return date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
}
let TelegramUpdate = class TelegramUpdate {
    bot;
    telegramService;
    constructor(bot, telegramService) {
        this.bot = bot;
        this.telegramService = telegramService;
    }
    async onModuleInit() {
        await this.bot.telegram.setMyCommands([
            { command: 'start', description: 'Hubungkan akun Telegram' },
            { command: 'help', description: 'Daftar perintah' },
            { command: 'catat', description: 'Catat pengeluaran' },
            { command: 'masuk', description: 'Catat pemasukan' },
            { command: 'saldo', description: 'Lihat saldo semua akun' },
            { command: 'transaksi', description: '5 transaksi terakhir' },
            { command: 'laporan', description: 'Ringkasan bulan ini' },
            { command: 'tambahakun', description: 'Tambah akun baru' },
            { command: 'akun', description: 'Kelola akun (aktif/arsip)' },
            { command: 'arsipkan', description: 'Arsipkan akun' },
            { command: 'aktifkan', description: 'Aktifkan akun arsip' },
        ]);
    }
    async onStart(ctx) {
        try {
            const text = ctx.message?.text ?? '';
            const token = text.split(' ')[1]?.trim();
            const telegramId = String(ctx.from?.id);
            if (!token) {
                await ctx.reply('👋 Halo! Ini bot Keuangan.\n\nUntuk mulai, buka aplikasi web lalu salin token dari menu *Telegram Link*, kemudian kirim:\n`/start <token>`', { parse_mode: 'Markdown' });
                return;
            }
            const linked = await this.telegramService.linkAccount(telegramId, token);
            if (linked) {
                await ctx.reply('✅ Akun berhasil terhubung! Ketik /help untuk melihat perintah.');
            }
            else {
                await ctx.reply('❌ Token tidak valid atau sudah kadaluarsa. Buat token baru di aplikasi web.');
            }
        }
        catch (error) {
            console.error('Error in /start command:', error instanceof Error ? error.message : String(error));
            try {
                await ctx.reply('❌ Terjadi kesalahan sistem. Silakan coba lagi atau hubungi admin.');
            }
            catch (replyError) {
                console.error('Failed to send error message:', replyError instanceof Error ? replyError.message : String(replyError));
            }
        }
    }
    async onHelp(ctx) {
        try {
            await ctx.reply('*Daftar Perintah:*\n\n' +
                '`/catat <jumlah> <catatan> [kategori]` — Catat pengeluaran\n' +
                '`/masuk <jumlah> <catatan> [kategori]` — Catat pemasukan\n' +
                '`/saldo` — Lihat saldo semua akun\n' +
                '`/transaksi` — 5 transaksi terakhir\n' +
                '`/laporan` — Ringkasan bulan ini\n' +
                '`/tambahakun <nama> <tipe> <saldo>` — Tambah akun baru\n' +
                '`/akun [aktif|arsip]` — List akun (default: aktif)\n' +
                '`/arsipkan <nama>` — Arsipkan akun\n' +
                '`/aktifkan <nama>` — Aktifkan akun arsip\n\n' +
                '*Contoh:*\n' +
                '`/catat 50rb makan siang Makanan`\n' +
                '`/masuk 1.5jt gajian`\n' +
                '`/tambahakun BCA BANK 1000000`', { parse_mode: 'Markdown' });
        }
        catch (error) {
            console.error('Error in /help command:', error instanceof Error ? error.message : String(error));
            try {
                await ctx.reply('❌ Terjadi kesalahan sistem. Silakan coba lagi atau hubungi admin.');
            }
            catch (replyError) {
                console.error('Failed to send error message:', replyError instanceof Error ? replyError.message : String(replyError));
            }
        }
    }
    async onCatat(ctx) {
        try {
            await this.handleTransaction(ctx, prisma_1.TransactionType.EXPENSE);
        }
        catch (error) {
            console.error('Error in /catat command:', error instanceof Error ? error.message : String(error));
            try {
                await ctx.reply('❌ Terjadi kesalahan sistem. Silakan coba lagi atau hubungi admin.');
            }
            catch (replyError) {
                console.error('Failed to send error message:', replyError instanceof Error ? replyError.message : String(replyError));
            }
        }
    }
    async onMasuk(ctx) {
        try {
            await this.handleTransaction(ctx, prisma_1.TransactionType.INCOME);
        }
        catch (error) {
            console.error('Error in /masuk command:', error instanceof Error ? error.message : String(error));
            try {
                await ctx.reply('❌ Terjadi kesalahan sistem. Silakan coba lagi atau hubungi admin.');
            }
            catch (replyError) {
                console.error('Failed to send error message:', replyError instanceof Error ? replyError.message : String(replyError));
            }
        }
    }
    async onSaldo(ctx) {
        try {
            const user = await this.getUser(ctx);
            if (!user)
                return;
            const accounts = await this.telegramService.getBalances(user.id);
            if (accounts.length === 0) {
                await ctx.reply('Belum ada akun aktif.');
                return;
            }
            const lines = accounts.map((a) => `• *${a.name}* (${a.type})\n  ${formatRupiah(Number(a.currentBalance))}`);
            await ctx.reply(`💰 *Saldo Akun:*\n\n${lines.join('\n\n')}`, {
                parse_mode: 'Markdown',
            });
        }
        catch (error) {
            console.error('Error in /saldo command:', error instanceof Error ? error.message : String(error));
            try {
                await ctx.reply('❌ Terjadi kesalahan sistem. Silakan coba lagi atau hubungi admin.');
            }
            catch (replyError) {
                console.error('Failed to send error message:', replyError instanceof Error ? replyError.message : String(replyError));
            }
        }
    }
    async onTransaksi(ctx) {
        try {
            const user = await this.getUser(ctx);
            if (!user)
                return;
            const transactions = await this.telegramService.getRecentTransactions(user.id);
            if (transactions.length === 0) {
                await ctx.reply('Belum ada transaksi.');
                return;
            }
            const lines = transactions.map((t) => {
                const sign = t.type === prisma_1.TransactionType.INCOME
                    ? '+'
                    : t.type === prisma_1.TransactionType.EXPENSE
                        ? '-'
                        : '↔';
                const cat = t.category?.name ?? '-';
                const acc = t.type === prisma_1.TransactionType.INCOME
                    ? t.destinationAccount?.name
                    : t.sourceAccount?.name;
                const date = t.transactionDate.toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                });
                return `${sign} *${formatRupiah(Number(t.amount))}* — ${t.note ?? cat}\n  📁 ${cat} | 🏦 ${acc ?? '-'} | ${date}`;
            });
            await ctx.reply(`📋 *5 Transaksi Terakhir:*\n\n${lines.join('\n\n')}`, {
                parse_mode: 'Markdown',
            });
        }
        catch (error) {
            console.error('Error in /transaksi command:', error instanceof Error ? error.message : String(error));
            try {
                await ctx.reply('❌ Terjadi kesalahan sistem. Silakan coba lagi atau hubungi admin.');
            }
            catch (replyError) {
                console.error('Failed to send error message:', replyError instanceof Error ? replyError.message : String(replyError));
            }
        }
    }
    async onLaporan(ctx) {
        try {
            const user = await this.getUser(ctx);
            if (!user)
                return;
            const summary = await this.telegramService.getMonthlySummary(user.id);
            const net = summary.income - summary.expense;
            const netSign = net >= 0 ? '+' : '';
            await ctx.reply(`📊 *Laporan ${getMonthName(summary.month)}:*\n\n` +
                `🟢 Pemasukan: ${formatRupiah(summary.income)}\n` +
                `🔴 Pengeluaran: ${formatRupiah(summary.expense)}\n` +
                `─────────────────\n` +
                `💼 Net: ${netSign}${formatRupiah(net)}`, { parse_mode: 'Markdown' });
        }
        catch (error) {
            console.error('Error in /laporan command:', error instanceof Error ? error.message : String(error));
            try {
                await ctx.reply('❌ Terjadi kesalahan sistem. Silakan coba lagi atau hubungi admin.');
            }
            catch (replyError) {
                console.error('Failed to send error message:', replyError instanceof Error ? replyError.message : String(replyError));
            }
        }
    }
    async onTambahAkun(ctx) {
        try {
            const user = await this.getUser(ctx);
            if (!user)
                return;
            const text = ctx.message?.text ?? '';
            const args = text.split(/\s+/).slice(1);
            if (args.length < 3) {
                await ctx.reply('Format: `/tambahakun <nama> <tipe> <saldo>`\n\n' +
                    'Tipe akun: BANK, CASH, EWALLET, SAVINGS, OTHER\n\n' +
                    'Contoh:\n' +
                    '`/tambahakun BCA BANK 1000000`\n' +
                    '`/tambahakun Dompet CASH 500rb`\n' +
                    '`/tambahakun GoPay EWALLET 100rb`', { parse_mode: 'Markdown' });
                return;
            }
            const name = args[0];
            const type = args[1].toUpperCase();
            const balanceRaw = args[2];
            const validTypes = ['BANK', 'CASH', 'EWALLET', 'SAVINGS', 'OTHER'];
            if (!validTypes.includes(type)) {
                await ctx.reply(`❌ Tipe tidak valid. Pilih: ${validTypes.join(', ')}`);
                return;
            }
            const balance = parseAmount(balanceRaw);
            if (balance === null || balance < 0) {
                await ctx.reply('❌ Saldo tidak valid. Contoh: `1000000`, `500rb`, `1.5jt`', { parse_mode: 'Markdown' });
                return;
            }
            await this.telegramService.createAccount(user.id, name, type, balance);
            await ctx.reply(`✅ Akun *${name}* berhasil ditambahkan!\nTipe: ${type}\nSaldo awal: ${formatRupiah(balance)}`, { parse_mode: 'Markdown' });
        }
        catch (error) {
            console.error('Error in /tambahakun command:', error instanceof Error ? error.message : String(error));
            try {
                await ctx.reply('❌ Terjadi kesalahan sistem. Silakan coba lagi atau hubungi admin.');
            }
            catch (replyError) {
                console.error('Failed to send error message:', replyError instanceof Error ? replyError.message : String(replyError));
            }
        }
    }
    async onAkun(ctx) {
        try {
            const user = await this.getUser(ctx);
            if (!user)
                return;
            await ctx.reply('📋 *Kelola Akun*\n\nPilih status akun yang ingin dilihat:', {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '✅ Akun Aktif', callback_data: 'list_active' },
                            { text: '📦 Akun Arsip', callback_data: 'list_archived' },
                        ],
                    ],
                },
            });
        }
        catch (error) {
            console.error('Error in /akun command:', error instanceof Error ? error.message : String(error));
            try {
                await ctx.reply('❌ Terjadi kesalahan sistem. Silakan coba lagi atau hubungi admin.');
            }
            catch (replyError) {
                console.error('Failed to send error message:', replyError instanceof Error ? replyError.message : String(replyError));
            }
        }
    }
    async onArsipkan(ctx) {
        try {
            const user = await this.getUser(ctx);
            if (!user)
                return;
            const text = ctx.message?.text ?? '';
            const args = text.split(/\s+/).slice(1);
            if (args.length === 0) {
                await ctx.reply('Format: `/arsipkan <nama akun>`\nContoh: `/arsipkan BCA`', { parse_mode: 'Markdown' });
                return;
            }
            const name = args.join(' ');
            const account = await this.telegramService.findAccountByName(user.id, name);
            if (!account) {
                await ctx.reply(`❌ Akun "${name}" tidak ditemukan.`);
                return;
            }
            if (account.status === 'ARCHIVED') {
                await ctx.reply(`❌ Akun "${name}" sudah diarsipkan.`);
                return;
            }
            await this.telegramService.archiveAccount(account.id, user.id);
            await ctx.reply(`✅ Akun *${account.name}* berhasil diarsipkan.`, {
                parse_mode: 'Markdown',
            });
        }
        catch (error) {
            console.error('Error in /arsipkan command:', error instanceof Error ? error.message : String(error));
            try {
                await ctx.reply('❌ Terjadi kesalahan sistem. Silakan coba lagi atau hubungi admin.');
            }
            catch (replyError) {
                console.error('Failed to send error message:', replyError instanceof Error ? replyError.message : String(replyError));
            }
        }
    }
    async onAktifkan(ctx) {
        try {
            const user = await this.getUser(ctx);
            if (!user)
                return;
            const text = ctx.message?.text ?? '';
            const args = text.split(/\s+/).slice(1);
            if (args.length === 0) {
                await ctx.reply('Format: `/aktifkan <nama akun>`\nContoh: `/aktifkan BCA`', { parse_mode: 'Markdown' });
                return;
            }
            const name = args.join(' ');
            const account = await this.telegramService.findAccountByName(user.id, name);
            if (!account) {
                await ctx.reply(`❌ Akun "${name}" tidak ditemukan.`);
                return;
            }
            if (account.status === 'ACTIVE') {
                await ctx.reply(`❌ Akun "${name}" sudah aktif.`);
                return;
            }
            await this.telegramService.unarchiveAccount(account.id, user.id);
            await ctx.reply(`✅ Akun *${account.name}* berhasil diaktifkan.`, {
                parse_mode: 'Markdown',
            });
        }
        catch (error) {
            console.error('Error in /aktifkan command:', error instanceof Error ? error.message : String(error));
            try {
                await ctx.reply('❌ Terjadi kesalahan sistem. Silakan coba lagi atau hubungi admin.');
            }
            catch (replyError) {
                console.error('Failed to send error message:', replyError instanceof Error ? replyError.message : String(replyError));
            }
        }
    }
    async handleTransaction(ctx, type) {
        try {
            const user = await this.getUser(ctx);
            if (!user)
                return;
            const text = ctx.message?.text ?? '';
            const args = text.split(/\s+/).slice(1);
            if (args.length < 2) {
                const cmd = type === prisma_1.TransactionType.EXPENSE ? 'catat' : 'masuk';
                await ctx.reply(`Format: \`/${cmd} <jumlah> <catatan> [kategori]\`\nContoh: \`/${cmd} 50rb makan siang\``, { parse_mode: 'Markdown' });
                return;
            }
            const amount = parseAmount(args[0]);
            if (!amount || amount <= 0) {
                await ctx.reply('❌ Jumlah tidak valid. Contoh: `50000`, `50rb`, `1.5jt`', { parse_mode: 'Markdown' });
                return;
            }
            const remaining = args.slice(1);
            const note = remaining.join(' ');
            const categoryName = remaining.length > 1 ? remaining[remaining.length - 1] : undefined;
            const noteClean = categoryName && remaining.length > 1
                ? remaining.slice(0, -1).join(' ')
                : note;
            try {
                await this.telegramService.createTransaction(user.id, type, amount, noteClean, categoryName);
                const typeLabel = type === prisma_1.TransactionType.EXPENSE ? '💸 Pengeluaran' : '💰 Pemasukan';
                await ctx.reply(`✅ ${typeLabel} *${formatRupiah(amount)}* dicatat!\nCatatan: ${noteClean}`, { parse_mode: 'Markdown' });
            }
            catch {
                await ctx.reply('❌ Gagal mencatat transaksi. Pastikan ada akun aktif.');
            }
        }
        catch (error) {
            console.error('Error in handleTransaction:', error instanceof Error ? error.message : String(error));
            try {
                await ctx.reply('❌ Terjadi kesalahan sistem. Silakan coba lagi atau hubungi admin.');
            }
            catch (replyError) {
                console.error('Failed to send error message:', replyError instanceof Error ? replyError.message : String(replyError));
            }
        }
    }
    async getUser(ctx) {
        try {
            const telegramId = String(ctx.from?.id);
            const user = await this.telegramService.findUserByTelegramId(telegramId);
            if (!user) {
                await ctx.reply('❌ Akun belum terhubung. Kirim `/start <token>` untuk menghubungkan.', { parse_mode: 'Markdown' });
                return null;
            }
            return user;
        }
        catch (error) {
            console.error('Error in getUser:', error instanceof Error ? error.message : String(error));
            try {
                await ctx.reply('❌ Terjadi kesalahan sistem. Silakan coba lagi atau hubungi admin.');
            }
            catch (replyError) {
                console.error('Failed to send error message:', replyError instanceof Error ? replyError.message : String(replyError));
            }
            return null;
        }
    }
    async onListActive(ctx) {
        try {
            const user = await this.telegramService.findUserByTelegramId(String(ctx.from?.id));
            if (!user) {
                await ctx.answerCbQuery('❌ Akun belum terhubung');
                return;
            }
            const accounts = await this.telegramService.getAccountsByStatus(user.id, 'ACTIVE');
            if (accounts.length === 0) {
                await ctx.answerCbQuery();
                await ctx.editMessageText('Belum ada akun aktif.');
                return;
            }
            const buttons = accounts.map((a) => [
                {
                    text: `${a.name} (${a.type}) - ${formatRupiah(Number(a.currentBalance))}`,
                    callback_data: `archive_${a.id}`,
                },
            ]);
            buttons.push([{ text: '« Kembali', callback_data: 'back_to_menu' }]);
            await ctx.answerCbQuery();
            await ctx.editMessageText('✅ *Akun Aktif*\n\nKlik akun untuk arsipkan:', {
                parse_mode: 'Markdown',
                reply_markup: { inline_keyboard: buttons },
            });
        }
        catch (error) {
            console.error('Error in list_active action:', error instanceof Error ? error.message : String(error));
            await ctx.answerCbQuery('❌ Terjadi kesalahan');
        }
    }
    async onListArchived(ctx) {
        try {
            const user = await this.telegramService.findUserByTelegramId(String(ctx.from?.id));
            if (!user) {
                await ctx.answerCbQuery('❌ Akun belum terhubung');
                return;
            }
            const accounts = await this.telegramService.getAccountsByStatus(user.id, 'ARCHIVED');
            if (accounts.length === 0) {
                await ctx.answerCbQuery();
                await ctx.editMessageText('Belum ada akun yang diarsipkan.');
                return;
            }
            const buttons = accounts.map((a) => [
                {
                    text: `${a.name} (${a.type}) - ${formatRupiah(Number(a.currentBalance))}`,
                    callback_data: `unarchive_${a.id}`,
                },
            ]);
            buttons.push([{ text: '« Kembali', callback_data: 'back_to_menu' }]);
            await ctx.answerCbQuery();
            await ctx.editMessageText('📦 *Akun Arsip*\n\nKlik akun untuk aktifkan kembali:', {
                parse_mode: 'Markdown',
                reply_markup: { inline_keyboard: buttons },
            });
        }
        catch (error) {
            console.error('Error in list_archived action:', error instanceof Error ? error.message : String(error));
            await ctx.answerCbQuery('❌ Terjadi kesalahan');
        }
    }
    async onArchiveAccount(ctx) {
        try {
            const match = ctx.callbackQuery.data.match(/^archive_(.+)$/);
            const accountId = match[1];
            const user = await this.telegramService.findUserByTelegramId(String(ctx.from?.id));
            if (!user) {
                await ctx.answerCbQuery('❌ Akun belum terhubung');
                return;
            }
            await this.telegramService.archiveAccount(accountId, user.id);
            await ctx.answerCbQuery('✅ Akun diarsipkan');
            const accounts = await this.telegramService.getAccountsByStatus(user.id, 'ACTIVE');
            if (accounts.length === 0) {
                await ctx.editMessageText('Belum ada akun aktif.');
                return;
            }
            const buttons = accounts.map((a) => [
                {
                    text: `${a.name} (${a.type}) - ${formatRupiah(Number(a.currentBalance))}`,
                    callback_data: `archive_${a.id}`,
                },
            ]);
            buttons.push([{ text: '« Kembali', callback_data: 'back_to_menu' }]);
            await ctx.editMessageText('✅ *Akun Aktif*\n\nKlik akun untuk arsipkan:', {
                parse_mode: 'Markdown',
                reply_markup: { inline_keyboard: buttons },
            });
        }
        catch (error) {
            console.error('Error in archive action:', error instanceof Error ? error.message : String(error));
            await ctx.answerCbQuery('❌ Terjadi kesalahan');
        }
    }
    async onUnarchiveAccount(ctx) {
        try {
            const match = ctx.callbackQuery.data.match(/^unarchive_(.+)$/);
            const accountId = match[1];
            const user = await this.telegramService.findUserByTelegramId(String(ctx.from?.id));
            if (!user) {
                await ctx.answerCbQuery('❌ Akun belum terhubung');
                return;
            }
            await this.telegramService.unarchiveAccount(accountId, user.id);
            await ctx.answerCbQuery('✅ Akun diaktifkan');
            const accounts = await this.telegramService.getAccountsByStatus(user.id, 'ARCHIVED');
            if (accounts.length === 0) {
                await ctx.editMessageText('Belum ada akun yang diarsipkan.');
                return;
            }
            const buttons = accounts.map((a) => [
                {
                    text: `${a.name} (${a.type}) - ${formatRupiah(Number(a.currentBalance))}`,
                    callback_data: `unarchive_${a.id}`,
                },
            ]);
            buttons.push([{ text: '« Kembali', callback_data: 'back_to_menu' }]);
            await ctx.editMessageText('📦 *Akun Arsip*\n\nKlik akun untuk aktifkan kembali:', {
                parse_mode: 'Markdown',
                reply_markup: { inline_keyboard: buttons },
            });
        }
        catch (error) {
            console.error('Error in unarchive action:', error instanceof Error ? error.message : String(error));
            await ctx.answerCbQuery('❌ Terjadi kesalahan');
        }
    }
    async onBackToMenu(ctx) {
        try {
            await ctx.answerCbQuery();
            await ctx.editMessageText('📋 *Kelola Akun*\n\nPilih status akun yang ingin dilihat:', {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '✅ Akun Aktif', callback_data: 'list_active' },
                            { text: '📦 Akun Arsip', callback_data: 'list_archived' },
                        ],
                    ],
                },
            });
        }
        catch (error) {
            console.error('Error in back_to_menu action:', error instanceof Error ? error.message : String(error));
            await ctx.answerCbQuery('❌ Terjadi kesalahan');
        }
    }
    async hallo(ctx) {
        await ctx.reply('Hallo');
    }
};
exports.TelegramUpdate = TelegramUpdate;
__decorate([
    (0, nestjs_telegraf_1.Start)(),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onStart", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('help'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onHelp", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('catat'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onCatat", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('masuk'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onMasuk", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('saldo'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onSaldo", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('transaksi'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onTransaksi", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('laporan'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onLaporan", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('tambahakun'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onTambahAkun", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('akun'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onAkun", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('arsipkan'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onArsipkan", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('aktifkan'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onAktifkan", null);
__decorate([
    (0, nestjs_telegraf_1.Action)('list_active'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onListActive", null);
__decorate([
    (0, nestjs_telegraf_1.Action)('list_archived'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onListArchived", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(/^archive_(.+)$/),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onArchiveAccount", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(/^unarchive_(.+)$/),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onUnarchiveAccount", null);
__decorate([
    (0, nestjs_telegraf_1.Action)('back_to_menu'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "onBackToMenu", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('hallo'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "hallo", null);
exports.TelegramUpdate = TelegramUpdate = __decorate([
    (0, nestjs_telegraf_1.Update)(),
    (0, public_decorator_1.Public)(),
    __param(0, (0, nestjs_telegraf_1.InjectBot)()),
    __metadata("design:paramtypes", [telegraf_1.Telegraf,
        telegram_service_1.TelegramService])
], TelegramUpdate);
//# sourceMappingURL=telegram.update.js.map