import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MerchantsModule } from './merchants/merchants.module';
import { ProfilesModule } from './profiles/profiles.module';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    MerchantsModule,
    ProfilesModule,
    UsersModule,
    TokensModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
