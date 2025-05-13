import { Injectable } from '@nestjs/common';
import { Staff } from 'src/staff/entities/staff.entity';
import { SalaryStrategyFactory } from './stategies/salary-stategy.factory';

@Injectable()
export class SalaryCalculatorService {
  constructor(private readonly salaryStrategyFactory: SalaryStrategyFactory) {}

  getSalary(staff: Staff) {
    const strategy = this.salaryStrategyFactory.getStrategy(staff.type);
    staff.joinedAt = new Date(staff.joinedAt);
    return strategy.calculateSalary(staff);
  }
}
