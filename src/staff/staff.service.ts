import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Staff } from './entities/staff.entity';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async getDirectSubordinates(staffId: string): Promise<Staff[]> {
    const subordinates = await this.prisma.staff.findMany({
      where: {
        supervisorId: staffId,
      },
      include: {
        subordinates: true,
      },
    });

    return subordinates;
  }

  async getStaffById(staffId: string): Promise<Staff | null> {
    const staff = await this.prisma.staff.findUnique({
      where: {
        id: staffId,
      },
    });

    return staff;
  }

  async getAllStaff(): Promise<Staff[]> {
    const allStaff = await this.prisma.staff.findMany();

    return allStaff;
  }
}
