import { Staff } from '../../staff/entities/staff.entity';
import * as utils from '../../utils/getFullYearsWorked';
import { EmployeeSalaryStrategy } from './employee.strategy';

describe('EmployeeSalaryStrategy', () => {
  let strategy: EmployeeSalaryStrategy;

  beforeEach(() => {
    strategy = new EmployeeSalaryStrategy();
  });

  it('should calculate salary with no experience bonus', () => {
    jest.spyOn(utils, 'getFullYearsWorked').mockReturnValue(0);

    const staff: Staff = {
      id: '1',
      name: 'John Doe',
      baseSalary: 1000,
      type: 'EMPLOYEE',
      joinedAt: new Date(),
    };

    const result = strategy.calculateSalary(staff);
    expect(result).toBe(1000);
  });

  it('should apply experience bonus correctly for 5 years', () => {
    jest.spyOn(utils, 'getFullYearsWorked').mockReturnValue(5);

    const staff: Staff = {
      id: '2',
      name: 'John Doe',
      baseSalary: 1000,
      type: 'EMPLOYEE',
      joinedAt: new Date(),
    };

    const result = strategy.calculateSalary(staff);
    expect(result).toEqual(1150);
  });

  it('should cap experience bonus at 0.3 (for >10 years)', () => {
    jest.spyOn(utils, 'getFullYearsWorked').mockReturnValue(20);

    const staff: Staff = {
      id: '3',
      name: 'John Doe',
      baseSalary: 1000,
      type: 'EMPLOYEE',
      joinedAt: new Date(),
    };

    const result = strategy.calculateSalary(staff);
    expect(result).toEqual(1300);
  });
});
