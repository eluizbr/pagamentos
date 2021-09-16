import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsCpfCnpjValidConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsCpfCnpjValid(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
