import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ValidationParamsPipe implements PipeTransform {
  transform(value, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(
        `Must required ${metadata.type} ${metadata.data}`,
      );
    }
    return value;
  }
}
