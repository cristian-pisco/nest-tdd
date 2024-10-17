import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';
import { PrismaService } from '@dbservice/prisma.service';

describe('PatientService', () => {
  let service: PatientService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService, PrismaService],
    }).compile();

    service = module.get<PatientService>(PatientService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    await prisma.cleanDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should create a patient', async () => {
    const patient = await service.createPatient('John Doe');
    expect(patient).toHaveProperty('id');
    expect(patient.name).toBe('John Doe');
  })
});
