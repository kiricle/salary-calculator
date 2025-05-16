import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StaffModule } from 'src/staff/staff.module';
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
    PrismaService,
  ],
  exports: [],
  imports: [forwardRef(() => SalaryCalculatorModule), StaffModule],
})
export class SalaryCalculatorModule {}
