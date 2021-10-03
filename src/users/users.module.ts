import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UsersConsumer } from './jobs/users.consumer.service';
import { UserProducerService } from './jobs/users.producer.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    CommonModule,
    BullModule.registerQueue({ name: process.env.REDIS_USERS_QUEUE }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserProducerService, UsersConsumer],
  exports: [],
})
export class UsersModule {}
