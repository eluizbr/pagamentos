import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class TokenProducerService {
  constructor(
    @InjectQueue(process.env.REDIS_TOKEN_QUEUE) private tokenQueue: Queue,
  ) {}

  async sendToQueue(type: string, data: any) {
    await this.tokenQueue.add(type, data);
  }
}
