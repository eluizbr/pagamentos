import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/common/utils/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ProfileCreateInput, userId: string) {
    if (!userId) {
      throw new BadRequestException('Id do usuário obrigátorio!');
    }

    try {
      const profile = await this.prisma.profile.create({
        data: {
          ...data,
          userId,
          user: { connect: { id: userId } },
        },
      });

      return profile;
    } catch (err) {
      throw new BadRequestException({
        status: 400,
        message: `O campo ${err.meta.target}, já esta em uso por outro usuário!`,
      });
    }
  }

  findAll(where: any) {
    return this.prisma.profile.findMany({
      where,
      include: {
        token: true,
        merchant: true,
        costumers: {
          include: { cards: true },
        },
      },
    });
  }

  async findOne(where: Prisma.ProfileWhereInput) {
    const profile = await this.prisma.profile.findFirst({
      where,
      include: {
        user: { select: { id: true } },
        token: true,
        costumers: {
          include: { cards: true },
        },
      },
    });
    if (!profile) {
      throw new NotFoundException(`Pofile id ${where.id}, não existe!`);
    }
    return profile;
  }

  async update(where: any, data: Prisma.ProfileUpdateInput) {
    await this.findOne(where);

    const { id } = where;
    const profile = await this.prisma.profile.update({
      where: { id },
      data,
    });

    return profile;
  }

  async remove(where: any) {
    await this.findOne(where);
    const { id, userId } = where;

    try {
      await this.prisma.profile.delete({ where: { id } });
      return;
    } catch (err) {
      throw new BadRequestException({
        status: 404,
        message: `Erro ao tentar remover o perfil ${id}`,
      });
    }
  }
}
