import { Controller, Get, Param } from '@nestjs/common';
import { SalaryCalculatorService } from './salary-calculator.service';

@Controller('')
export class SalaryCalculatorController {
  constructor(
    private readonly salaryCalculatorService: SalaryCalculatorService,
  ) {}

  @Get('/salary/:id')
  getSalary(@Param('id') id: string): number | Promise<number> {
    return this.salaryCalculatorService.calculateSalaryById(id);
  }
}
