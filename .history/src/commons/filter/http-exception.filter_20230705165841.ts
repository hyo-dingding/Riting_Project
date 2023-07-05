import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | { message: any; statusCode: number; code: string }
      | { error: string; statusCode: 400; message: string[]; code: string }
      | { error: string; statusCode: 404; message: string[]; code: string };

    let message = null;
    let code = null;
    if (typeof error !== 'string' && error) {
      message = error.message;
      code = error.code;
    } else {
      message = error;
      code = error;
    }

    response.status(status).json({
      statusCode: status,
      code,
      message,
    });
    
  }
}
