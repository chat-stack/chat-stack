import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  BadRequestExceptionResponse,
  ForbiddenExceptionResponse,
  InternalServerErrorExceptionResponse,
  NotFoundExceptionResponse,
  UnauthorizedExceptionResponse,
} from 'src/common/classes/http-exceptions';

export const ApiMixedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      description: 'Ok',
      type: model,
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      type: BadRequestExceptionResponse,
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      type: UnauthorizedExceptionResponse,
    }),
    ApiForbiddenResponse({
      description: 'Forbidden',
      type: ForbiddenExceptionResponse,
    }),
    ApiNotFoundResponse({
      description: 'Not Found',
      type: NotFoundExceptionResponse,
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal Server Error',
      type: InternalServerErrorExceptionResponse,
    }),
  );
};
