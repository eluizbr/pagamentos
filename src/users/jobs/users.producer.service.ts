import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class UserProducerService {
  constructor(
    @InjectQueue(process.env.REDIS_USERS_QUEUE) private usersQueue: Queue,
  ) {}

  async sendToQueue(type: string, data: any) {
    await this.usersQueue.add(type, data);
  }
}
