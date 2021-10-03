import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ErrorsLogsProducerService {
  constructor(
    @InjectQueue(process.env.REDIS_ERRORS_QUEUE) private errorsQueue: Queue,
  ) {}

  async sendToQueue(data: any) {
    await this.errorsQueue.add(data, { delay: 5 });
  }
}
