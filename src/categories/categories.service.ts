import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryStatus } from '../../generated/prisma';
import { getPagination, paginate } from '../common/dto/paginated-response.dto';
import { single } from '../common/dto/single-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: {
        userId,
        name: createCategoryDto.name,
        transactionType: createCategoryDto.transactionType,
        icon: createCategoryDto.icon,
        color: createCategoryDto.color,
        isDefault: false,
        status: CategoryStatus.ACTIVE,
      },
    });

    return single(category);
  }

  async findAll(userId: string, filter: FilterCategoryDto = {}) {
    const { page, limit, skip } = getPagination(filter.page, filter.limit);
    const where = {
      OR: [{ userId }, { isDefault: true }],
      status: CategoryStatus.ACTIVE,
      transactionType: filter.transactionType,
      ...(filter.name
        ? { name: { contains: filter.name, mode: 'insensitive' as const } }
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

    return paginate(data, total, page, limit);
  }

  async findOne(id: string, userId: string) {
    const category = await this.prisma.category.findFirstOrThrow({
      where: {
        id,
        OR: [{ userId }, { isDefault: true }],
      },
    });

    return single(category);
  }

  async update(
    id: string,
    userId: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.prisma.category.findFirstOrThrow({
      where: {
        id,
        OR: [{ userId }, { isDefault: true }],
      },
    });
    if (category.isDefault) {
      throw new BadRequestException('Cannot edit default system categories');
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id, userId },
      data: updateCategoryDto,
    });

    return single(updatedCategory);
  }

  async archive(id: string, userId: string) {
    const category = await this.prisma.category.findFirstOrThrow({
      where: {
        id,
        OR: [{ userId }, { isDefault: true }],
      },
    });
    if (category.isDefault) {
      throw new BadRequestException('Cannot archive default system categories');
    }

    const archivedCategory = await this.prisma.category.update({
      where: { id, userId },
      data: { status: CategoryStatus.ARCHIVED },
    });

    return single(archivedCategory);
  }
}
