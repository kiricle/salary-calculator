import { Test, TestingModule } from '@nestjs/testing';
import { StaffService } from '../staff/staff.service';
import { SalaryCalculatorService } from './salary-calculator.service';
import { EmployeeSalaryStrategy } from './stategies/employee.strategy';
import { ManagerSalaryStrategy } from './stategies/manager.strategy';
import { SalaryStrategyFactory } from './stategies/salary-stategy.factory';
import { SalesSalaryStrategy } from './stategies/sales.strategy';
import { PrismaService } from '../prisma.service';

describe('SalaryCalculatorService', () => {
  let service: SalaryCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalaryCalculatorService,
        SalaryStrategyFactory,
        StaffService,
        EmployeeSalaryStrategy,
        SalesSalaryStrategy,
        ManagerSalaryStrategy,
        PrismaService,
      ],
    }).compile();

    service = module.get<SalaryCalculatorService>(SalaryCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
