import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { IApiPaginatedResponseOptions } from 'src/common/interfaces/api-paginated-response-options.interface';

import { PageDto } from 'src/common/dto/page/page.dto';
import {
  BadRequestExceptionResponse,
  ForbiddenExceptionResponse,
  InternalServerErrorExceptionResponse,
  UnauthorizedExceptionResponse,
} from 'src/common/classes/http-exceptions';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  options?: IApiPaginatedResponseOptions,
) => {
  const description = options?.description || '';
  return applyDecorators(
    ApiExtraModels(PageDto, model),
    ApiOkResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      type: () => BadRequestExceptionResponse,
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      type: () => UnauthorizedExceptionResponse,
    }),
    ApiForbiddenResponse({
      description: 'Forbidden',
      type: () => ForbiddenExceptionResponse,
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal Server Error',
      type: () => InternalServerErrorExceptionResponse,
    }),
  );
};
