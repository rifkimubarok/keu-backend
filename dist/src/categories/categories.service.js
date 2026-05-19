"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../generated/prisma");
const paginated_response_dto_1 = require("../common/dto/paginated-response.dto");
const single_response_dto_1 = require("../common/dto/single-response.dto");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoriesService = class CategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createCategoryDto) {
        const category = await this.prisma.category.create({
            data: {
                userId,
                name: createCategoryDto.name,
                transactionType: createCategoryDto.transactionType,
                icon: createCategoryDto.icon,
                color: createCategoryDto.color,
                isDefault: false,
                status: prisma_1.CategoryStatus.ACTIVE,
            },
        });
        return (0, single_response_dto_1.single)(category);
    }
    async findAll(userId, filter = {}) {
        const { page, limit, skip } = (0, paginated_response_dto_1.getPagination)(filter.page, filter.limit);
        const where = {
            OR: [{ userId }, { isDefault: true }],
            status: prisma_1.CategoryStatus.ACTIVE,
            transactionType: filter.transactionType,
            ...(filter.name
                ? { name: { contains: filter.name, mode: 'insensitive' } }
                : {}),
        };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.category.findMany({
                where,
                orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
                skip,
                take: limit,
            }),
            this.prisma.category.count({ where }),
        ]);
        return (0, paginated_response_dto_1.paginate)(data, total, page, limit);
    }
    async findOne(id, userId) {
        const category = await this.prisma.category.findFirstOrThrow({
            where: {
                id,
                OR: [{ userId }, { isDefault: true }],
            },
        });
        return (0, single_response_dto_1.single)(category);
    }
    async update(id, userId, updateCategoryDto) {
        const category = await this.prisma.category.findFirstOrThrow({
            where: {
                id,
                OR: [{ userId }, { isDefault: true }],
            },
        });
        if (category.isDefault) {
            throw new common_1.BadRequestException('Cannot edit default system categories');
        }
        const updatedCategory = await this.prisma.category.update({
            where: { id, userId },
            data: updateCategoryDto,
        });
        return (0, single_response_dto_1.single)(updatedCategory);
    }
    async archive(id, userId) {
        const category = await this.prisma.category.findFirstOrThrow({
            where: {
                id,
                OR: [{ userId }, { isDefault: true }],
            },
        });
        if (category.isDefault) {
            throw new common_1.BadRequestException('Cannot archive default system categories');
        }
        const archivedCategory = await this.prisma.category.update({
            where: { id, userId },
            data: { status: prisma_1.CategoryStatus.ARCHIVED },
        });
        return (0, single_response_dto_1.single)(archivedCategory);
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map