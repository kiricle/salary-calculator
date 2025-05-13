import { Body, Controller, Post } from '@nestjs/common';
import { Staff } from 'src/staff/entities/staff.entity';
import { SalaryCalculatorService } from './salary-calculator.service';

@Controller('')
export class SalaryCalculatorController {
  constructor(
    private readonly salaryCalculatorService: SalaryCalculatorService,
  ) {}

  @Post('/salary')
  getSalary(@Body() staff: Staff): number | Promise<number> {
    return this.salaryCalculatorService.calculateSalary(staff);
  }
}
