import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Staff } from '../../staff/entities/staff.entity';
import { StaffService } from '../../staff/staff.service';
import { getFullYearsWorked } from '../../utils/getFullYearsWorked';
import { roundToCents } from '../../utils/roundToCents';
import { SalaryCalculatorService } from '../salary-calculator.service';

@Injectable()
export class ManagerSalaryStrategy {
  private readonly MAX_EXPERIENCE_BONUS = 0.4;
  private readonly EXPERIENCE_BONUS_PER_YEAR = 0.05;
  private readonly SUBORDINATES_BONUS = 0.05;

  constructor(
    private readonly staffService: StaffService,
    @Inject(forwardRef(() => SalaryCalculatorService))
    private readonly salaryCalculatorService: SalaryCalculatorService,
  ) {}

  async calculateSalary(staff: Staff): Promise<number> {
    const yearsWorked = getFullYearsWorked(staff.joinedAt);
    const bonus = Math.min(
      this.EXPERIENCE_BONUS_PER_YEAR * yearsWorked,
      this.MAX_EXPERIENCE_BONUS,
    );
    const experienceMultiplier = 1 + bonus;

    const subordinates = await this.staffService.getDirectSubordinates(
      staff.id,
    );

    const subordinatesSalaries = await Promise.all(
      subordinates.map((subordinate) =>
        this.salaryCalculatorService.calculateSalary(subordinate),
      ),
    );

    const subordinateBonus = subordinatesSalaries.reduce(
      (acc, salary) => acc + salary,
      0,
    );

    return roundToCents(
      staff.baseSalary * experienceMultiplier +
        subordinateBonus * this.SUBORDINATES_BONUS,
    );
  }
}
