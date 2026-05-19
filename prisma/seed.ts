import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import { PrismaClient, TransactionType } from '../generated/prisma';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

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
      type: TransactionType.EXPENSE,
      icon: 'restaurant',
      color: '#FF6B6B',
    },
    {
      name: 'Transportasi',
      type: TransactionType.EXPENSE,
      icon: 'directions_car',
      color: '#FF9F43',
    },
    {
      name: 'Belanja',
      type: TransactionType.EXPENSE,
      icon: 'shopping_bag',
      color: '#F368E0',
    },
    {
      name: 'Tagihan',
      type: TransactionType.EXPENSE,
      icon: 'receipt',
      color: '#EE5A24',
    },
    {
      name: 'Hiburan',
      type: TransactionType.EXPENSE,
      icon: 'movie',
      color: '#A55EEA',
    },
    {
      name: 'Kesehatan',
      type: TransactionType.EXPENSE,
      icon: 'medical_services',
      color: '#45AAF2',
    },
    {
      name: 'Pendidikan',
      type: TransactionType.EXPENSE,
      icon: 'school',
      color: '#2BCBBA',
    },
    {
      name: 'Rumah Tangga',
      type: TransactionType.EXPENSE,
      icon: 'home',
      color: '#778CA3',
    },
    {
      name: 'Donasi',
      type: TransactionType.EXPENSE,
      icon: 'volunteer_activism',
      color: '#FD9644',
    },
    {
      name: 'Lainnya',
      type: TransactionType.EXPENSE,
      icon: 'more_horiz',
      color: '#A5B1C2',
    },
    {
      name: 'Gaji',
      type: TransactionType.INCOME,
      icon: 'payments',
      color: '#26DE81',
    },
    {
      name: 'Bonus',
      type: TransactionType.INCOME,
      icon: 'card_giftcard',
      color: '#20BF6B',
    },
    {
      name: 'Freelance',
      type: TransactionType.INCOME,
      icon: 'work',
      color: '#45AAF2',
    },
    {
      name: 'Hadiah',
      type: TransactionType.INCOME,
      icon: 'redeem',
      color: '#FD9644',
    },
    {
      name: 'Penjualan',
      type: TransactionType.INCOME,
      icon: 'storefront',
      color: '#4B7BEC',
    },
    {
      name: 'Cashback',
      type: TransactionType.INCOME,
      icon: 'savings',
      color: '#2BCBBA',
    },
    {
      name: 'Lainnya',
      type: TransactionType.INCOME,
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
