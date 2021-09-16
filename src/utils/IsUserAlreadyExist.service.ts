import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: string, args: ValidationArguments) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: value }, { email: value }],
      },
    });
    if (user) return false;
    return true;
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
