import { HttpException, HttpStatus } from '@nestjs/common';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';
import { ErrorResponse } from '@/types/general';

export const errorHandler = (exception: unknown): ErrorResponse => {
  let status = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = 'UnknownError';

  switch (exception.constructor) {
    case HttpException:
      status = (exception as HttpException).getStatus() as HttpStatus;
      break;
    case QueryFailedError:
      status = HttpStatus.BAD_REQUEST;
      message = (exception as QueryFailedError).message;
      break;
    case EntityNotFoundError:
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = (exception as EntityNotFoundError).message;
      break;
    case CannotCreateEntityIdMapError:
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = (exception as CannotCreateEntityIdMapError).message;
      break;
    default:
      status = HttpStatus.INTERNAL_SERVER_ERROR;
  }

  return { status, message };
};
