import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';
import { ChallengeStatus } from './challenge-status.enum';

export interface Result {
  set: string;
}

export interface Game extends Document {
  category: string;
  players: Player[];
  defaultPlayer: Player;
  result: Result[];
}

export interface Challenge extends Document {
  dateChallenge: Date;
  status: ChallengeStatus;
  dateCreated: Date;
  dateUpdated: Date;
  requester: Player;
  category: string;
  players: Player[];
  game: Game;
}
