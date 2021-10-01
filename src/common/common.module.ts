import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/common/utils/prisma.service';
import RabbitmqService from 'src/common/utils/rabbitmq-service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 3600 },
    }),
  ],
  providers: [PrismaService, JwtStrategy, RabbitmqService],
  exports: [
    PrismaService,
    RabbitmqService,
    JwtStrategy,
    PassportModule,
    JwtModule,
  ],
})
export class CommonModule {}
