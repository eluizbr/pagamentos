import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './modules/cards/cards.module';
import { ChargesModule } from './modules/charges/charges.module';
import { LoggerMiddleware } from './modules/common/utils/logger.middleware';
import { CostumersModule } from './modules/costumers/costumers.module';
import { MerchantsModule } from './modules/merchants/merchants.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { UsersModule } from './modules/users/users.module';

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
    ChargesModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
