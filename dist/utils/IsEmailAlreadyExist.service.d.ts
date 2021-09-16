import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): Promise<boolean>;
}
export declare function IsEmailAlreadyExist(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
