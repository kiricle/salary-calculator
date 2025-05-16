import { Test } from '@nestjs/testing';
import { StaffType } from '../../staff/entities/staff.entity';
import { EmployeeSalaryStrategy } from './employee.strategy';
import { ManagerSalaryStrategy } from './manager.strategy';
import { SalaryStrategyFactory } from './salary-stategy.factory';
import { SalesSalaryStrategy } from './sales.strategy';
jest.mock('./manager.strategy');

describe('SalaryStrategyFactory', () => {
  let factory: SalaryStrategyFactory;

  const mockEmployeeStrategy = { calculateSalary: jest.fn() };
  const mockManagerStrategy = { calculateSalary: jest.fn() };
  const mockSalesStrategy = { calculateSalary: jest.fn() };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: EmployeeSalaryStrategy,
          useValue: mockEmployeeStrategy,
        },
        {
          provide: ManagerSalaryStrategy,
          useValue: mockManagerStrategy,
        },
        {
          provide: SalesSalaryStrategy,
          useValue: mockSalesStrategy,
        },
        SalaryStrategyFactory,
      ],
    }).compile();

    factory = module.get<SalaryStrategyFactory>(SalaryStrategyFactory);
  });

  describe('getStrategy', () => {
    it.each([
      ['EMPLOYEE', mockEmployeeStrategy],
      ['MANAGER', mockManagerStrategy],
      ['SALES', mockSalesStrategy],
    ])(
      'should return correct strategy for %s type',
      (type, expectedStrategy) => {
        const result = factory.getStrategy(type as StaffType);
        expect(result).toBe(expectedStrategy);
      },
    );

    it('should throw error for unknown staff type', () => {
      const unknownType = 'UNKNOWN' as StaffType;

      expect(() => factory.getStrategy(unknownType)).toThrowError(
        'Unknown staff type',
      );
    });
  });
});
