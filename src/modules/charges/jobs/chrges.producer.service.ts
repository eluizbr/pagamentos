import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ChargesProducerService {
  constructor(
    @InjectQueue(process.env.REDIS_CHARGES_QUEUE) private charcheQueue: Queue,
  ) {}

  async getCostumer(data: any) {
    await this.charcheQueue.add('getCostumer', data);
  }

  async getMerchant(data: any) {
    await this.charcheQueue.add('getMerchant', data);
  }
}
