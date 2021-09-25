import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import RabbitmqService from 'src/utils/rabbitmq-service';

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
          user: { connect: { id: userId } },
        },
      });

      this.sendToQueue('profileCreateLogs', {
        type: 'profileCreate',
        ...profile,
      });

      return { ...profile, userId };
    } catch (err) {
      this.sendToQueue('profileErrorLogs', {
        userId,
        error: err.meta,
      });

      throw new BadRequestException({
        status: 404,
        message: `O campo ${err.meta.target}, já esta em uso por outro usuário!`,
      });
    }
  }

  findAll(userId: string) {
    return this.prisma.profile.findMany({
      where: { userId },
      include: { token: true },
    });
  }

  async findOne(where: Prisma.ProfileWhereInput) {
    const profile = await this.prisma.profile.findFirst({
      where,
      include: { user: { select: { id: true } }, token: true },
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
    await this.findOne(where);

    const perfil = await this.prisma.profile.update({ where, data });

    this.sendToQueue('profileUpdateLogs', {
      type: 'updateProfile',
      id: perfil.id,
      update: perfil.updated_at,
      fields: Object.keys(data),
    });

    return perfil;
  }

  async remove(where: Prisma.ProfileWhereUniqueInput) {
    await this.findOne(where);
    return this.prisma.profile.delete({ where });
  }
}
