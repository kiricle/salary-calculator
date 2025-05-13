import { Controller } from '@nestjs/common';
import { SalaryCalculatorService } from './salary-calculator.service';

@Controller('salary-calculator')
export class SalaryCalculatorController {
  constructor(
    private readonly salaryCalculatorService: SalaryCalculatorService,
  ) {}
}
