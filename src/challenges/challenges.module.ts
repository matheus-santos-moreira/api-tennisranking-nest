import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengesModel } from './models/challenges.model';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { PlayersModule } from 'src/players/players.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { GameSchema } from './models/game.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'challenges',
        schema: ChallengesModel,
      },
      {
        name: 'games',
        schema: GameSchema,
      },
    ]),
    PlayersModule,
    CategoriesModule,
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
