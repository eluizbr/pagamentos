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
exports.TokensService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../utils/prisma.service");
const update_token_dto_1 = require("./dto/update-token.dto");
let TokensService = class TokensService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTokenDto) {
        const profile = createTokenDto.profileId;
        try {
            return await this.prisma.token.create({
                data: Object.assign(Object.assign({}, createTokenDto), { profile: {
                        connect: { id: profile },
                    } }),
            });
        }
        catch (err) {
            return {
                code: err.code,
                message: err.meta.cause,
            };
        }
    }
    findAll() {
        return this.prisma.token.findMany();
    }
    async findOne(id) {
        const token = await this.prisma.token.findUnique({ where: { id } });
        if (!token)
            throw new common_1.NotFoundException(`Token com o id ${id}, não existe!`);
        return token;
    }
    async update(id, updateTokenDto) {
        const token = await this.findOne(id);
        return this.prisma.token.update({
            where: { id },
            data: update_token_dto_1.UpdateTokenDto,
        });
    }
    async remove(id) {
        const token = await this.findOne(id);
        return await this.prisma.token.delete({ where: { id } });
    }
};
TokensService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TokensService);
exports.TokensService = TokensService;
//# sourceMappingURL=tokens.service.js.map