import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';
import { PrismaService } from '@dbservice/prisma.service';
import { PatientRepository } from './repositories/mysql/patient.repository';
import { PatientFactory } from '@database/factories/patient.factory';

describe('PatientService', () => {
  let service: PatientService;
  let prisma: PrismaService;
  let patientRepository: PatientRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService, PrismaService, PatientRepository],
    }).compile();

    service = module.get<PatientService>(PatientService);
    prisma = module.get<PrismaService>(PrismaService);
    patientRepository = module.get<PatientRepository>(PatientRepository);
  });

  beforeEach(async () => {
    await prisma.cleanDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
    expect(patientRepository).toBeDefined();
  });

  it('should create a patient', async () => {
    const createdPatient = await service.createPatient({
      name: 'John Doe',
    });
    expect(createdPatient).toHaveProperty('id');
    expect(createdPatient.name).toBe('John Doe');

    const foundPatient = await prisma.patient.findUnique({
      where: { id: createdPatient.id },
    });

    expect(foundPatient).toBeDefined();
    expect(foundPatient.name).toBe(createdPatient.name); 
  })

  it('should get a patient by id', async () => {
    const patient = await PatientFactory.create();
    const foundPatient = await service.getPatient(patient.id);
    expect(foundPatient).toBeDefined();
    expect(foundPatient.id).toBe(patient.id);
  })

  it('should update a patient', async () => {
    const patient = await PatientFactory.create();
    const updateName = 'Jane Doe';
    const updatedPatient = await service.updatePatient({
      id: patient.id,
      name: updateName,
    });
    expect(updatedPatient).toBeDefined();
    expect(updatedPatient.name).toBe(updateName);
  })
});
