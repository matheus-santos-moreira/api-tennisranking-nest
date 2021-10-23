import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dtos/createCategoryDto';
import { UpdateCategoryDTO } from './dtos/updateCategoryDto';
import { Category } from './interfaces/category.interface';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() { category, description, events }: CreateCategoryDTO,
  ): Promise<Category> {
    return this.categoriesService.create({
      category,
      description,
      events,
    });
  }

  @Get()
  async show(): Promise<Category[]> {
    return this.categoriesService.list();
  }

  @Get('/:category')
  async index(@Param('category') category: string): Promise<Category> {
    return this.categoriesService.findByCategoryName(category);
  }

  @Delete('/:category')
  async delete(@Param('category') category: string): Promise<void> {
    return this.categoriesService.delete(category);
  }

  @Put('/:category')
  @UsePipes(ValidationPipe)
  async update(
    @Param('category') category: string,
    @Body() { description, events }: UpdateCategoryDTO,
  ): Promise<void> {
    return this.categoriesService.update({
      description,
      events,
      category,
    });
  }

  @Post('/:category/players/:playerId')
  @UsePipes(ValidationPipe)
  async assignCategoryPlayer(@Param() params: string[]): Promise<void> {
    return this.categoriesService.assignCategoryPlayer(params);
  }
}
