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
exports.CreatePerfiDto = void 0;
const client_1 = require(".prisma/client");
const class_validator_1 = require("class-validator");
class CreatePerfiDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePerfiDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreatePerfiDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePerfiDto.prototype, "document", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePerfiDto.prototype, "document_type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePerfiDto.prototype, "user_type", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)('BR'),
    __metadata("design:type", Number)
], CreatePerfiDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePerfiDto.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePerfiDto.prototype, "street_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePerfiDto.prototype, "complementary", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePerfiDto.prototype, "neighborhood", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePerfiDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePerfiDto.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(8, {
        message: 'O CEP deve ter no mínimo $value digitos',
    }),
    (0, class_validator_1.Max)(8, {
        message: 'O CEP deve ter no máximo $value digitos',
    }),
    __metadata("design:type", Number)
], CreatePerfiDto.prototype, "zipcode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePerfiDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePerfiDto.prototype, "created_at", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePerfiDto.prototype, "updated_at", void 0);
exports.CreatePerfiDto = CreatePerfiDto;
//# sourceMappingURL=create-perfi.dto.js.map