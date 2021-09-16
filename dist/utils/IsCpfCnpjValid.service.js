"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCpfCnpjValid = exports.IsCpfCnpjValidConstraint = void 0;
const class_validator_1 = require("class-validator");
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
let IsCpfCnpjValidConstraint = class IsCpfCnpjValidConstraint {
    async validate(value, args) {
        if (value.length >= 12) {
            return cpf_cnpj_validator_1.cnpj.isValid(value);
        }
        else {
            return cpf_cnpj_validator_1.cpf.isValid(value);
        }
    }
    defaultMessage(args) {
        if (args.value.length >= 12) {
            if (!cpf_cnpj_validator_1.cnpj.isValid(args.value))
                return `O CNPJ ${cpf_cnpj_validator_1.cnpj.format(args.value)} é inválido`;
        }
        if (!cpf_cnpj_validator_1.cpf.isValid(args.value))
            return `O CPF ${cpf_cnpj_validator_1.cpf.format(args.value)} é inválido`;
    }
};
IsCpfCnpjValidConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], IsCpfCnpjValidConstraint);
exports.IsCpfCnpjValidConstraint = IsCpfCnpjValidConstraint;
function IsCpfCnpjValid(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCpfCnpjValidConstraint,
        });
    };
}
exports.IsCpfCnpjValid = IsCpfCnpjValid;
//# sourceMappingURL=IsCpfCnpjValid.service.js.map