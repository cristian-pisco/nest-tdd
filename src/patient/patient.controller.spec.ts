import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { PrismaService } from '@dbservice/prisma.service';
import { PatientRepository } from './repositories/mysql/patient.repository';

describe('PatientController', () => {
  let patientController: PatientController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [PatientService, PrismaService, PatientRepository],
    }).compile();

    patientController = app.get<PatientController>(PatientController);
  });

  it('should be defined', () => {
    expect(patientController).toBeDefined();
  });
});
