import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ProfileProducerService {
  constructor(
    @InjectQueue(process.env.REDIS_PROFILE_QUEUE) private profileQueue: Queue,
  ) {}

  async sendToQueue(type: string, data: any) {
    await this.profileQueue.add(type, data);
  }
}
