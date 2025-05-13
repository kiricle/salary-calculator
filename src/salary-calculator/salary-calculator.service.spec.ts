import { Test, TestingModule } from '@nestjs/testing';
import { SalaryCalculatorService } from './salary-calculator.service';

describe('SalaryCalculatorService', () => {
  let service: SalaryCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaryCalculatorService],
    }).compile();

    service = module.get<SalaryCalculatorService>(SalaryCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
