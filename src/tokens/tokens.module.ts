import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { ProfilesService } from 'src/profiles/profiles.service';
import { PrismaService } from 'src/utils/prisma.service';
import RabbitmqService from 'src/utils/rabbitmq-service';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 3600 },
    }),
  ],
  controllers: [TokensController],
  providers: [TokensService, PrismaService, RabbitmqService, ProfilesService],
})
export class TokensModule {}
