import { Staff } from '../../staff/entities/staff.entity';

export interface SalaryStrategy {
  calculateSalary(staff: Staff): number | Promise<number>;
}
