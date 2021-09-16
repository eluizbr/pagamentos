"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUserAlreadyExist = exports.IsUserAlreadyExistConstraint = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
let IsUserAlreadyExistConstraint = class IsUserAlreadyExistConstraint {
    async validate(value, args) {
        const prisma = new client_1.PrismaClient();
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ username: value }, { email: value }],
            },
        });
        if (user)
            return false;
        return true;
    }
};
IsUserAlreadyExistConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    (0, common_1.Injectable)()
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
//# sourceMappingURL=IsAlreadyExist.service.js.map