export interface Staff {
  id: string;
  name: string;
  type: StaffType;
  baseSalary: number;
  joinedAt: Date;

  subordinates?: Staff[];
  supervisor?: Staff;
}

export type StaffType = 'SALES' | 'MANAGER' | 'EMPLOYEE';
