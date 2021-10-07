import { Prisma } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/utils/prisma.service';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { ChargesProducerService } from './jobs/chrges.producer.service';

@Injectable()
export class ChargesService {
  constructor(
    private chargeProducer: ChargesProducerService,
    private readonly prisma: PrismaService,
  ) {}

  async create(data: Prisma.ChargesCreateInput) {
    try {
      const charge = await this.prisma.charges.create({
        data: data,
      });

      this.chargeProducer.getCostumer(charge);
      /**
       * [X] Enviar para fila
       * [X] Buscar os dados do Custumer
       * [] Buscar os dados o Marchant
       * [] Se cartão, buscar os dados do cartão no vault
       * [] Constriur o payload ORDER
       * [] Enviar o payload para o provedor conforme o tipo preferencial para essa ORDER
       */
      return charge;
    } catch (err) {
      throw new BadRequestException({
        status: 400,
        message: `Erro ao criar a charge`,
      });
    }
  }

  findAll() {
    return `This action returns all charges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} charge`;
  }

  update(id: number, updateChargeDto: UpdateChargeDto) {
    return `This action updates a #${id} charge`;
  }

  remove(id: number) {
    return `This action removes a #${id} charge`;
  }
}
