import { Injectable, NotFoundException } from '@nestjs/common';
import { Staff } from '../staff/entities/staff.entity';
import { StaffService } from '../staff/staff.service';
import { SalaryStrategyFactory } from './stategies/salary-stategy.factory';

@Injectable()
export class SalaryCalculatorService {
  constructor(
    private readonly salaryStrategyFactory: SalaryStrategyFactory,
    private readonly staffService: StaffService,
  ) {}

  calculateSalary(staff: Staff) {
    const strategy = this.salaryStrategyFactory.getStrategy(staff.type);
    return strategy.calculateSalary(staff);
  }

  async calculateSalaryById(staffId: string) {
    const staff = await this.staffService.getStaffById(staffId);
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }

    return this.calculateSalary(staff);
  }

  async calculateSumAllSalaries() {
    const allStaff = await this.staffService.getAllStaff();

    const promises: Array<Promise<number> | number> = [];

    for (const staff of allStaff) {
      promises.push(this.calculateSalary(staff));
    }

    const salaries = await Promise.all(promises);

    return salaries.reduce((sum, salary) => sum + salary, 0);
  }
}
