import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { Player } from './interfaces/player.interface';

interface IRequestUpdate {
  id: string;
  name: string;
  phone: string;
}

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('player') private readonly playerModel: Model<Player>,
  ) {}

  async create({ name, email, phone }: CreatePlayerDTO): Promise<Player> {
    const playerAlreadyExits = await this.playerModel.findOne({ email });

    if (playerAlreadyExits) {
      throw new BadRequestException('Player already exits');
    }
    const player = await this.playerModel.create({ name, email, phone });
    return player;
  }

  async update({ id, name, phone }: IRequestUpdate): Promise<void> {
    const playerAlreadyExits = await this.findById(id);

    await this.playerModel.updateOne(
      { _id: playerAlreadyExits.id },
      {
        name,
        phone,
      },
    );
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

  async findById(id: string): Promise<Player> {
    const player = await this.playerModel.findOne({ _id: id });

    if (!player) {
      throw new NotFoundException(`Player not found`);
    }

    return player;
  }

  async deletePlayer(id: string): Promise<void> {
    const player = await this.findById(id);

    await this.playerModel.findByIdAndDelete(player._id);
  }

  async findPlayers(ids: string[]): Promise<Player[]> {
    const players = await this.playerModel.find({
      _id: { $in: ids },
    });

    if (players.length !== ids.length) {
      throw new BadRequestException('Players not found');
    }

    return players;
  }
}
