import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { UsersService } from 'src/users/users.service';
export declare class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    private readonly userService;
    constructor(userService: UsersService);
    validate(username: string, args: ValidationArguments): Promise<boolean>;
}
export declare function IsUserAlreadyExist(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
