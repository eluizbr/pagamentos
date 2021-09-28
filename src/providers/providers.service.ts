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

      return provider;
    } catch (err) {
      // this.sendToQueue('tokenErrorLogs', err);

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

  findOne(id: string, user: UserToken) {
    const provider = this.prisma.providers.findFirst({
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

      return provider;
    } catch (err) {
      throw new BadRequestException({
        status: 400,
        message: err.message,
      });
    }

    return `This action updates a #${id} provider`;
  }

  remove(id: number) {
    return `This action removes a #${id} provider`;
  }
}
