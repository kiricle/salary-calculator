import { Injectable } from '@nestjs/common';
import { StaffType } from '../../staff/entities/staff.entity';
import { EmployeeSalaryStrategy } from './employee.strategy';
import { ManagerSalaryStrategy } from './manager.strategy';
import { SalaryStrategy } from './salary-strategy.interface';
import { SalesSalaryStrategy } from './sales.strategy';

@Injectable()
export class SalaryStrategyFactory {
  constructor(
    private employeeStrategy: EmployeeSalaryStrategy,
    private managerStrategy: ManagerSalaryStrategy,
    private salesStrategy: SalesSalaryStrategy,
  ) {}

  getStrategy(type: StaffType): SalaryStrategy {
    switch (type) {
      case 'EMPLOYEE':
        return this.employeeStrategy;
      case 'MANAGER':
        return this.managerStrategy;
      case 'SALES':
        return this.salesStrategy;
      default:
        throw new Error('Unknown staff type');
    }
  }
}
