import { InjectQueue } from '@nestjs/bull';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Queue } from 'bull';
import { Request, Response } from 'express';

@Injectable()
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@InjectQueue('errors_logs') private errorQueue: Queue) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();

    // console.log(request.headers);
    // console.log(request.method);
    // console.log(request.body);
    // console.log(request.path);
    // console.log(request.params);
    // console.log(status);
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.errorQueue.add({
      statusCode: status,
      method: request.method,
      params: request.params,
      timestamp: new Date().toISOString(),
      path: request.url,
      body: request.body,
      headers: request.headers,
      user: request?.user,
      error: exception.getResponse(),
    });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: exception.getResponse(),
    });
  }
}
