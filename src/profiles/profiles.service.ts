import { Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ProfileCreateInput) {
    const { user }: any = data;

    try {
      return await this.prisma.profile.create({
        data: {
          ...data,
          user: {
            connect: { id: user },
          },
        },
      });
    } catch (err) {
      return {
        code: err.code,
        message: err.meta.cause,
      };
    }
  }

  findAll() {
    return this.prisma.profile.findMany({ include: { token: true } });
  }

  async findOne(where: Prisma.ProfileWhereUniqueInput) {
    const profile = await this.prisma.profile.findUnique({
      where,
    });
    if (!profile) {
      throw new NotFoundException(`Pofile id ${where}, não existe!`);
    }
    return profile;
  }

  async update(
    where: Prisma.ProfileWhereUniqueInput,
    data: Prisma.ProfileUpdateInput,
  ) {
    const perfil = await this.findOne(where);
    return await this.prisma.profile.update({ where, data });
  }

  async remove(where: Prisma.ProfileWhereUniqueInput) {
    await this.findOne(where);
    return this.prisma.profile.delete({ where });
  }
}
