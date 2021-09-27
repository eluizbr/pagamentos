import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/utils/prisma.service';
import RabbitmqService from 'src/utils/rabbitmq-service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, RabbitmqService],
  exports: [],
})
export class UsersModule {}
