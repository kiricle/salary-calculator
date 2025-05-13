import { Injectable, NotFoundException } from '@nestjs/common';
import { Staff } from 'src/staff/entities/staff.entity';
import { StaffService } from 'src/staff/staff.service';
import { SalaryStrategyFactory } from './stategies/salary-stategy.factory';

@Injectable()
export class SalaryCalculatorService {
  constructor(
    private readonly salaryStrategyFactory: SalaryStrategyFactory,
    private readonly staffService: StaffService,
  ) {}

  calculateSalary(staff: Staff) {
    const strategy = this.salaryStrategyFactory.getStrategy(staff.type);
    staff.joinedAt = new Date(staff.joinedAt);
    return strategy.calculateSalary(staff);
  }

  async calculateSalaryById(staffId: string) {
    const staff = await this.staffService.getStaffById(staffId);
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }

    const strategy = this.salaryStrategyFactory.getStrategy(staff.type);
    staff.joinedAt = new Date(staff.joinedAt);
    return strategy.calculateSalary(staff);
  }
}
