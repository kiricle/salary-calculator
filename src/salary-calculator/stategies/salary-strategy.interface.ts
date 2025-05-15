import { Staff } from 'src/staff/entities/staff.entity';

export interface SalaryStrategy {
  calculateSalary(staff: Staff): number | Promise<number>;
}
