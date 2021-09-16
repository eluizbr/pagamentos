import { Module } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, PrismaService],
  exports: [PrismaService],
})
export class ProfilesModule {}
