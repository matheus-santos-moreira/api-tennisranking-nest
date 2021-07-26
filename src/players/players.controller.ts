import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';

@Controller('api/v1/players')
export class PlayersController {
  @Post()
  async createAndUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    const { name, email, phone } = createPlayerDTO;

    return {
      name,
      email,
      phone,
    };
  }
}
