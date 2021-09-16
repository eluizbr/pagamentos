"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEmailAlreadyExist = exports.IsEmailAlreadyExistConstraint = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
let IsEmailAlreadyExistConstraint = class IsEmailAlreadyExistConstraint {
    async validate(value, args) {
        const prisma = new client_1.PrismaClient();
        const user = await prisma.user.findMany({
            where: {
                OR: [{ username: value }, { email: value }],
            },
        });
        if (user[0])
            return false;
        return true;
    }
};
IsEmailAlreadyExistConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    (0, common_1.Injectable)()
], IsEmailAlreadyExistConstraint);
exports.IsEmailAlreadyExistConstraint = IsEmailAlreadyExistConstraint;
function IsEmailAlreadyExist(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint,
        });
    };
}
exports.IsEmailAlreadyExist = IsEmailAlreadyExist;
//# sourceMappingURL=IsEmailAlreadyExist.service.js.map