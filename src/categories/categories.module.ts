import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from 'src/players/players.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryModel } from './models/category.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'category',
        schema: CategoryModel,
      },
    ]),
    PlayersModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
