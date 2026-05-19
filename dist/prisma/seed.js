"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const bcrypt = __importStar(require("bcrypt"));
const prisma_1 = require("../generated/prisma");
const adapter = new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new prisma_1.PrismaClient({ adapter });
async function main() {
    console.log('Seeding default user...');
    const password = await bcrypt.hash('password', 10);
    await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            password,
            name: 'Default User',
        },
    });
    console.log('Seeding default categories...');
    const defaultCategories = [
        {
            name: 'Makanan & Minuman',
            type: prisma_1.TransactionType.EXPENSE,
            icon: 'restaurant',
            color: '#FF6B6B',
        },
        {
            name: 'Transportasi',
            type: prisma_1.TransactionType.EXPENSE,
            icon: 'directions_car',
            color: '#FF9F43',
        },
        {
            name: 'Belanja',
            type: prisma_1.TransactionType.EXPENSE,
            icon: 'shopping_bag',
            color: '#F368E0',
        },
        {
            name: 'Tagihan',
            type: prisma_1.TransactionType.EXPENSE,
            icon: 'receipt',
            color: '#EE5A24',
        },
        {
            name: 'Hiburan',
            type: prisma_1.TransactionType.EXPENSE,
            icon: 'movie',
            color: '#A55EEA',
        },
        {
            name: 'Kesehatan',
            type: prisma_1.TransactionType.EXPENSE,
            icon: 'medical_services',
            color: '#45AAF2',
        },
        {
            name: 'Pendidikan',
            type: prisma_1.TransactionType.EXPENSE,
            icon: 'school',
            color: '#2BCBBA',
        },
        {
            name: 'Rumah Tangga',
            type: prisma_1.TransactionType.EXPENSE,
            icon: 'home',
            color: '#778CA3',
        },
        {
            name: 'Donasi',
            type: prisma_1.TransactionType.EXPENSE,
            icon: 'volunteer_activism',
            color: '#FD9644',
        },
        {
            name: 'Lainnya',
            type: prisma_1.TransactionType.EXPENSE,
            icon: 'more_horiz',
            color: '#A5B1C2',
        },
        {
            name: 'Gaji',
            type: prisma_1.TransactionType.INCOME,
            icon: 'payments',
            color: '#26DE81',
        },
        {
            name: 'Bonus',
            type: prisma_1.TransactionType.INCOME,
            icon: 'card_giftcard',
            color: '#20BF6B',
        },
        {
            name: 'Freelance',
            type: prisma_1.TransactionType.INCOME,
            icon: 'work',
            color: '#45AAF2',
        },
        {
            name: 'Hadiah',
            type: prisma_1.TransactionType.INCOME,
            icon: 'redeem',
            color: '#FD9644',
        },
        {
            name: 'Penjualan',
            type: prisma_1.TransactionType.INCOME,
            icon: 'storefront',
            color: '#4B7BEC',
        },
        {
            name: 'Cashback',
            type: prisma_1.TransactionType.INCOME,
            icon: 'savings',
            color: '#2BCBBA',
        },
        {
            name: 'Lainnya',
            type: prisma_1.TransactionType.INCOME,
            icon: 'more_horiz',
            color: '#A5B1C2',
        },
    ];
    for (const cat of defaultCategories) {
        await prisma.category.create({
            data: {
                name: cat.name,
                transactionType: cat.type,
                icon: cat.icon,
                color: cat.color,
                isDefault: true,
            },
        });
    }
    console.log('Seed done!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map