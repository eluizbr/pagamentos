import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserToken } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/common/utils/prisma.service';
import RabbitmqService from 'src/common/utils/rabbitmq-service';

@Injectable()
export class ProvidersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbitmq: RabbitmqService,
  ) {}

  sendToQueue(routingKey: string, data: any) {
    this.rabbitmq.publishInExchange(
      process.env.RABBTIMQ_PROVIDER_EXCHANGE,
      routingKey,
      data,
    );
  }

  async create(data: Prisma.ProvidersCreateInput, request: any) {
    const { id, profileId } = request;
    const { merchantId } = data;

    try {
      const provider = await this.prisma.providers.create({
        data: {
          ...data,
          profileId,
          userId: id,
          merchant: {
            connect: { id: merchantId },
          },
        },
      });

      this.sendToQueue('providerCreateLogs', {
        type: 'createProvider',
        ...provider,
      });

      return provider;
    } catch (err) {
      this.sendToQueue('providerErrorLogs', err);

      throw new BadRequestException({
        status: 400,
        message: err.message,
      });
    }
  }

  findAll(user: UserToken) {
    const { id, profileId } = user;
    return this.prisma.providers.findMany({
      where: { userId: id, profileId: profileId },
    });
  }

  async findOne(id: string, user: UserToken) {
    const provider = await this.prisma.providers.findFirst({
      where: { id, userId: user.id, profileId: user.profileId },
    });
    if (!provider) {
      throw new NotFoundException(`Provider id ${id}, não existe!`);
    }

    return provider;
  }

  async update(id: string, data: Prisma.ProvidersUpdateInput, user: UserToken) {
    await this.findOne(id, user);

    try {
      const provider = await this.prisma.providers.update({
        where: { id },
        data,
      });

      this.sendToQueue('providerUpdateLogs', {
        type: 'updateProvider',
        id: provider.id,
        update: provider.updated_at,
        fields: Object.keys(data),
      });

      return provider;
    } catch (err) {
      this.sendToQueue('providerErrorLogs', {
        id,
        error: err.message,
      });

      throw new BadRequestException({
        status: 400,
        message: err.message,
      });
    }
  }

  async remove(id: string, user: UserToken) {
    await this.findOne(id, user);

    try {
      await this.prisma.providers.delete({ where: { id } });
    } catch (err) {
      this.sendToQueue('providerErrorLogs', {
        id,
        error: err.message,
      });

      throw new BadRequestException({
        status: 400,
        message: err.message,
      });
    }
    return;
  }
}
