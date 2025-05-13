import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Staff } from './entities/staff.entity';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async getDirectSubordinates(staffId: string): Promise<Staff[]> {
    const subordinates = await this.prisma.staff.findMany({
      where: {
        supervisorId: staffId,
      },
    });

    return subordinates;
  }
}
