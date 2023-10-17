import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Inject,
  Injectable,
  Optional,
} from '@nestjs/common';

import { DriverException } from '@mikro-orm/core';

@Injectable()
@Catch(DriverException)
export default class DatabaseExceptionFilter implements ExceptionFilter {
  constructor(
    @Optional() @Inject('OBJECT_NAME') private objectName: string,
    @Optional()
    @Inject('DB_FILTER_CUSTOM_ERROR_MESSAGE')
    private customErrorMessage: string,
  ) {}

  catch(exception: DriverException, host: ArgumentsHost) {
    if (exception.code) {
      switch (exception.code) {
        case '23505':
          const ctx = host.switchToHttp();
          const response = ctx.getResponse();
          response.status(400).json({
            statusCode: 400,
            message: this.customErrorMessage
              ? this.customErrorMessage
              : `${this.objectName || 'Record'} already exists`,
          });
        default:
      }
    }
  }
}
