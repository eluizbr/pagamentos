import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): Promise<boolean>;
}
export declare function IsUserAlreadyExist(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
