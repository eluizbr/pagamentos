import { PrismaClient } from '@prisma/client';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsProfileAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: string, args: ValidationArguments) {
    const prisma = new PrismaClient();
    const user = await prisma.profile.findFirst({
      where: {
        OR: [{ document: value }, { email: value }],
      },
    });
    if (user) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const type = args.value.length >= 12 ? 'CNPJ' : 'CPF';
    return `O ${type} número ${args.value} já esta cadastrado`;
  }
}

export function IsProfileAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsProfileAlreadyExistConstraint,
    });
  };
}
