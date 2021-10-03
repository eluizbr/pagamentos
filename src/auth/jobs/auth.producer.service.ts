import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AuthProducerService {
  constructor(@InjectQueue('auth') private authQueue: Queue) {}

  async sendToQueue(type: string, data: any) {
    await this.authQueue.add(type, data);
  }
}
