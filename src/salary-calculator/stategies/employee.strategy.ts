import { Injectable } from '@nestjs/common';
import { Staff } from 'src/staff/entities/staff.entity';
import { getFullYearsWorked } from 'src/utils/getFullYearsWorked';
import { roundToCents } from 'src/utils/roundToCents';
import { SalaryStrategy } from './salary-strategy.interface';

@Injectable()
export class EmployeeSalaryStrategy implements SalaryStrategy {
  private readonly MAX_EXPERIENCE_BONUS = 0.3;
  private readonly EXPERIENCE_BONUS_PER_YEAR = 0.03;

  calculateSalary(staff: Staff): number {
    const workedYears = getFullYearsWorked(staff.joinedAt);
    const experienceBonus = Math.min(
      this.EXPERIENCE_BONUS_PER_YEAR * workedYears,
      this.MAX_EXPERIENCE_BONUS,
    );
    const bonusMultiplier = 1 + experienceBonus;
    const result = staff.baseSalary * bonusMultiplier;
    return roundToCents(result);
  }
}
