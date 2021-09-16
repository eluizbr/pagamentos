"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsProfileAlreadyExist = exports.IsProfileAlreadyExistConstraint = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
let IsProfileAlreadyExistConstraint = class IsProfileAlreadyExistConstraint {
    async validate(value, args) {
        const prisma = new client_1.PrismaClient();
        const user = await prisma.profile.findFirst({
            where: {
                OR: [{ document: value }, { email: value }],
            },
        });
        if (user)
            return false;
        return true;
    }
    defaultMessage(args) {
        const type = args.value.length >= 12 ? 'CNPJ' : 'CPF';
        return `O ${type} número ${args.value} já esta cadastrado`;
    }
};
IsProfileAlreadyExistConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], IsProfileAlreadyExistConstraint);
exports.IsProfileAlreadyExistConstraint = IsProfileAlreadyExistConstraint;
function IsProfileAlreadyExist(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsProfileAlreadyExistConstraint,
        });
    };
}
exports.IsProfileAlreadyExist = IsProfileAlreadyExist;
//# sourceMappingURL=IsProfileAlreadyExist.service.js.map