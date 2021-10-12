import { Prisma } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserToken } from 'src/auth/jwt.strategy';
import { ElasticQueryService } from '../common/services/elastic.query.service';
import { PrismaService } from '../common/utils/prisma.service';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { ChargesProducerService } from './jobs/chrges.producer.service';

@Injectable()
export class ChargesService {
  constructor(
    private readonly elasticService: ElasticQueryService,
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

  findAll(user: UserToken) {
    const { profileId } = user;
    return this.elasticService.findAll('charges', { profileId });
  }

  costumer(where: any) {
    return this.elasticService.findAll('charges', where);
  }

  findOne(id: string, user: UserToken) {
    const { profileId } = user;
    return this.elasticService.findOne('charges', { id, profileId });
  }

  update(id: number, updateChargeDto: UpdateChargeDto) {
    return `This action updates a #${id} charge`;
  }

  remove(id: number) {
    return `This action removes a #${id} charge`;
  }
}
