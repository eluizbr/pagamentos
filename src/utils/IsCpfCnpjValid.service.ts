import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ async: true })
export class IsCpfCnpjValidConstraint implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    if (value.length >= 12) {
      return cnpj.isValid(value);
    } else {
      return cpf.isValid(value);
    }
  }

  defaultMessage(args: ValidationArguments) {
    if (args.value.length >= 12) {
      if (!cnpj.isValid(args.value))
        return `O CNPJ ${cnpj.format(args.value)} é inválido`;
    }
    if (!cpf.isValid(args.value))
      return `O CPF ${cpf.format(args.value)} é inválido`;
  }
}

export function IsCpfCnpjValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfCnpjValidConstraint,
    });
  };
}
