import { HttpStatus } from '@nestjs/common';
import {
  isValidEmail,
  isValidModelName,
  isValidId,
  isNotEmpty,
  hasValidLength,
  validateCreateModelData,
  validateId,
  validateCreateNodeData,
  CreateModelData,
  CreateNodeData,
} from './validation';

describe('validation utilities', () => {
  describe('isValidEmail', () => {
    it('должен возвращать true для валидных email адресов', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.org')).toBe(true);
    });

    it('должен возвращать false для невалидных email адресов', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test.example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidModelName', () => {
    it('должен возвращать true для валидных названий моделей', () => {
      expect(isValidModelName('Тестовая модель')).toBe(true);
      expect(isValidModelName('Model-123')).toBe(true);
      expect(isValidModelName('Model_Test')).toBe(true);
      expect(isValidModelName('Model 123')).toBe(true);
    });

    it('должен возвращать false для невалидных названий моделей', () => {
      expect(isValidModelName('')).toBe(false);
      expect(isValidModelName('   ')).toBe(false);
      expect(isValidModelName('Model@Test')).toBe(false);
      expect(isValidModelName('Model#Test')).toBe(false);
      expect(isValidModelName('a'.repeat(101))).toBe(false);
    });
  });

  describe('isValidId', () => {
    it('должен возвращать true для валидных ID', () => {
      expect(isValidId(1)).toBe(true);
      expect(isValidId(100)).toBe(true);
      expect(isValidId('1')).toBe(true);
      expect(isValidId('999')).toBe(true);
    });

    it('должен возвращать false для невалидных ID', () => {
      expect(isValidId(0)).toBe(false);
      expect(isValidId(-1)).toBe(false);
      expect(isValidId('0')).toBe(false);
      expect(isValidId('-5')).toBe(false);
      expect(isValidId('abc')).toBe(false);
      expect(isValidId(1.5)).toBe(false);
      expect(isValidId(null)).toBe(false);
      expect(isValidId(undefined)).toBe(false);
    });
  });

  describe('isNotEmpty', () => {
    it('должен возвращать true для непустых строк', () => {
      expect(isNotEmpty('test')).toBe(true);
      expect(isNotEmpty('  test  ')).toBe(true);
      expect(isNotEmpty('a')).toBe(true);
    });

    it('должен возвращать false для пустых строк', () => {
      expect(isNotEmpty('   ')).toBe(false);
      expect(isNotEmpty('\t\n')).toBe(false);
    });
  });

  describe('hasValidLength', () => {
    it('должен возвращать true для строк с валидной длиной', () => {
      expect(hasValidLength('test', 1, 10)).toBe(true);
      expect(hasValidLength('a', 1, 1)).toBe(true);
      expect(hasValidLength('hello world', 5, 15)).toBe(true);
    });

    it('должен возвращать false для строк с невалидной длиной', () => {
      expect(hasValidLength('test', 5, 10)).toBe(false);
      expect(hasValidLength('test', 1, 3)).toBe(false);
      expect(hasValidLength('', 1, 10)).toBe(false);
    });
  });

  describe('validateCreateModelData', () => {
    it('должен возвращать валидный результат для корректных данных', () => {
      const validData: CreateModelData = {
        name: 'Тестовая модель',
        description: 'Описание модели',
      };

      const result = validateCreateModelData(validData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.statusCode).toBe(HttpStatus.OK);
    });

    it('должен возвращать ошибки для некорректных данных', () => {
      const invalidData: CreateModelData = {
        name: '',
        description: 'a'.repeat(501),
      };

      const result = validateCreateModelData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('должен обрабатывать null/undefined данные', () => {
      const result = validateCreateModelData(null as any);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Данные модели должны быть объектом');
      expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('должен работать без описания', () => {
      const validData: CreateModelData = {
        name: 'Тестовая модель',
      };

      const result = validateCreateModelData(validData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('validateId', () => {
    it('должен возвращать валидный результат для корректного ID', () => {
      const result = validateId(123);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.statusCode).toBe(HttpStatus.OK);
    });

    it('должен возвращать ошибку для некорректного ID', () => {
      const result = validateId('invalid');

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('ID должен быть положительным целым числом');
      expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('должен обрабатывать строковые ID', () => {
      const result = validateId('456');

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('validateCreateNodeData', () => {
    it('должен возвращать валидный результат для корректных данных', () => {
      const validData: CreateNodeData = {
        label: 'Тестовый узел',
        modelId: 1,
        metanodeId: 2,
      };

      const result = validateCreateNodeData(validData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.statusCode).toBe(HttpStatus.OK);
    });

    it('должен возвращать ошибки для некорректных данных', () => {
      const invalidData: CreateNodeData = {
        label: '',
        modelId: -1,
        metanodeId: 'invalid' as any,
      };

      const result = validateCreateNodeData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('должен работать без metanodeId', () => {
      const validData: CreateNodeData = {
        label: 'Тестовый узел',
        modelId: 1,
      };

      const result = validateCreateNodeData(validData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('должен обрабатывать слишком длинную метку', () => {
      const invalidData: CreateNodeData = {
        label: 'a'.repeat(51),
        modelId: 1,
      };

      const result = validateCreateNodeData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Метка узла должна быть от 1 до 50 символов');
    });
  });
});