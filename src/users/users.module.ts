import { Module } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [],
})
export class UsersModule {}
