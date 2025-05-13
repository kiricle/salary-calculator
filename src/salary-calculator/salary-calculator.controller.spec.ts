import { Test, TestingModule } from '@nestjs/testing';
import { SalaryCalculatorController } from './salary-calculator.controller';
import { SalaryCalculatorService } from './salary-calculator.service';

describe('SalaryCalculatorController', () => {
  let controller: SalaryCalculatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryCalculatorController],
      providers: [SalaryCalculatorService],
    }).compile();

    controller = module.get<SalaryCalculatorController>(
      SalaryCalculatorController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
