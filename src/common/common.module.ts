import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareBuilder } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/common/utils/prisma.service';
import { ProfileConsumerService } from 'src/profiles/jobs/profile.consumer.service';
import { ProfileProducerService } from 'src/profiles/jobs/profile.producer.service';
import { TokenConsumerService } from 'src/tokens/jobs/token.consumer.service';
import { TokenProducerService } from 'src/tokens/jobs/token.producer.service';
import { GetCreditCardService } from './utils/getCreditCardBrand.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 3600 },
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({ name: process.env.REDIS_USERS_QUEUE }),
    BullModule.registerQueue({ name: process.env.REDIS_PROFILE_QUEUE }),
    BullModule.registerQueue({ name: process.env.REDIS_TOKEN_QUEUE }),
    BullModule.registerQueue({ name: process.env.REDIS_AUTH_QUEUE }),
  ],
  providers: [
    ProfileConsumerService,
    ProfileProducerService,
    TokenConsumerService,
    TokenProducerService,
    PrismaService,
    JwtStrategy,
    GetCreditCardService,
  ],
  exports: [
    PrismaService,
    JwtStrategy,
    PassportModule,
    JwtModule,
    GetCreditCardService,
  ],
})
export class CommonModule {
  constructor(
    @InjectQueue(process.env.REDIS_AUTH_QUEUE) private authQueue: Queue,
    @InjectQueue(process.env.REDIS_USERS_QUEUE) private userQueue: Queue,
    @InjectQueue(process.env.REDIS_PROFILE_QUEUE) private profileQueue: Queue,
    @InjectQueue(process.env.REDIS_TOKEN_QUEUE) private tokenQueue: Queue,
  ) {}

  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([
      new BullAdapter(this.authQueue),
      new BullAdapter(this.userQueue),
      new BullAdapter(this.profileQueue),
      new BullAdapter(this.tokenQueue),
    ]);
    consumer.apply(router).forRoutes('/admin');
  }
}
