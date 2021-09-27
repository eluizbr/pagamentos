import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/utils/prisma.service';
import RabbitmqService from 'src/utils/rabbitmq-service';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [AuthModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProfilesController],
  providers: [ProfilesService, PrismaService, RabbitmqService],
  exports: [PrismaService],
})
export class ProfilesModule {}
