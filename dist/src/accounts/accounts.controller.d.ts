import type { AuthUser } from '../auth/auth-user.type';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { FilterAccountDto } from './dto/filter-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    create(user: AuthUser, createAccountDto: CreateAccountDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
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
    }>>;
    findAll(user: AuthUser, filter: FilterAccountDto): Promise<{
        data: {
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
        meta: {
            total: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(user: AuthUser, id: string): Promise<import("../common/dto/single-response.dto").SingleResponse<{
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
    }>>;
    update(user: AuthUser, id: string, updateAccountDto: UpdateAccountDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
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
    }>>;
    archive(user: AuthUser, id: string): Promise<import("../common/dto/single-response.dto").SingleResponse<{
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
    }>>;
    unarchive(user: AuthUser, id: string): Promise<import("../common/dto/single-response.dto").SingleResponse<{
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
    }>>;
    remove(user: AuthUser, id: string): Promise<import("../common/dto/single-response.dto").SingleResponse<{
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
    }>>;
}
