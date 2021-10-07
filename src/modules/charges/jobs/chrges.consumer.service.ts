import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PrismaService } from 'src/modules/common/utils/prisma.service';
import { CreateChargeDto } from '../dto/create-charge.dto';

@Processor(process.env.REDIS_CHARGES_QUEUE)
export class ChargesConsumerService {
  constructor(private readonly prisma: PrismaService) {}

  @Process('getCostumer')
  async handleConsumer(job: Job<CreateChargeDto>) {
    const { costumerId } = job.data;
    const costumer = await this.prisma.costumers.findUnique({
      where: { id: costumerId },
    });
    console.log(costumer);
  }
}
