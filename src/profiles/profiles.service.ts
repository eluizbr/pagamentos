import { Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(data: Prisma.ProfileCreateInput) {
    const { userId }: any = data;

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

      return profile;
    } catch (err) {
      this.sendToQueue('profileErrorLogs', err);

      return {
        code: err.code,
        message: err.meta,
      };
    }
  }

  findAll() {
    return this.prisma.profile.findMany({ include: { token: true } });
  }

  async findOne(where: Prisma.ProfileWhereUniqueInput) {
    const profile = await this.prisma.profile.findUnique({
      where,
      include: { token: true },
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
