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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensController = void 0;
const common_1 = require("@nestjs/common");
const create_token_dto_1 = require("./dto/create-token.dto");
const update_token_dto_1 = require("./dto/update-token.dto");
const tokens_service_1 = require("./tokens.service");
let TokensController = class TokensController {
    constructor(tokensService) {
        this.tokensService = tokensService;
    }
    create(createTokenDto) {
        return this.tokensService.create(createTokenDto);
    }
    findAll() {
        return this.tokensService.findAll();
    }
    findOne(id) {
        return this.tokensService.findOne(id);
    }
    update(id, updateTokenDto) {
        return this.tokensService.update(id, updateTokenDto);
    }
    remove(id) {
        return this.tokensService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_token_dto_1.CreateTokenDto]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_token_dto_1.UpdateTokenDto]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "remove", null);
TokensController = __decorate([
    (0, common_1.Controller)('tokens'),
    __metadata("design:paramtypes", [tokens_service_1.TokensService])
], TokensController);
exports.TokensController = TokensController;
//# sourceMappingURL=tokens.controller.js.map