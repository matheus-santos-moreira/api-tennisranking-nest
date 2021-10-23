import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';
import { Event } from '../interfaces/event.interface';

export class UpdateCategoryDTO {
  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Event[];
}
