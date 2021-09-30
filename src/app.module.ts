import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MerchantsModule } from './merchants/merchants.module';
import { ProfilesModule } from './profiles/profiles.module';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from './users/users.module';
import { ProvidersModule } from './providers/providers.module';
import { CostumersModule } from './costumers/costumers.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProfilesModule,
    TokensModule,
    MerchantsModule,
    ProvidersModule,
    CostumersModule,
    CardsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
