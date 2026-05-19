import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { FilterAccountDto } from './dto/filter-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createAccountDto: CreateAccountDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.AccountStatus;
        userId: string;
        type: import("../../generated/prisma").$Enums.AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
    }>>;
    findAll(userId: string, filter?: FilterAccountDto): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma").$Enums.AccountStatus;
            userId: string;
            type: import("../../generated/prisma").$Enums.AccountType;
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
    findOne(id: string, userId: string): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.AccountStatus;
        userId: string;
        type: import("../../generated/prisma").$Enums.AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
    }>>;
    update(id: string, userId: string, updateAccountDto: UpdateAccountDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.AccountStatus;
        userId: string;
        type: import("../../generated/prisma").$Enums.AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
    }>>;
    archive(id: string, userId: string): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.AccountStatus;
        userId: string;
        type: import("../../generated/prisma").$Enums.AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
    }>>;
    unarchive(id: string, userId: string): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.AccountStatus;
        userId: string;
        type: import("../../generated/prisma").$Enums.AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
    }>>;
    remove(id: string, userId: string): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.AccountStatus;
        userId: string;
        type: import("../../generated/prisma").$Enums.AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
    }>>;
}
