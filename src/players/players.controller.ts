import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { UpdatePlayerDTO } from './dtos/updatePlayerDto';
import { Player } from './interfaces/player.interface';
import { PlayersValidationPipe } from './pipes/players-validation.pipes';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() { name, email, phone }: CreatePlayerDTO) {
    const player = await this.playersService.create({
      name,
      email,
      phone,
    });

    return player;
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() { name, phone }: UpdatePlayerDTO,
    @Param('id') id: string,
  ) {
    return this.playersService.update({
      id,
      name,
      phone,
    });
  }

  @Get()
  async index(): Promise<Player[]> {
    return this.playersService.get();
  }

  @Get('/:id')
  async show(
    @Param('id', PlayersValidationPipe)
    id: string,
  ): Promise<Player> {
    return this.playersService.findById(id);
  }

  @Delete('/:id')
  async delete(
    @Param('id', PlayersValidationPipe)
    id: string,
  ): Promise<void> {
    await this.playersService.deletePlayer(id);
  }
}
