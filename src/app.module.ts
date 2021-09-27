import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './utils/prisma.service';
import { MerchantsModule } from './merchants/merchants.module';

@Module({
  imports: [UsersModule, ProfilesModule, TokensModule, MerchantsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
