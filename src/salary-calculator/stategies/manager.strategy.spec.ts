import { Test } from '@nestjs/testing';
import { Staff } from '../../staff/entities/staff.entity';
import { StaffService } from '../../staff/staff.service';
import * as utils from '../../utils/getFullYearsWorked';
import { SalaryCalculatorService } from '../salary-calculator.service';
import { ManagerSalaryStrategy } from './manager.strategy';

describe('ManagerSalaryStrategy', () => {
  let strategy: ManagerSalaryStrategy;
  let mockStaffService: jest.Mocked<StaffService>;
  let mockCalculatorService: jest.Mocked<SalaryCalculatorService>;

  const mockStaff: Staff = {
    id: 'manager-1',
    name: 'John Manager',
    type: 'MANAGER',
    baseSalary: 1000,
    joinedAt: new Date('2018-01-01'),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ManagerSalaryStrategy,
        {
          provide: StaffService,
          useValue: {
            getDirectSubordinates: jest.fn(),
          },
        },
        {
          provide: SalaryCalculatorService,
          useValue: {
            calculateSalary: jest.fn(),
          },
        },
      ],
    }).compile();

    strategy = module.get<ManagerSalaryStrategy>(ManagerSalaryStrategy);
    mockStaffService = module.get(StaffService);
    mockCalculatorService = module.get(SalaryCalculatorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('calculateSalary', () => {
    it('should calculate base salary with experience bonus', async () => {
      jest.spyOn(utils, 'getFullYearsWorked').mockReturnValue(5);
      mockStaffService.getDirectSubordinates.mockResolvedValue([]);

      const result = await strategy.calculateSalary(mockStaff);

      const expectedBonus = 0.05 * 5;
      const expectedSalary = 1000 * (1 + expectedBonus);
      expect(result).toBe(expectedSalary);
    });

    it('should cap experience bonus at 40%', async () => {
      jest.spyOn(utils, 'getFullYearsWorked').mockReturnValue(10);
      mockStaffService.getDirectSubordinates.mockResolvedValue([]);

      const result = await strategy.calculateSalary(mockStaff);

      const expectedSalary = 1000 * 1.4;
      expect(result).toBe(expectedSalary);
    });

    it('should add subordinates bonus', async () => {
      jest.spyOn(utils, 'getFullYearsWorked').mockReturnValue(0);
      const subordinates: Staff[] = [
        { id: 'subordinate 1', baseSalary: 1000 } as Staff,
        { id: 'subordinate 2', baseSalary: 2000 } as Staff,
      ];

      mockStaffService.getDirectSubordinates.mockResolvedValue(subordinates);
      mockCalculatorService.calculateSalary
        .mockResolvedValueOnce(1000)
        .mockResolvedValueOnce(2000);

      const result = await strategy.calculateSalary(mockStaff);

      const subordinateBonus = (1000 + 2000) * 0.05;
      const expectedSalary = 1000 + subordinateBonus;
      expect(result).toBe(expectedSalary);
    });
  });
});
