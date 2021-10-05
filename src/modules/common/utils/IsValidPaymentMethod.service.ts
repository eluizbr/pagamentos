import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsValidPaymentMethodConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: any, args: ValidationArguments) {
    const { paymentType, installments } = value;

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const type = args.value.length >= 12 ? 'CNPJ' : 'CPF';
    return `O ${type} número ${args.value} já esta cadastrado`;
  }
}

export function IsValidPaymentMethod(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPaymentMethodConstraint,
    });
  };
}
