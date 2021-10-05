import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor(process.env.REDIS_PROFILE_QUEUE)
export class ProfileConsumerService {
  @Process()
  async handleProfile(job: Job) {}
}
