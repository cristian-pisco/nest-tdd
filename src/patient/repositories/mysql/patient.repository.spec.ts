import { Test, TestingModule } from '@nestjs/testing';
import { PatientRepository } from "./patient.repository";
import { PrismaService } from '@dbservice/prisma.service';
import { PatientFactory } from '@database/factories/patient.factory';

describe('PatientRepository', () => {
  let patientRepository: PatientRepository;
  let prisma: PrismaService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, PatientRepository],
    }).compile();
    prisma = module.get<PrismaService>(PrismaService);
    patientRepository = module.get<PatientRepository>(PatientRepository);

    await prisma.cleanDatabase();
  });
  
  beforeEach(async () => {
    await prisma.cleanDatabase();
  });

  afterEach(async () => {
    await prisma.cleanDatabase();
  });
  
  it('should be defined', () => {
    expect(prisma).toBeDefined();
    expect(patientRepository).toBeDefined();
  });
  
  it('should create a patient', async () => {
    const name = 'John Doe';
    const createdPatient = await patientRepository.create({
      name,
    });

    expect(createdPatient).toHaveProperty('id');
    expect(createdPatient.name).toBe(name);

    const foundPatient = await prisma.patient.findUnique({
      where: { id: createdPatient.id },
    });

    expect(foundPatient).toBeDefined();
    expect(foundPatient.name).toBe(createdPatient.name); 
  })
  
  it('should get a patient by id', async () => {
    const patient = await PatientFactory.create();
    const foundPatient = await patientRepository.getById(patient.id);
    expect(foundPatient).toBeDefined();
    expect(foundPatient.id).toBe(patient.id);
  })
  
  it('should update a patient', async () => {
    const patient = await PatientFactory.create();
    const updateName = 'Jane Sommerfield';
    const updatedPatient = await patientRepository.update({
      id: patient.id,
      name: updateName,
    });
    expect(updatedPatient).toBeDefined();
    expect(updatedPatient.name).toBe(updateName);
  })

  it('should delete a patient', async () => {
    const patient = await PatientFactory.create();
    await patientRepository.delete({
      id: patient.id,
    });
    const patientShouldBeDeleted = await prisma.patient.findUnique({
      where: { id: patient.id },
    });
    expect(patientShouldBeDeleted).toBeNull();
  })
});
