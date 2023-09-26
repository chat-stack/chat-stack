import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsRecord(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isRecord',
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
