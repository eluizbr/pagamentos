import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ChargesController } from './charges.controller';
import { ChargesService } from './charges.service';
import { ChargesConsumerService } from './jobs/chrges.consumer.service';
import { ChargesProducerService } from './jobs/chrges.producer.service';

@Module({
  imports: [
    CommonModule,
    BullModule.registerQueue({ name: process.env.REDIS_CHARGES_QUEUE }),
  ],
  controllers: [ChargesController],
  providers: [ChargesService, ChargesConsumerService, ChargesProducerService],
})
export class ChargesModule {}
