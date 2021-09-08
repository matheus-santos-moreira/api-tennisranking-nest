import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

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
    return this.players;
  }

  async findByEmail(email: string): Promise<Player> {
    const player = this.players.find((player) => player.email === email);

    if (!player) {
      throw new NotFoundException(`Player not found`);
    }

    return player;
  }

  async deletePlayer(email: string): Promise<void> {
    const playerExists = await this.findByEmail(email);

    this.players = this.players.filter((player) => player !== playerExists);
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
    player.name = name;
    player.phone = phone;

    return player;
  }
}
