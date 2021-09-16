import { Module } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

@Module({
  controllers: [TokensController],
  providers: [TokensService, PrismaService],
})
export class TokensModule {}
