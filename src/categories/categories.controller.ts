import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/auth-user.type';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryListResponseDto, CategoryResponseDto } from './dto/category-response.dto';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, type: CategoryResponseDto })
  create(
    @CurrentUser() user: AuthUser,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(user.sub, createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all categories for the user' })
  @ApiResponse({ status: 200, type: CategoryListResponseDto })
  findAll(@CurrentUser() user: AuthUser, @Query() filter: FilterCategoryDto) {
    return this.categoriesService.findAll(user.sub, filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category details' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, type: CategoryResponseDto })
  findOne(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.categoriesService.findOne(id, user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, type: CategoryResponseDto })
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, user.sub, updateCategoryDto);
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archive a category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, type: CategoryResponseDto })
  archive(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.categoriesService.archive(id, user.sub);
  }
}
