import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

abstract class HttpExceptionResponse {
  @ApiPropertyOptional()
  message?: any;

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: HttpStatus;
}

export class BadRequestExceptionResponse extends HttpExceptionResponse {
  @ApiPropertyOptional({ example: 'Bad Request' })
  message?: any;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: HttpStatus;
}

export class UnauthorizedExceptionResponse extends HttpExceptionResponse {
  @ApiPropertyOptional({ example: 'Unauthorized' })
  message?: any;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;

  @ApiProperty({ example: HttpStatus.UNAUTHORIZED })
  statusCode: HttpStatus;
}

export class ForbiddenExceptionResponse extends HttpExceptionResponse {
  @ApiPropertyOptional({ example: 'Forbidden' })
  message?: any;

  @ApiProperty({ example: 'Forbidden' })
  error: string;

  @ApiProperty({ example: HttpStatus.FORBIDDEN })
  statusCode: HttpStatus;
}

export class NotFoundExceptionResponse extends HttpExceptionResponse {
  @ApiPropertyOptional({ example: 'Not Found' })
  message?: any;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: HttpStatus;
}

export class InternalServerErrorExceptionResponse extends HttpExceptionResponse {
  @ApiPropertyOptional({ example: 'Internal Server Error' })
  message?: any;

  @ApiProperty({ example: 'Internal Server Error' })
  error: string;

  @ApiProperty({ example: HttpStatus.INTERNAL_SERVER_ERROR })
  statusCode: HttpStatus;
}
