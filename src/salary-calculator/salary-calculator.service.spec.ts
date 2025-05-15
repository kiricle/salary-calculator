import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import { Staff } from 'src/staff/entities/staff.entity';
import { StaffService } from '../staff/staff.service';
import { SalaryCalculatorService } from './salary-calculator.service';
import { SalaryStrategyFactory } from './stategies/salary-stategy.factory';

describe('SalaryCalculatorService', () => {
  let service: SalaryCalculatorService;
  let mockStaffService: jest.Mocked<StaffService>;
  let mockStrategyFactory: jest.Mocked<SalaryStrategyFactory>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalaryCalculatorService,
        {
          provide: SalaryStrategyFactory,
          useValue: {
            getStrategy: jest.fn(),
          },
        },
        {
          provide: StaffService,
          useValue: {
            getStaffById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SalaryCalculatorService>(SalaryCalculatorService);
    mockStaffService = module.get(StaffService);
    mockStrategyFactory = module.get(SalaryStrategyFactory);
  });

  it('should return employee salary', async () => {
    const staff: Staff = {
      id: randomUUID(),
      name: 'John Doe',
      type: 'EMPLOYEE',
      baseSalary: 140,
      joinedAt: new Date('2024-01-01'),
    };
    const calculatedSalary = 147;

    const mockStrategy = {
      calculateSalary: jest.fn().mockReturnValue(calculatedSalary),
    };

    mockStrategyFactory.getStrategy.mockReturnValue(mockStrategy);
    mockStaffService.getStaffById.mockResolvedValue(staff);

    const result = await service.calculateSalaryById(staff.id);
    const spyOnStrategyFactory = jest.spyOn(mockStrategyFactory, 'getStrategy');
    const spyOnStaffService = jest.spyOn(mockStaffService, 'getStaffById');

    expect(spyOnStrategyFactory).toHaveBeenCalledWith(staff.type);
    expect(spyOnStaffService).toHaveBeenCalledWith(staff.id);
    expect(result).toBe(calculatedSalary);
  });
});
