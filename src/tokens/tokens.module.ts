import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ProfilesService } from 'src/profiles/profiles.service';
import { TokenConsumerService } from './jobs/token.consumer.service';
import { TokenProducerService } from './jobs/token.producer.service';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    CommonModule,
    BullModule.registerQueue({ name: process.env.REDIS_TOKEN_QUEUE }),
  ],
  controllers: [TokensController],
  providers: [
    TokensService,
    ProfilesService,
    TokenConsumerService,
    TokenProducerService,
  ],
})
export class TokensModule {}
