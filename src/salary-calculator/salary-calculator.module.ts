import { Module } from '@nestjs/common';
import { SalaryCalculatorController } from './salary-calculator.controller';
import { SalaryCalculatorService } from './salary-calculator.service';
import { EmployeeSalaryStrategy } from './stategies/employee.strategy';
import { ManagerSalaryStrategy } from './stategies/manager.strategy';
import { SalaryStrategyFactory } from './stategies/salary-stategy.factory';
import { SalesSalaryStrategy } from './stategies/sales.strategy';

@Module({
  controllers: [SalaryCalculatorController],
  providers: [
    SalaryCalculatorService,
    SalaryStrategyFactory,
    SalesSalaryStrategy,
    ManagerSalaryStrategy,
    EmployeeSalaryStrategy,
  ],
})
export class SalaryCalculatorModule {}
