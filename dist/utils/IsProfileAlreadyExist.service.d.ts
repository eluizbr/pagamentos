import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsProfileAlreadyExistConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsProfileAlreadyExist(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
