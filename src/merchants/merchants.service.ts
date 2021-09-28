import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/utils/prisma.service';
import RabbitmqService from 'src/common/utils/rabbitmq-service';

@Injectable()
export class MerchantsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbitmq: RabbitmqService,
  ) {}

  sendToQueue(routingKey: string, data: any) {
    this.rabbitmq.publishInExchange(
      process.env.RABBTIMQ_MERCHANT_EXCHANGE,
      routingKey,
      data,
    );
  }

  async create(data: any, request: any) {
    const { id } = request;
    const { profileId } = data;

    delete data.profileId;

    const merchant = await this.prisma.merchants.findFirst({
      where: { profileId },
    });

    if (merchant) {
      this.sendToQueue('merchantErrorLogs', {
        id,
        error: 'Profile já possuiu um merchant',
      });

      throw new BadRequestException({
        status: 400,
        message: 'Profile já possuiu um merchant',
      });
    }

    this.sendToQueue('merchantCreateLogs', {
      type: 'merchantCreate',
      ...merchant,
    });

    try {
      return await this.prisma.merchants.create({
        data: {
          ...data,
          userId: id,
          profile: { connect: { id: profileId } },
        },
      });
    } catch (err) {
      this.sendToQueue('merchantErrorLogs', {
        id,
        error: err.message,
      });
      throw new BadRequestException({
        status: 400,
        message: err.message,
      });
    }
  }

  findAll(where: any) {
    return this.prisma.merchants.findMany({
      where,
      include: { _count: true, provider: true },
    });
  }

  async findOne(where: Prisma.MerchantsWhereInput) {
    const merchant = await this.prisma.merchants.findFirst({
      where,
      include: { _count: true, provider: true },
    });

    if (!merchant) {
      throw new NotFoundException(`Merchant id ${where.id}, não existe!`);
    }

    return merchant;
  }

  async update(where: any, data: Prisma.MerchantsUpdateInput) {
    const { id, userId } = where;
    await this.findOne(where);

    try {
      const merchant = await this.prisma.merchants.update({
        where: { id },
        data,
      });

      this.sendToQueue('merchantUpdateLogs', {
        type: 'updateMerchant',
        id: merchant.id,
        update: merchant.updated_at,
        fields: Object.keys(data),
      });
      return merchant;
    } catch (err) {
      this.sendToQueue('merchantErrorLogs', {
        id,
        error: err.message,
      });
      throw new BadRequestException({
        status: 400,
        message: err.message,
      });
    }
  }

  async remove(where: any) {
    const { id, userId } = where;
    await this.findOne(where);

    try {
      await this.prisma.merchants.delete({ where: { id } });
    } catch (err) {
      this.sendToQueue('merchantErrorLogs', {
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
