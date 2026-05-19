import { Prisma } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterTransactionDto } from './dto/filter-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createTransactionDto: CreateTransactionDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../../generated/prisma").$Enums.TransactionType;
        transactionDate: Date;
        amount: Prisma.Decimal;
        feeAmount: Prisma.Decimal | null;
        note: string | null;
        sourceAccountId: string | null;
        destinationAccountId: string | null;
        categoryId: string | null;
    }>>;
    findAll(userId: string, filter?: FilterTransactionDto): Promise<{
        data: ({
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                transactionType: import("../../generated/prisma").$Enums.TransactionType;
                icon: string | null;
                color: string | null;
                isDefault: boolean;
                status: import("../../generated/prisma").$Enums.CategoryStatus;
                userId: string | null;
            } | null;
            sourceAccount: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                status: import("../../generated/prisma").$Enums.AccountStatus;
                userId: string;
                type: import("../../generated/prisma").$Enums.AccountType;
                initialBalance: Prisma.Decimal;
                currentBalance: Prisma.Decimal;
                currency: string;
            } | null;
            destinationAccount: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                status: import("../../generated/prisma").$Enums.AccountStatus;
                userId: string;
                type: import("../../generated/prisma").$Enums.AccountType;
                initialBalance: Prisma.Decimal;
                currentBalance: Prisma.Decimal;
                currency: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            type: import("../../generated/prisma").$Enums.TransactionType;
            transactionDate: Date;
            amount: Prisma.Decimal;
            feeAmount: Prisma.Decimal | null;
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
    findOne(id: string, userId: string): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            transactionType: import("../../generated/prisma").$Enums.TransactionType;
            icon: string | null;
            color: string | null;
            isDefault: boolean;
            status: import("../../generated/prisma").$Enums.CategoryStatus;
            userId: string | null;
        } | null;
        sourceAccount: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma").$Enums.AccountStatus;
            userId: string;
            type: import("../../generated/prisma").$Enums.AccountType;
            initialBalance: Prisma.Decimal;
            currentBalance: Prisma.Decimal;
            currency: string;
        } | null;
        destinationAccount: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma").$Enums.AccountStatus;
            userId: string;
            type: import("../../generated/prisma").$Enums.AccountType;
            initialBalance: Prisma.Decimal;
            currentBalance: Prisma.Decimal;
            currency: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../../generated/prisma").$Enums.TransactionType;
        transactionDate: Date;
        amount: Prisma.Decimal;
        feeAmount: Prisma.Decimal | null;
        note: string | null;
        sourceAccountId: string | null;
        destinationAccountId: string | null;
        categoryId: string | null;
    }>>;
    update(id: string, userId: string, updateTransactionDto: UpdateTransactionDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../../generated/prisma").$Enums.TransactionType;
        transactionDate: Date;
        amount: Prisma.Decimal;
        feeAmount: Prisma.Decimal | null;
        note: string | null;
        sourceAccountId: string | null;
        destinationAccountId: string | null;
        categoryId: string | null;
    }>>;
    remove(id: string, userId: string): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../../generated/prisma").$Enums.TransactionType;
        transactionDate: Date;
        amount: Prisma.Decimal;
        feeAmount: Prisma.Decimal | null;
        note: string | null;
        sourceAccountId: string | null;
        destinationAccountId: string | null;
        categoryId: string | null;
    }>>;
    private buildWhere;
    private applyBalance;
    private rollbackBalance;
    private validateTransaction;
}
