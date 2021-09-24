import { Module } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import RabbitmqService from 'src/utils/rabbitmq-service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, RabbitmqService],
  exports: [],
})
export class UsersModule {}
