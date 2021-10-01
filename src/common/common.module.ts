import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/common/utils/prisma.service';
import RabbitmqService from 'src/common/utils/rabbitmq-service';
import { GetCreditCardService } from './utils/getCreditCardBrand.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 3600 },
    }),
  ],
  providers: [
    PrismaService,
    JwtStrategy,
    RabbitmqService,
    GetCreditCardService,
  ],
  exports: [
    PrismaService,
    RabbitmqService,
    JwtStrategy,
    PassportModule,
    JwtModule,
    GetCreditCardService,
  ],
})
export class CommonModule {}
