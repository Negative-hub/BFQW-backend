import { HttpException, HttpStatus } from '@nestjs/common';
import {
  CannotCreateEntityIdMapError,
  EntityMetadata,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';
import { errorHandler } from './errorHandler';
import { ErrorResponse } from '@/types/general';

describe('errorHandler', () => {
  it('должен обрабатывать UnknownError', () => {
    const httpException = new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    const result: ErrorResponse = errorHandler(httpException);

    expect(result.status).toBe(HttpStatus.BAD_REQUEST);
    expect(result.message).toBe('UnknownError');
  });

  it('должен обрабатывать Error', () => {
    const queryError = new QueryFailedError('SQL syntax error', [], new Error(''));
    const result: ErrorResponse = errorHandler(queryError);

    expect(result.status).toBe(HttpStatus.BAD_REQUEST);
    expect(result.message).toBe('Error');
  });

  it('должен обрабатывать Could not find any entity of type "Entity not found" matching: \"\"', () => {
    const entityError = new EntityNotFoundError('Entity not found', '');
    const result: ErrorResponse = errorHandler(entityError);

    expect(result.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    expect(result.message).toBe('Could not find any entity of type "Entity not found" matching: \"\"');
  });

  it('должен обрабатывать строковые ошибки', () => {
    const result: ErrorResponse = errorHandler('String error');

    expect(result.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(result.message).toBe('UnknownError');
  });

  it('должен возвращать объект ErrorResponse', () => {
    const error = new Error('Test error');
    const result: ErrorResponse = errorHandler(error);

    expect(result).toHaveProperty('s'); // TODO
    expect(result).toHaveProperty('message');
    expect(typeof result.status).toBe('number');
    expect(typeof result.message).toBe('string');
  });

  it('должен обрабатывать различные HTTP статусы в HttpException', () => {
    const notFoundException = new HttpException('Not Found', HttpStatus.NOT_FOUND);
    const forbiddenException = new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const serverErrorException = new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);

    const notFoundResult = errorHandler(notFoundException);
    const forbiddenResult = errorHandler(forbiddenException);
    const serverErrorResult = errorHandler(serverErrorException);

    expect(notFoundResult.status).toBe(HttpStatus.NOT_FOUND);
    expect(forbiddenResult.status).toBe(HttpStatus.FORBIDDEN);
    expect(serverErrorResult.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});