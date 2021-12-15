import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { ChallengeStatus } from '../interfaces/challenge-status.enum';

export class UpdateChallengeDTO {
  @IsOptional()
  @IsDate()
  dateChallenge: Date;

  @IsOptional()
  @IsEnum(ChallengeStatus)
  status: ChallengeStatus;
}
