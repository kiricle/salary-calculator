import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Staff } from 'src/staff/entities/staff.entity';
import { StaffService } from 'src/staff/staff.service';
import { getFullYearsWorked } from 'src/utils/getFullYearsWorked';
import { roundToCents } from 'src/utils/roundToCents';
import { SalaryCalculatorService } from '../salary-calculator.service';

@Injectable()
export class SalesSalaryStrategy {
  private readonly SUBORDINATES_BONUS = 0.03;
  private readonly MAX_EXPERIENCE_BONUS = 0.35;
  private readonly EXPERIENCE_BONUS_PER_YEAR = 0.01;

  constructor(
    private readonly staffService: StaffService,
    @Inject(forwardRef(() => SalaryCalculatorService))
    private readonly salaryCalculatorService: SalaryCalculatorService,
  ) {}

  async calculateSalary(staff: Staff): Promise<number> {
    const workedYears = getFullYearsWorked(staff.joinedAt);
    const experienceBonus = Math.min(
      this.EXPERIENCE_BONUS_PER_YEAR * workedYears,
      this.MAX_EXPERIENCE_BONUS,
    );
    const bonusMultiplier = 1 + experienceBonus;
    const subordinatesSalarySum = await this.calculateAllSubordinatesSalaries(
      staff.id,
    );
    return roundToCents(
      staff.baseSalary * bonusMultiplier + subordinatesSalarySum,
    );
  }

  private async calculateAllSubordinatesSalaries(
    staffId: string,
  ): Promise<number> {
    const queue = await this.staffService.getDirectSubordinates(staffId);
    let totalBonus = 0;

    while (queue.length > 0) {
      const currentStaff = queue.shift();
      if (!currentStaff) continue;

      const salary =
        await this.salaryCalculatorService.calculateSalary(currentStaff);
      totalBonus += salary * this.SUBORDINATES_BONUS;

      if (!currentStaff.subordinates?.length) {
        const subordinates = await this.staffService.getDirectSubordinates(
          currentStaff.id,
        );
        currentStaff.subordinates = subordinates;
      }

      if (currentStaff.subordinates?.length) {
        queue.push(...currentStaff.subordinates);
      }
    }

    return totalBonus;
  }
}
