import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('auth')
export class AuthConsumerService {
  @Process()
  async handleProfile(job: Job) {}
}
