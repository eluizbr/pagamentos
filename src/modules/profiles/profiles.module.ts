import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CommonModule } from 'src/modules/common/common.module';
import { ProfileConsumerService } from './jobs/profile.consumer.service';
import { ProfileProducerService } from './jobs/profile.producer.service';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [
    CommonModule,
    BullModule.registerQueue({ name: process.env.REDIS_PROFILE_QUEUE }),
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfileConsumerService, ProfileProducerService],
  exports: [],
})
export class ProfilesModule {}
