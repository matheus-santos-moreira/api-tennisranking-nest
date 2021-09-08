import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModel } from './models/player.model';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'player',
        schema: PlayerModel,
      },
    ]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
