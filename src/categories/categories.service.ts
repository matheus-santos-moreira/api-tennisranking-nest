import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDTO } from './dtos/createCategoryDto';
import { Category } from './interfaces/category.interface';
import { Event } from './interfaces/event.interface';

interface IRequestUpdate {
  category: string;
  description: string;
  events: Event[];
}

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('category')
    private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
  ) {}
  public async create({
    category,
    description,
    events,
  }: CreateCategoryDTO): Promise<Category> {
    const categoryAlreadyExist = await this.categoryModel.findOne({
      category,
    });

    if (categoryAlreadyExist) {
      throw new BadRequestException('Category already exists');
    }

    const categoryCreated = await this.categoryModel.create({
      category,
      description,
      events,
    });

    return categoryCreated;
  }

  async list(): Promise<Category[]> {
    return this.categoryModel.find().populate('players');
  }

  async findByCategoryName(category: string): Promise<Category> {
    const categoryExist = await this.categoryModel.findOne({ category });

    if (!categoryExist) {
      throw new NotFoundException('Category not found');
    }

    return categoryExist;
  }

  async delete(category: string): Promise<void> {
    await this.findByCategoryName(category);

    await this.categoryModel.deleteOne({
      category,
    });
  }

  async update({
    category,
    description,
    events,
  }: IRequestUpdate): Promise<void> {
    await this.findByCategoryName(category);

    await this.categoryModel.findOneAndUpdate(
      {
        category,
      },
      {
        description,
        events,
      },
    );
  }

  async assignCategoryPlayer(params: string[]): Promise<void> {
    const category = params['category'] as string;
    const playerId = params['playerId'] as string;

    const categoryExist = await this.findByCategoryName(category);

    await this.playersService.findById(playerId);

    const playerAlreadyExitsInCategory = categoryExist.players.find(
      (player) => player == playerId,
    );

    if (playerAlreadyExitsInCategory) {
      throw new BadRequestException('Player already exists in category');
    }

    categoryExist.players.push(playerId);

    await this.categoryModel.findOneAndUpdate(
      {
        _id: categoryExist.id,
      },
      categoryExist,
    );
  }
}
