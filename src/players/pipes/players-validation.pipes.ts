import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class PlayersValidationPipe implements PipeTransform {
  transform(value, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(
        `Must required ${metadata.type} ${metadata.data}`,
      );
    }
    return value;
  }
}
