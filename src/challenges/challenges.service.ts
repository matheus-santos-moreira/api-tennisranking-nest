import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './dtos/createChallengeDto';
import { CreateGameDTO } from './dtos/CreateGameDto';
import { UpdateChallengeDTO } from './dtos/UpdateChallengeDto';
import { ChallengeStatus } from './interfaces/challenge-status.enum';
import { Challenge, Game } from './interfaces/challenge.interface';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('challenges')
    private readonly challengesModel: Model<Challenge>,
    @InjectModel('games')
    private readonly gamesModel: Model<Game>,
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

  async findAll(): Promise<Challenge[]> {
    return this.challengesModel.find().exec();
  }

  async findAllByPlayer(id: string): Promise<Challenge[]> {
    return this.challengesModel
      .find({ players: { $elemMatch: { id } } })
      .exec();
  }

  async update(id: string, data: UpdateChallengeDTO): Promise<Challenge> {
    return this.challengesModel.findByIdAndUpdate(id, data, { new: true });
  }

  async createGame(id: string, data: CreateGameDTO): Promise<void> {
    const challenge = await this.challengesModel.findById(id).exec();

    if (!challenge) {
      throw new BadRequestException('Challenge not found');
    }

    const playerFilter = challenge.players.filter(
      (player) => player.id === data.def.id,
    );

    if (playerFilter.length === 0) {
      throw new BadRequestException('Player not found');
    }

    const createdGame = new this.gamesModel(data);

    createdGame.category = challenge.category;

    const result = await createdGame.save();

    challenge.status = ChallengeStatus.COMPLETED;

    challenge.game = result.id;

    try {
      await this.challengesModel
        .findOneAndUpdate({ id }, { $set: challenge })
        .exec();
    } catch (error) {
      await this.gamesModel.deleteOne({ _id: result._id }).exec();
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string): Promise<void> {
    const challenge = await this.challengesModel.findById(id).exec();

    if (!challenge) {
      throw new BadRequestException('Challenge not found');
    }

    challenge.status = ChallengeStatus.CANCELED;

    await this.challengesModel
      .findOneAndUpdate({ id }, { $set: challenge })
      .exec();
  }
}
