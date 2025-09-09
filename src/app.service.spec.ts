import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('должен быть определен', () => {
    expect(service).toBeDefined();
  });

  describe('getHello', () => {
    it('должен возвращать "Hello World!"', () => {
      const result = service.getHello();
      expect(result).toBe('Hello World!');
    });

    it('должен возвращать строку', () => {
      const result = service.getHello();
      expect(typeof result).toBe('string');
    });

    it('должен возвращать непустую строку', () => {
      const result = service.getHello();
      expect(result.length).toBeGreaterThan(0);
    });

    it('должен всегда возвращать одинаковый результат', () => {
      const result1 = service.getHello();
      const result2 = service.getHello();
      expect(result1).toBe(result2);
    });
  });
});