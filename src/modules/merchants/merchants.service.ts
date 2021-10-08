import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/common/utils/prisma.service';
import { ElasticQueryService } from '../common/services/elastic.query.service';

@Injectable()
export class MerchantsService {
  constructor(
    private readonly elasticService: ElasticQueryService,
    private readonly prisma: PrismaService,
  ) {}

  async create(data: any, request: any) {
    const { id, profileId } = request;

    const merchant = await this.prisma.merchants.findFirst({
      where: { profileId },
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
      throw new BadRequestException({
        status: 400,
        message: err.message,
      });
    }
  }

  async findAll(where: any) {
    return await this.elasticService.findAll('merchants', where);
  }

  async findOne(where: Prisma.MerchantsWhereInput) {
    const merchant = await this.elasticService.findOne('merchants', where);

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
