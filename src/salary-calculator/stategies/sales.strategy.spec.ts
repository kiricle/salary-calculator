import { Test } from '@nestjs/testing';
import { Staff } from '../../staff/entities/staff.entity';
import { StaffService } from '../../staff/staff.service';
import * as utils from '../../utils/getFullYearsWorked';
import { SalaryCalculatorService } from '../salary-calculator.service';
import { SalesSalaryStrategy } from './sales.strategy';

describe('SalesSalaryStrategy', () => {
  let strategy: SalesSalaryStrategy;
  let mockStaffService: jest.Mocked<StaffService>;

  const mockStaff: Staff = {
    id: 'sales-1',
    name: 'Jane Sales',
    type: 'SALES',
    baseSalary: 2000,
    joinedAt: new Date(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SalesSalaryStrategy,
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

    strategy = module.get<SalesSalaryStrategy>(SalesSalaryStrategy);
    mockStaffService = module.get(StaffService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('calculateSalary', () => {
    it('should calculate base salary with experience bonus', async () => {
      jest.spyOn(utils, 'getFullYearsWorked').mockReturnValue(8);
      mockStaffService.getDirectSubordinates.mockResolvedValue([]);

      const result = await strategy.calculateSalary(mockStaff);

      const expectedBonus = 0.01 * 8;
      const expectedSalary = 2000 * (1 + expectedBonus);
      expect(result).toBe(expectedSalary);
    });

    it('should cap experience bonus at 35%', async () => {
      jest.spyOn(utils, 'getFullYearsWorked').mockReturnValue(40);
      mockStaffService.getDirectSubordinates.mockResolvedValue([]);

      const result = await strategy.calculateSalary(mockStaff);

      const expectedSalary = 2000 * 1.35;
      expect(result).toBe(expectedSalary);
    });
  });
});
