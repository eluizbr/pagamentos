import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PrismaService } from 'src/modules/common/utils/prisma.service';
import { CreateChargeDto } from '../dto/create-charge.dto';
import { ChargesProducerService } from './chrges.producer.service';

@Processor(process.env.REDIS_CHARGES_QUEUE)
export class ChargesConsumerService {
  constructor(
    private chargeProducer: ChargesProducerService,
    private readonly prisma: PrismaService,
  ) {}

  @Process('getCostumer')
  async handleCostumer(job: Job<CreateChargeDto>) {
    const { profileId, costumerId, merchantId } = job.data;
    try {
      const costumer = await this.prisma.profile.findUnique({
        where: { id: profileId },
        include: {
          costumers: { where: { id: costumerId } },
          merchant: {
            where: { id: merchantId },
            include: { provider: { where: { priority: 1 } } },
          },
        },
      });

      console.log(costumer);
    } catch (err) {}
  }
}
