import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';
import { PrismaService } from '@dbservice/prisma.service';
import { PatientRepository } from './repositories/mysql/patient.repository';
import { PatientFactory } from '@database/factories/patient.factory';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('PatientService', () => {
  let service: PatientService;
  let prisma: PrismaService;
  let patientRepository: PatientRepository;
  let httpService: HttpService;
  let mockHttpService;

  beforeAll(async () => {
    mockHttpService = {
      get: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService, PrismaService, PatientRepository, {
        provide: HttpService,
        useValue: mockHttpService,
      }],
    }).compile();

    service = module.get<PatientService>(PatientService);
    prisma = module.get<PrismaService>(PrismaService);
    patientRepository = module.get<PatientRepository>(PatientRepository);
    httpService = module.get<HttpService>(HttpService);

    await prisma.cleanDatabase();
  });

  beforeEach(async () => {
    await prisma.cleanDatabase();
  });

  afterEach(async () => {
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
    const updateName = 'Jane Sommerfield';
    const updatedPatient = await service.updatePatient({
      id: patient.id,
      name: updateName,
    });
    expect(updatedPatient).toBeDefined();
    expect(updatedPatient.name).toBe(updateName);
  })
  it('should delete a patient', async () => {
    const patient = await PatientFactory.create();
    await service.deletePatient({
      id: patient.id,
    });
    const patientShouldBeDeleted = await prisma.patient.findUnique({
      where: { id: patient.id },
    });
    expect(patientShouldBeDeleted).toBeNull();
  })
  it('should fetch data from external service', async () => {
    const mockResponse = {
      data: { message: 'success' },
    };

    // jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));
    mockHttpService.get.mockReturnValue(of(mockResponse)); 

    const result = await service.callPublicApi('https://rickandmortyapi.com/api/character/1');

    expect(mockHttpService.get).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
    expect(result).toEqual(mockResponse.data);
  });
});
