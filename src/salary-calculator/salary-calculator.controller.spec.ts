import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { SalaryCalculatorController } from './salary-calculator.controller';
import { SalaryCalculatorService } from './salary-calculator.service';

describe('SalaryCalculatorController', () => {
  let controller: SalaryCalculatorController;
  let service: SalaryCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryCalculatorController],
      providers: [
        {
          provide: SalaryCalculatorService,
          useValue: {
            calculate: jest.fn(),
            calculateSalaryById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SalaryCalculatorController>(
      SalaryCalculatorController,
    );

    service = module.get<SalaryCalculatorService>(SalaryCalculatorService);
  });

  it('should return salary from the service', async () => {
    const staffId = randomUUID();
    const expectedSalary = 140;

    const spyOnService = jest
      .spyOn(service, 'calculateSalaryById')
      .mockResolvedValue(expectedSalary);

    const result = await controller.getSalary(staffId);

    expect(spyOnService).toHaveBeenCalledWith(staffId);
    expect(result).toBe(expectedSalary);
  });

  it('should return error if staff does not exist', async () => {
    const staffId = randomUUID();
    const expectedError = new BadRequestException('Staff not found');

    const spyOnService = jest
      .spyOn(service, 'calculateSalaryById')
      .mockRejectedValue(expectedError);

    await expect(() => controller.getSalary(staffId)).rejects.toThrow(
      expectedError,
    );
    expect(spyOnService).toHaveBeenCalledWith(staffId);
  });
});
