import { Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ProfileCreateInput) {
    const user: any = data.user;

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

  async findOne(id: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
      include: { token: true },
    });
    if (!profile) {
      throw new NotFoundException(`Pofile id ${id}, não existe!`);
    }
    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    await this.findOne(id);

    return this.prisma.profile.update({
      where: { id },
      data: updateProfileDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.profile.delete({ where: { id } });
  }
}
