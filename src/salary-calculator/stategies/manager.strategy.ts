import { Staff } from 'src/staff/entities/staff.entity';
import { StaffService } from 'src/staff/staff.service';
import { getFullYearsWorked } from 'src/utils/getFullYearsWorked';
import { roundToCents } from 'src/utils/roundToCents';
import { SalaryCalculatorService } from '../salary-calculator.service';

export class ManagerSalaryStrategy {
  constructor(
    private readonly staffService: StaffService,
    private readonly salaryCalculatorService: SalaryCalculatorService,
  ) {}

  async calculateSalary(staff: Staff): Promise<number> {
    const yearsWorked = getFullYearsWorked(staff.joinedAt);
    const bonus = Math.min(0.05 * yearsWorked, 0.4);
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
      staff.baseSalary * experienceMultiplier + subordinateBonus,
    );
  }
}
