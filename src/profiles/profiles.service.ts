import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/utils/prisma.service';
import RabbitmqService from 'src/common/utils/rabbitmq-service';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbitmq: RabbitmqService,
  ) {}

  sendToQueue(routingKey: string, data: any) {
    this.rabbitmq.publishInExchange(
      process.env.RABBTIMQ_PROFILE_EXCHANGE,
      routingKey,
      data,
    );
  }

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

      this.sendToQueue('profileCreateLogs', {
        type: 'profileCreate',
        ...profile,
      });

      return profile;
    } catch (err) {
      this.sendToQueue('profileErrorLogs', {
        userId,
        error: err.meta,
      });

      throw new BadRequestException({
        status: 400,
        message: `O campo ${err.meta.target}, já esta em uso por outro usuário!`,
      });
    }
  }

  findAll(where: any) {
    return this.prisma.profile.findMany({
      where,
      include: { token: true, merchant: true },
    });
  }

  async findOne(where: Prisma.ProfileWhereInput) {
    const profile = await this.prisma.profile.findFirst({
      where,
      include: { user: { select: { id: true } }, token: true, costumers: true },
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

    this.sendToQueue('profileUpdateLogs', {
      type: 'updateProfile',
      id: profile.id,
      update: profile.updated_at,
      fields: Object.keys(data),
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
      this.sendToQueue('profileRemoveLogs', {
        userId,
        error: err.meta,
      });

      throw new BadRequestException({
        status: 404,
        message: `Erro ao tentar remover o perfil ${id}`,
      });
    }
  }
}
