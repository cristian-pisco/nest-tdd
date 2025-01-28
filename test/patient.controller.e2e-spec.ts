import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import request from 'supertest';
import { CreatePatientDto } from '@patient/dtos';
import { PrismaService } from '@dbservice/prisma.service';
import { AppModule } from '@/app.module';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { RedisMemory } from '@jeloulatam/memory';

describe('PatientController (e2e)', () => {
  let app: INestApplication;
  let redisMemoryMock: DeepMocked<RedisMemory>;

  beforeEach(async () => {
    redisMemoryMock = createMock<RedisMemory>();
    const prisma = new PrismaService();
    prisma.$queryRaw`delete from appointments;`;
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider("MEMORY")
      .useValue(redisMemoryMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.enableVersioning({
      type: VersioningType.URI,
    });
    await app.init();
  });

  it('can create a patient', async () => {
    const createPatientDto: CreatePatientDto = {
      name: "Cristian Pisco"
    };
    const response = await request(app.getHttpServer())
      .post('/api/v1/patients')
      .send(createPatientDto)
      .expect(201);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(createPatientDto.name);
  });
});
