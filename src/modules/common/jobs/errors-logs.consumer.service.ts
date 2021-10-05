import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor(process.env.REDIS_ERRORS_QUEUE)
export class ErrorsLogsConsumerService {
  @Process()
  async handleErros(job: Job) {
    console.log(job.data);
  }
}
