import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { UserToken } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/common/utils/prisma.service';
import { UpdateCostumerDto } from './dto/update-costumer.dto';

@Injectable()
export class CostumersService {
  constructor(private readonly prisma: PrismaService) {}

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

      return costumer;
    } catch (err) {
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

      return costumer;
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
      await this.prisma.costumers.delete({ where: { id } });
    } catch (err) {
      throw new BadRequestException({
        status: 400,
        message: err.message,
      });
    }
    return;
  }
}
