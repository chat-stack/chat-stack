import { BadRequestException } from '@nestjs/common';

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function isMetadata(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isMetadata',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value || typeof value !== 'object') {
            return false;
          }

          for (const key in value) {
            if (typeof key !== 'string') {
              return false;
            }
            if (key === 'id') {
              throw new BadRequestException(
                `Metadata key 'id' is reserved for internal use`,
              );
            }
          }

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a Record<string, any>.`;
        },
      },
    });
  };
}
