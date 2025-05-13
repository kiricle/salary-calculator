import { Staff } from 'src/staff/entities/staff.entity';

export class ManagerSalaryStrategy {
  calculateSalary(staff: Staff): number {
    // TODO
    return staff.baseSalary;
  }
}
