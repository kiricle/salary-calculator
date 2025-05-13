import { Injectable } from '@nestjs/common';
import { Staff } from 'src/staff/entities/staff.entity';
import { getFullYearsWorked } from 'src/utils/getFullYearsWorked';
import { roundToCents } from 'src/utils/roundToCents';
import { SalaryStrategy } from './salary-strategy.interface';

@Injectable()
export class EmployeeSalaryStrategy implements SalaryStrategy {
  calculateSalary(staff: Staff): number {
    const workedYears = getFullYearsWorked(staff.joinedAt);
    const bonus = Math.min(0.03 * workedYears, 0.3);
    const bonusMultiplier = 1 + bonus;
    const result = staff.baseSalary * bonusMultiplier;
    return roundToCents(result);
  }
}
