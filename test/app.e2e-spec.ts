import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { RedisMemory } from '@jeloulatam/memory';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let redisMemoryMock: DeepMocked<RedisMemory>;

  beforeEach(async () => {
    redisMemoryMock = createMock<RedisMemory>();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider("MEMORY")
      .useValue(redisMemoryMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
