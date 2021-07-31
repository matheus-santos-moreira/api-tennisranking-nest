import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async create(@Body() { name, email, phone }: CreatePlayerDTO) {
    const player = await this.playersService.createAndUpdatePlayer({
      name,
      email,
      phone,
    });

    return player;
  }

  @Get()
  async index(@Query('email') email: string): Promise<Player[] | Player> {
    if (email) {
      return this.playersService.findByEmail(email);
    }
    return this.playersService.get();
  }
}
