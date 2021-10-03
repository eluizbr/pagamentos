import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor(process.env.REDIS_USERS_QUEUE)
export class UsersConsumer {
  constructor() {}

  @Process('create')
  async handleUserEmail(job: Job) {}
}
