import type { AuthUser } from '../auth/auth-user.type';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterTransactionDto } from './dto/filter-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(user: AuthUser, createTransactionDto: CreateTransactionDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("generated/prisma").$Enums.TransactionType;
        transactionDate: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
        feeAmount: import("@prisma/client-runtime-utils").Decimal | null;
        note: string | null;
        sourceAccountId: string | null;
        destinationAccountId: string | null;
        categoryId: string | null;
    }>>;
    findAll(user: AuthUser, filter: FilterTransactionDto): Promise<{
        data: ({
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                transactionType: import("generated/prisma").$Enums.TransactionType;
                icon: string | null;
                color: string | null;
                isDefault: boolean;
                status: import("generated/prisma").$Enums.CategoryStatus;
                userId: string | null;
            } | null;
            sourceAccount: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                status: import("generated/prisma").$Enums.AccountStatus;
                userId: string;
                type: import("generated/prisma").$Enums.AccountType;
                initialBalance: import("@prisma/client-runtime-utils").Decimal;
                currentBalance: import("@prisma/client-runtime-utils").Decimal;
                currency: string;
            } | null;
            destinationAccount: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                status: import("generated/prisma").$Enums.AccountStatus;
                userId: string;
                type: import("generated/prisma").$Enums.AccountType;
                initialBalance: import("@prisma/client-runtime-utils").Decimal;
                currentBalance: import("@prisma/client-runtime-utils").Decimal;
                currency: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            type: import("generated/prisma").$Enums.TransactionType;
            transactionDate: Date;
            amount: import("@prisma/client-runtime-utils").Decimal;
            feeAmount: import("@prisma/client-runtime-utils").Decimal | null;
            note: string | null;
            sourceAccountId: string | null;
            destinationAccountId: string | null;
            categoryId: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(user: AuthUser, id: string): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            transactionType: import("generated/prisma").$Enums.TransactionType;
            icon: string | null;
            color: string | null;
            isDefault: boolean;
            status: import("generated/prisma").$Enums.CategoryStatus;
            userId: string | null;
        } | null;
        sourceAccount: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma").$Enums.AccountStatus;
            userId: string;
            type: import("generated/prisma").$Enums.AccountType;
            initialBalance: import("@prisma/client-runtime-utils").Decimal;
            currentBalance: import("@prisma/client-runtime-utils").Decimal;
            currency: string;
        } | null;
        destinationAccount: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma").$Enums.AccountStatus;
            userId: string;
            type: import("generated/prisma").$Enums.AccountType;
            initialBalance: import("@prisma/client-runtime-utils").Decimal;
            currentBalance: import("@prisma/client-runtime-utils").Decimal;
            currency: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("generated/prisma").$Enums.TransactionType;
        transactionDate: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
        feeAmount: import("@prisma/client-runtime-utils").Decimal | null;
        note: string | null;
        sourceAccountId: string | null;
        destinationAccountId: string | null;
        categoryId: string | null;
    }>>;
    update(user: AuthUser, id: string, updateTransactionDto: UpdateTransactionDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("generated/prisma").$Enums.TransactionType;
        transactionDate: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
        feeAmount: import("@prisma/client-runtime-utils").Decimal | null;
        note: string | null;
        sourceAccountId: string | null;
        destinationAccountId: string | null;
        categoryId: string | null;
    }>>;
    remove(user: AuthUser, id: string): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("generated/prisma").$Enums.TransactionType;
        transactionDate: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
        feeAmount: import("@prisma/client-runtime-utils").Decimal | null;
        note: string | null;
        sourceAccountId: string | null;
        destinationAccountId: string | null;
        categoryId: string | null;
    }>>;
}
