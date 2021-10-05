import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Rollbar from 'rollbar';

@Injectable()
export class RollbarService {
  private rollbar: Rollbar;
  private configService: ConfigService;

  constructor() {
    this.start();
  }

  private start() {
    this.rollbar = new Rollbar({
      accessToken: process.env.ROLLBAR_TOKEN,
      environment: process.env.ROLLBAR_ENV,
      captureUncaught: true,
      captureUnhandledRejections: true,
    });
  }

  critical(data: any, messase: any) {
    this.rollbar.configure({ payload: { ...data } });
    this.rollbar.critical(messase.error);
  }
}
