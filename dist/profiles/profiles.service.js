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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../utils/prisma.service");
let ProfilesService = class ProfilesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const user = data.user;
        try {
            return await this.prisma.profile.create({
                data: Object.assign(Object.assign({}, data), { user: {
                        connect: { id: user },
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
        return this.prisma.profile.findMany({ include: { token: true } });
    }
    async findOne(id) {
        const profile = await this.prisma.profile.findUnique({
            where: { id },
            include: { token: true },
        });
        if (!profile) {
            throw new common_1.NotFoundException(`Pofile id ${id}, não existe!`);
        }
        return profile;
    }
    async update(id, updateProfileDto) {
        await this.findOne(id);
        return this.prisma.profile.update({
            where: { id },
            data: updateProfileDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.profile.delete({ where: { id } });
    }
};
ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfilesService);
exports.ProfilesService = ProfilesService;
//# sourceMappingURL=profiles.service.js.map