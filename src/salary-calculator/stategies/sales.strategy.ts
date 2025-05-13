import { Injectable } from '@nestjs/common';
import { Staff } from 'src/staff/entities/staff.entity';

@Injectable()
export class SalesSalaryStrategy {
  calculateSalary(staff: Staff): number {
    // TODO
    return staff.baseSalary;
  }
}
