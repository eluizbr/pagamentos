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

  async create(data: any, user: any) {
    const { id } = user;
    const { profileId } = data;

    delete data.profileId;

    const merchant = await this.prisma.merchants.findFirst({
      where: { profileId },
    });

    if (merchant) {
      throw new BadRequestException({
        status: 400,
        message: 'Profile já possuiu um merchant',
      });
    }

    try {
      return await this.prisma.merchants.create({
        data: {
          ...data,
          userId: id,
          profile: { connect: { id: profileId } },
        },
      });
    } catch (err) {
      throw new BadRequestException({
        status: 400,
        message: err.message,
      });
    }
  }

  findAll(where: any) {
    return this.prisma.merchants.findMany({ where });
  }

  async findOne(where: Prisma.MerchantsWhereInput) {
    const merchant = await this.prisma.merchants.findFirst({ where });

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
      return merchant;
    } catch (err) {
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
      throw new BadRequestException({
        status: 400,
        message: err.message,
      });
    }
    return;
  }
}
