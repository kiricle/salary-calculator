import { Module } from '@nestjs/common';
import { SalaryCalculatorService } from './salary-calculator.service';
import { SalaryCalculatorController } from './salary-calculator.controller';

@Module({
  controllers: [SalaryCalculatorController],
  providers: [SalaryCalculatorService],
})
export class SalaryCalculatorModule {}
