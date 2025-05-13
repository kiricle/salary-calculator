export interface Staff {
  id: string;
  name: string;
  type: StaffType;
  baseSalary: number;
  joinedAt: Date;
}

export type StaffType = 'SALES' | 'MANAGER' | 'EMPLOYEE';
