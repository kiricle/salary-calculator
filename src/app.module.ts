import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { SalaryCalculatorModule } from './salary-calculator/salary-calculator.module';
import { StaffService } from './staff/staff.service';

@Module({
  imports: [SalaryCalculatorModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, StaffService],
})
export class AppModule {}
