import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import request from 'supertest';
import { PatientFactory } from '@database/factories/patient.factory';
import { PrismaService } from '@dbservice/prisma.service';
import { CreateAppointmentDto } from '@appointment/dtos/create.dto';
import { AppModule } from '@/app.module';
import { RedisMemory } from '@jeloulatam/memory';
import { DeepMocked, createMock } from "@golevelup/ts-jest";

describe('AppointmentController (e2e)', () => {
  let app: INestApplication;
  let redisMemoryMock: DeepMocked<RedisMemory>;

  beforeEach(async () => {
    redisMemoryMock = createMock<RedisMemory>();
    const prisma = new PrismaService();
    prisma.$queryRaw`delete from appointments;`;
    prisma.$queryRaw`delete from patient;`;
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

  it('can create an appointment', async () => {
    const patient = await PatientFactory.create();
    const createAppointmentDto: CreateAppointmentDto = {
      startTime: new Date("2025-01-30T00:00:00.000Z"),
      endTime: new Date("2025-01-30T16:30:00.000Z"),
      confirmed: true,
      patientId: patient.id,
    };
    const response = await request(app.getHttpServer())
      .post(`/api/v1/patients/${patient.id}/appointments`)
      .send(createAppointmentDto)
      .expect(201);
    expect(response.body).toBeDefined();
    // expect(response.body.id).toBeDefined();
    // expect(response.body.name).toBe(createPatientDto.name);
  });
});
