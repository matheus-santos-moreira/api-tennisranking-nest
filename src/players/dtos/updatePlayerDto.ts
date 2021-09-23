import { IsNotEmpty, IsMobilePhone } from 'class-validator';

export class UpdatePlayerDTO {
  @IsMobilePhone()
  readonly phone: string;

  @IsNotEmpty()
  readonly name: string;
}
