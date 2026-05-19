import type { AuthUser } from '../auth/auth-user.type';
import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getSummary(user: AuthUser): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        totalBalance: number;
        accounts: {
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
        }[];
        thisMonth: {
            income: number;
            expense: number;
        };
        recentTransactions: ({
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
    }>>;
}
