import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createCategoryDto: CreateCategoryDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
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
    }>>;
    findAll(userId: string, filter?: FilterCategoryDto): Promise<{
        data: {
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
        transactionType: import("../../generated/prisma").$Enums.TransactionType;
        icon: string | null;
        color: string | null;
        isDefault: boolean;
        status: import("../../generated/prisma").$Enums.CategoryStatus;
        userId: string | null;
    }>>;
    update(id: string, userId: string, updateCategoryDto: UpdateCategoryDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
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
    }>>;
    archive(id: string, userId: string): Promise<import("../common/dto/single-response.dto").SingleResponse<{
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
    }>>;
}
