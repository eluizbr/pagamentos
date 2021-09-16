"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUserAlreadyExist = exports.IsUserAlreadyExistConstraint = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const users_service_1 = require("../users/users.service");
let IsUserAlreadyExistConstraint = class IsUserAlreadyExistConstraint {
    constructor(userService) {
        this.userService = userService;
    }
    async validate(username, args) {
        console.log(this.userService);
        const user = await this.userService.findOneByUsername(username);
        if (user)
            return false;
        return true;
    }
};
IsUserAlreadyExistConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], IsUserAlreadyExistConstraint);
exports.IsUserAlreadyExistConstraint = IsUserAlreadyExistConstraint;
function IsUserAlreadyExist(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint,
        });
    };
}
exports.IsUserAlreadyExist = IsUserAlreadyExist;
//# sourceMappingURL=Validator-IsUserAlreadyExist.js.map