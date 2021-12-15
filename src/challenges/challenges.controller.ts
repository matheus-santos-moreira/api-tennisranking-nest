import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dtos/createChallengeDto';

@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post() // POST http://localhost:3000/api/v1/challenges
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
}
