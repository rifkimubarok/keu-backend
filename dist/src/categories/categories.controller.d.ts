import type { AuthUser } from '../auth/auth-user.type';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(user: AuthUser, createCategoryDto: CreateCategoryDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
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
    }>>;
    findAll(user: AuthUser, filter: FilterCategoryDto): Promise<{
        data: {
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
        transactionType: import("generated/prisma").$Enums.TransactionType;
        icon: string | null;
        color: string | null;
        isDefault: boolean;
        status: import("generated/prisma").$Enums.CategoryStatus;
        userId: string | null;
    }>>;
    update(user: AuthUser, id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
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
    }>>;
    archive(user: AuthUser, id: string): Promise<import("../common/dto/single-response.dto").SingleResponse<{
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
    }>>;
}
