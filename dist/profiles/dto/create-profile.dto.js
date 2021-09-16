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
exports.CreateProfileDto = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const IsCpfCnpjValid_service_1 = require("../../utils/IsCpfCnpjValid.service");
const IsProfileAlreadyExist_service_1 = require("../../utils/IsProfileAlreadyExist.service");
class CreateProfileDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, IsProfileAlreadyExist_service_1.IsProfileAlreadyExist)({
        message: 'Email $value já existe. Por favor escolha outro email!',
    }),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "email", void 0);
__decorate([
    (0, IsProfileAlreadyExist_service_1.IsProfileAlreadyExist)(),
    (0, IsCpfCnpjValid_service_1.IsCpfCnpjValid)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "document", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "document_type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "user_type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProfileDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "street_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "complementary", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "neighborhood", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(8, 8, {
        message: 'O CEP deve conter no mínimo e no máximo de 8 caracteres',
    }),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "zipcode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 2, {
        message: 'O País deve conter no mínimo e no máximo de 2 caracteres',
    }),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateProfileDto.prototype, "user", void 0);
exports.CreateProfileDto = CreateProfileDto;
//# sourceMappingURL=create-profile.dto.js.map