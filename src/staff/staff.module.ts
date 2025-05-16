import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StaffService } from './staff.service';

@Module({
  providers: [StaffService, PrismaService],
  exports: [StaffService],
})
export class StaffModule {}
