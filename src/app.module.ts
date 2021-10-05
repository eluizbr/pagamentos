import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { CostumersModule } from './costumers/costumers.module';
import { MerchantsModule } from './merchants/merchants.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ProvidersModule } from './providers/providers.module';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    ProfilesModule,
    TokensModule,
    MerchantsModule,
    ProvidersModule,
    CostumersModule,
    CardsModule,
  ],
  providers: [],
})
export class AppModule {}
