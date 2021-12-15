import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './dtos/createChallengeDto';
import { Challenge } from './interfaces/challenge.interface';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('challenges')
    private readonly challengesModel: Model<Challenge>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create({
    dateChallenge,
    players,
    requester,
  }: CreateChallengeDto): Promise<Challenge> {
    const playersAll = await this.playersService.get();

    players.map((player) => {
      const playerExists = playersAll.find((p) => p.id === player.id);
      if (!playerExists) {
        throw new BadRequestException('Player not found ' + player.id);
      }
    });

    const requesterIsPlayerInGame = players.filter(
      (player) => player.id === requester.id,
    );

    if (requesterIsPlayerInGame.length === 0) {
      // if requester is not in the game
      throw new BadRequestException('Requester is not in the game'); // throw error
    }

    const categoryByPlayer = await this.categoriesService.getCategoryByPlayerId(
      requester.id,
    );

    const createdChallenge = new this.challengesModel({
      dateChallenge,
      players,
      requester,
    });

    return createdChallenge.save();
  }
}
