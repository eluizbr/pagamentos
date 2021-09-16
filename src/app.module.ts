import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './utils/prisma.service';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [UsersModule, ProfilesModule, TokensModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
