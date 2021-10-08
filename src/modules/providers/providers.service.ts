import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserToken } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/modules/common/utils/prisma.service';
import { ElasticQueryService } from '../common/services/elastic.query.service';

@Injectable()
export class ProvidersService {
  constructor(
    private readonly elasticService: ElasticQueryService,
    private readonly prisma: PrismaService,
  ) {}

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
      throw new BadRequestException({
        status: 400,
        message: err.message,
      });
    }
  }

  async findAll(user: UserToken) {
    const { id, profileId } = user;
    return await this.elasticService.findAll('providers', {
      userId: id,
      profileId,
    });
  }

  async findOne(id: string, user: UserToken) {
    const provider = await this.elasticService.findOne('providers', {
      id,
      userId: user.id,
      profileId: user.profileId,
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
  }

  async remove(id: string, user: UserToken) {
    await this.findOne(id, user);

    try {
      await this.prisma.providers.delete({ where: { id } });
    } catch (err) {
      throw new BadRequestException({
        status: 400,
        message: err.message,
      });
    }
    return;
  }
}
