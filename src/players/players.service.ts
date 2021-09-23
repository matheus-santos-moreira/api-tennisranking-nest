import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { Player } from './interfaces/player.interface';

interface IRequestUpdatePlayer {
  player: Player;
  name: string;
  phone: string;
}

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  constructor(
    @InjectModel('player') private readonly playerModel: Model<Player>,
  ) {}
  async createAndUpdatePlayer({
    name,
    email,
    phone,
  }: CreatePlayerDTO): Promise<Player> {
    const playerAlreadyExits = await this.playerModel.findOne({ email }).exec();

    if (!playerAlreadyExits) {
      const player = await this.create({ name, email, phone });
      return player;
    }

    const player = await this.update({
      player: playerAlreadyExits,
      name,
      phone,
    });

    return player;
  }

  async get(): Promise<Player[]> {
    return this.playerModel.find();
  }

  async findByEmail(email: string): Promise<Player> {
    const player = await this.playerModel.findOne({ email });

    if (!player) {
      throw new NotFoundException(`Player not found`);
    }

    return player;
  }

  async deletePlayer(email: string): Promise<void> {
    const playerExists = await this.findByEmail(email);

    await playerExists.delete();
  }

  private async create(data: CreatePlayerDTO): Promise<Player> {
    const player = await this.playerModel.create(data);

    return player;
  }

  private async update({
    player,
    name,
    phone,
  }: IRequestUpdatePlayer): Promise<Player> {
    const result = await this.playerModel.findOneAndUpdate(
      { email: player.email },
      {
        name,
        phone,
      },
    );
    return result;
  }
}
