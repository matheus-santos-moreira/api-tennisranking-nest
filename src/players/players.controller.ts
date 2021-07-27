import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async create(@Body() { name, email, phone }: CreatePlayerDTO) {
    await this.playersService.createAndUpdatePlayer({ name, email, phone });
  }

  @Get()
  async index() {
    return this.playersService.get();
  }
}
