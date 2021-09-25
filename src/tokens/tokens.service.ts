import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import RabbitmqService from 'src/utils/rabbitmq-service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Injectable()
export class TokensService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbitmq: RabbitmqService,
  ) {}

  sendToQueue(routingKey: string, data: any) {
    this.rabbitmq.publishInExchange(
      process.env.RABBTIMQ_TOKEN_EXCHANGE,
      routingKey,
      data,
    );
  }

  async create(createTokenDto: CreateTokenDto) {
    const profile: any = createTokenDto.profileId;
    try {
      const token = await this.prisma.token.create({
        data: {
          ...createTokenDto,
          profile: {
            connect: { id: profile },
          },
        },
      });

      this.sendToQueue('tokenCreateLogs', {
        type: 'createToken',
        ...token,
      });

      return token;
    } catch (err) {
      this.sendToQueue('tokenErrorLogs', err);
      return {
        code: err.code,
        message: err.meta.cause,
      };
    }
  }

  findAll() {
    return this.prisma.token.findMany();
  }

  async findOne(id: string) {
    const token = await this.prisma.token.findUnique({ where: { id } });
    if (!token)
      throw new NotFoundException(`Token com o id ${id}, não existe!`);

    return token;
  }

  async update(id: string, updateTokenDto: UpdateTokenDto) {
    await this.findOne(id);
    const token = await this.prisma.token.update({
      where: { id },
      data: UpdateTokenDto,
    });

    this.sendToQueue('tokenUpdateLogs', {
      type: 'tokenUpdate',
      id: token.id,
      update: token.updated_at,
      fields: Object.keys(updateTokenDto),
    });

    return token;
  }

  async remove(id: string) {
    await this.findOne(id);
    const token = await this.prisma.token.delete({ where: { id } });

    this.sendToQueue('tokenRemoveLogs', {
      type: 'removeToken',
      id: token.id,
      update: token.updated_at,
    });

    return token;
  }
}
