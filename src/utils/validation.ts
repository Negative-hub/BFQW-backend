import { HttpStatus } from '@nestjs/common';

/**
 * Утилитарные функции для валидации данных в backend
 */

/**
 * Проверяет, является ли строка валидным email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Проверяет, является ли строка валидным именем модели
 */
export function isValidModelName(name: string): boolean {
  const nameRegex = /^[a-zA-Zа-яА-Я0-9\s\-_]+$/;
  return nameRegex.test(name) && name.trim().length > 0 && name.trim().length <= 100;
}

/**
 * Проверяет, является ли значение валидным ID
 */
export function isValidId(id: any): boolean {
  const num = typeof id === 'string' ? parseInt(id, 10) : id;
  return !isNaN(num) && num > 0 && Number.isInteger(num);
}

/**
 * Проверяет, не пустая ли строка
 */
export function isNotEmpty(value: string): boolean {
  return value && value.trim().length > 0;
}

/**
 * Проверяет длину строки
 */
export function hasValidLength(value: string, min: number, max: number): boolean {
  return value.length >= min && value.length <= max;
}

/**
 * Валидирует данные для создания модели
 */
export interface CreateModelData {
  name: string;
  description?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  statusCode?: HttpStatus;
}

export function validateCreateModelData(data: CreateModelData): ValidationResult {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    errors.push('Данные модели должны быть объектом');
    return {
      isValid: false,
      errors,
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  if (!isNotEmpty(data.name)) {
    errors.push('Название модели не может быть пустым');
  }

  if (!isValidModelName(data.name)) {
    errors.push('Название модели содержит недопустимые символы или превышает лимит в 100 символов');
  }

  if (data.description && !hasValidLength(data.description, 0, 500)) {
    errors.push('Описание модели не должно превышать 500 символов');
  }

  return {
    isValid: errors.length === 0,
    errors,
    statusCode: errors.length > 0 ? HttpStatus.BAD_REQUEST : HttpStatus.OK,
  };
}

/**
 * Валидирует ID параметр
 */
export function validateId(id: any): ValidationResult {
  const errors: string[] = [];

  if (!isValidId(id)) {
    errors.push('ID должен быть положительным целым числом');
  }

  return {
    isValid: errors.length === 0,
    errors,
    statusCode: errors.length > 0 ? HttpStatus.BAD_REQUEST : HttpStatus.OK,
  };
}

/**
 * Валидирует данные для создания узла
 */
export interface CreateNodeData {
  label: string;
  modelId: number;
  metanodeId?: number;
}

export function validateCreateNodeData(data: CreateNodeData): ValidationResult {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    errors.push('Данные узла должны быть объектом');
    return {
      isValid: false,
      errors,
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  if (!isNotEmpty(data.label)) {
    errors.push('Метка узла не может быть пустой');
  }

  if (!hasValidLength(data.label, 1, 50)) {
    errors.push('Метка узла должна быть от 1 до 50 символов');
  }

  if (!isValidId(data.modelId)) {
    errors.push('ID модели должен быть положительным целым числом');
  }

  if (data.metanodeId && !isValidId(data.metanodeId)) {
    errors.push('ID метаузла должен быть положительным целым числом');
  }

  return {
    isValid: errors.length === 0,
    errors,
    statusCode: errors.length > 0 ? HttpStatus.BAD_REQUEST : HttpStatus.OK,
  };
}