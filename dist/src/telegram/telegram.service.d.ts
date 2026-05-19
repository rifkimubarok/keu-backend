import { TransactionType } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionsService } from '../transactions/transactions.service';
export declare class TelegramService {
    private prisma;
    private transactionsService;
    constructor(prisma: PrismaService, transactionsService: TransactionsService);
    linkAccount(telegramId: string, token: string): Promise<boolean>;
    findUserByTelegramId(telegramId: string): Promise<{
        id: string;
        email: string;
        telegramId: string | null;
        telegramLinkToken: string | null;
        password: string;
        name: string;
        telegramLinkExpiry: Date | null;
        nlModeEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    getBalances(userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../../generated/prisma").$Enums.AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        status: import("../../generated/prisma").$Enums.AccountStatus;
    }[]>;
    getRecentTransactions(userId: string, limit?: number): Promise<({
        sourceAccount: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            type: import("../../generated/prisma").$Enums.AccountType;
            initialBalance: import("@prisma/client-runtime-utils").Decimal;
            currentBalance: import("@prisma/client-runtime-utils").Decimal;
            currency: string;
            status: import("../../generated/prisma").$Enums.AccountStatus;
        } | null;
        destinationAccount: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            type: import("../../generated/prisma").$Enums.AccountType;
            initialBalance: import("@prisma/client-runtime-utils").Decimal;
            currentBalance: import("@prisma/client-runtime-utils").Decimal;
            currency: string;
            status: import("../../generated/prisma").$Enums.AccountStatus;
        } | null;
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            status: import("../../generated/prisma").$Enums.CategoryStatus;
            transactionType: import("../../generated/prisma").$Enums.TransactionType;
            icon: string | null;
            color: string | null;
            isDefault: boolean;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../../generated/prisma").$Enums.TransactionType;
        transactionDate: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
        feeAmount: import("@prisma/client-runtime-utils").Decimal | null;
        sourceAccountId: string | null;
        destinationAccountId: string | null;
        categoryId: string | null;
        note: string | null;
    })[]>;
    getMonthlySummary(userId: string): Promise<{
        income: number;
        expense: number;
        month: Date;
    }>;
    findCategoryByName(userId: string, name: string, type: TransactionType): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        status: import("../../generated/prisma").$Enums.CategoryStatus;
        transactionType: import("../../generated/prisma").$Enums.TransactionType;
        icon: string | null;
        color: string | null;
        isDefault: boolean;
    } | null>;
    getFirstActiveAccount(userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../../generated/prisma").$Enums.AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        status: import("../../generated/prisma").$Enums.AccountStatus;
    }>;
    createTransaction(userId: string, type: TransactionType, amount: number, note: string, categoryName?: string, accountName?: string): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../../generated/prisma").$Enums.TransactionType;
        transactionDate: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
        feeAmount: import("@prisma/client-runtime-utils").Decimal | null;
        sourceAccountId: string | null;
        destinationAccountId: string | null;
        categoryId: string | null;
        note: string | null;
    }>>;
    createAccount(userId: string, name: string, type: string, initialBalance: number): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../../generated/prisma").$Enums.AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        status: import("../../generated/prisma").$Enums.AccountStatus;
    }>;
    getAccountsByStatus(userId: string, status: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../../generated/prisma").$Enums.AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        status: import("../../generated/prisma").$Enums.AccountStatus;
    }[]>;
    findAccountByName(userId: string, name: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../../generated/prisma").$Enums.AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        status: import("../../generated/prisma").$Enums.AccountStatus;
    } | null>;
    archiveAccount(accountId: string, userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../../generated/prisma").$Enums.AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        status: import("../../generated/prisma").$Enums.AccountStatus;
    }>;
    unarchiveAccount(accountId: string, userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../../generated/prisma").$Enums.AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        status: import("../../generated/prisma").$Enums.AccountStatus;
    }>;
}
