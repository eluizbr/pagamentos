import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { UserToken } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/common/utils/prisma.service';
import RabbitmqService from 'src/common/utils/rabbitmq-service';
import { UpdateCostumerDto } from './dto/update-costumer.dto';

@Injectable()
export class CostumersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbitmq: RabbitmqService,
  ) {}

  sendToQueue(routingKey: string, data: any) {
    this.rabbitmq.publishInExchange(
      process.env.RABBTIMQ_COSTUMER_EXCHANGE,
      routingKey,
      data,
    );
  }

  async create(data: Prisma.CostumersCreateInput, user: UserToken) {
    const { id, profileId } = user;

    try {
      const costumer = await this.prisma.costumers.create({
        data: {
          ...data,
          profileId,
          profile: {
            connect: { id: profileId },
          },
        },
      });

      this.sendToQueue('costumerCreateLogs', {
        type: 'createCostumer',
        ...costumer,
      });

      return costumer;
    } catch (err) {
      this.sendToQueue('costumerErrorLogs', err);
      let message = '';
      console.log(data.document.length);

      if (data.document.length >= 12) {
        if (!cnpj.isValid(data.document))
          message = `O profile já possui um costumer com o CNPJ ${cpf.format(
            data.document,
          )}`;
      } else {
        message = `O profile já possui um costumer com o CPF ${cpf.format(
          data.document,
        )}`;
      }

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException({
          status: 409,
          message: `${message}`,
        });
      }

      throw new BadRequestException({
        status: 400,
        message: err.message,
      });
    }

    return;
  }

  findAll(user: UserToken) {
    const { id, profileId } = user;
    return this.prisma.costumers.findMany({
      where: { profileId },
      include: { cards: true },
    });
  }

  async findOne(id: string, user: UserToken) {
    const { profileId } = user;

    const costumer = await this.prisma.costumers.findFirst({
      where: { id, profileId },
      include: { cards: true },
    });

    if (!costumer) {
      throw new NotFoundException(`Costumer id ${id}, não existe!`);
    }

    return costumer;
  }

  async update(id: string, data: UpdateCostumerDto, user: UserToken) {
    await this.findOne(id, user);

    try {
      const costumer = await this.prisma.costumers.update({
        where: { id },
        data,
      });

      this.sendToQueue('costumerUpdateLogs', {
        type: 'updateCostumer',
        id: costumer.id,
        update: costumer.updated_at,
        fields: Object.keys(data),
      });

      return costumer;
    } catch (err) {
      this.sendToQueue('costumerErrorLogs', {
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
      await this.prisma.costumers.delete({ where: { id } });
    } catch (err) {
      this.sendToQueue('costumerErrorLogs', {
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
