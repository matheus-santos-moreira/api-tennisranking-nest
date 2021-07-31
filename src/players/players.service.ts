import { Injectable } from '@nestjs/common';
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

  async createAndUpdatePlayer({
    name,
    email,
    phone,
  }: CreatePlayerDTO): Promise<Player> {
    const playerAlreadyExits = this.players.find(
      (player) => player.email === email,
    );

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

  private async create({
    name,
    email,
    phone,
  }: CreatePlayerDTO): Promise<Player> {
    const player: Player = {
      _id: uuid(),
      name,
      email,
      phone,
      avatarUrl: 'https://avatars.githubusercontent.com/u/52337444?v=4',
      ranking: 'A',
      rankingPosition: 0,
    };

    this.players.push(player);

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
