import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, MiddlewareBuilder } from '@nestjs/core';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/modules/common/utils/prisma.service';
import { ErrorsLogsConsumerService } from './jobs/errors-logs.consumer.service';
import { ErrorsLogsProducerService } from './jobs/errors-logs.producer.service';
import { ElasticQueryService } from './services/elastic.query.service';
import { GetCreditCardService } from './utils/getCreditCardBrand.service';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { RollbarService } from './utils/rollbar.service';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.register({
      node: 'http://192.168.1.2:9200',
      maxRetries: 10,
      requestTimeout: 60000,
    }),
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
    BullModule.registerQueue({ name: process.env.REDIS_ERRORS_QUEUE }),
    BullModule.registerQueue({ name: process.env.REDIS_CHARGES_QUEUE }),
  ],
  providers: [
    ConfigService,
    PrismaService,
    JwtStrategy,
    GetCreditCardService,
    ErrorsLogsProducerService,
    ErrorsLogsConsumerService,
    RollbarService,
    ElasticQueryService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [
    ElasticQueryService,
    PrismaService,
    JwtStrategy,
    PassportModule,
    JwtModule,
    GetCreditCardService,
  ],
})
export class CommonModule {
  constructor(
    @InjectQueue(process.env.REDIS_ERRORS_QUEUE) private errorsQueue: Queue,
    @InjectQueue(process.env.REDIS_AUTH_QUEUE) private authQueue: Queue,
    @InjectQueue(process.env.REDIS_USERS_QUEUE) private userQueue: Queue,
    @InjectQueue(process.env.REDIS_PROFILE_QUEUE) private profileQueue: Queue,
    @InjectQueue(process.env.REDIS_TOKEN_QUEUE) private tokenQueue: Queue,
    @InjectQueue(process.env.REDIS_CHARGES_QUEUE) private chargeQueue: Queue,
  ) {}

  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([
      new BullAdapter(this.errorsQueue),
      new BullAdapter(this.authQueue),
      new BullAdapter(this.userQueue),
      new BullAdapter(this.profileQueue),
      new BullAdapter(this.tokenQueue),
      new BullAdapter(this.chargeQueue),
    ]);
    consumer.apply(router).forRoutes('/admin');
  }
}
