import { Process, Processor } from '@nestjs/bull';
import { Prisma } from '@prisma/client';
import { Job } from 'bull';
import { ElasticQueryService } from 'src/modules/common/services/elastic.query.service';
import { PrismaService } from 'src/modules/common/utils/prisma.service';
import { CreateChargeDto } from '../dto/create-charge.dto';
import { ChargesProducerService } from './chrges.producer.service';

@Processor(process.env.REDIS_CHARGES_QUEUE)
export class ChargesConsumerService {
  constructor(
    private readonly elasticService: ElasticQueryService,
    private chargeProducer: ChargesProducerService,
    private readonly prisma: PrismaService,
  ) {}

  @Process('getCostumer')
  async handleCostumer(job: Job<Prisma.ChargesUncheckedCreateInput>) {
    const { id, profileId, costumerId, merchantId, cardId } = job.data;
    try {
      const charge = await this.elasticService.findOne('charges', {
        id,
        cardId,
        profileId,
        merchantId,
        costumerId,
      });
      this.chargeProducer.processCharge({ ...charge });
    } catch (err) {}
  }

  @Process('processCharge')
  async handleProcessCharge(job: Job<CreateChargeDto>) {}
}
