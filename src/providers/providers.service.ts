import { Prisma } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/utils/prisma.service';
import RabbitmqService from 'src/common/utils/rabbitmq-service';
import { UpdateProviderDto } from './dto/update-provider.dto';

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

  async create(data: Prisma.ProvidersCreateInput, user: any) {
    const { id, profile } = user;
    const { merchantId } = data;

    try {
      const provider = await this.prisma.providers.create({
        data: {
          ...data,
          profileId: profile,
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

  findAll(user: any) {
    const { id, profile } = user;
    return this.prisma.providers.findMany({
      where: { userId: id, profileId: profile },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} provider`;
  }

  update(id: number, updateProviderDto: UpdateProviderDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: number) {
    return `This action removes a #${id} provider`;
  }
}
