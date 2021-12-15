import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dtos/createChallengeDto';
import { CreateGameDTO } from './dtos/CreateGameDto';
import { UpdateChallengeDTO } from './dtos/UpdateChallengeDto';

@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() { dateChallenge, players, requester }: CreateChallengeDto,
  ) {
    const challenge = await this.challengesService.create({
      dateChallenge,
      players,
      requester,
    });

    return challenge;
  }

  @Get()
  async findAll(@Query('playerId') id: string) {
    id
      ? await this.challengesService.findAllByPlayer(id)
      : await this.challengesService.findAll();
  }

  @Put('/:challengeId')
  async update(
    @Body() data: UpdateChallengeDTO,
    @Param('challengeId') id: string,
  ) {
    return this.challengesService.update(id, data);
  }

  @Post('/:challengeId/game')
  async createGame(
    @Param('challengeId') id: string,
    @Body() data: CreateGameDTO,
  ) {
    return this.challengesService.createGame(id, data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.challengesService.delete(id);
  }
}
