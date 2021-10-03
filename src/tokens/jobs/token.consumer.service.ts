import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor(process.env.REDIS_TOKEN_QUEUE)
export class TokenConsumerService {
  constructor() {}

  @Process()
  async handleToken(job: Job) {}
}
