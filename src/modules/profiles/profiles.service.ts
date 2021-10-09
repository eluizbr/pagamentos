import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/common/utils/prisma.service';
import { ElasticQueryService } from '../common/services/elastic.query.service';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly elasticService: ElasticQueryService,
    private readonly prisma: PrismaService,
  ) {}

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

  async findAll(where: any) {
    return await this.elasticService.findAll('profile', where);
  }

  async findOne(where: Prisma.ProfileWhereInput) {
    const profile = await this.elasticService.findOne('profile', where);
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
