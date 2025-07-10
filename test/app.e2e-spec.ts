import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('JobOffersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/api/job-offers (GET)', async () => {
    // const res = await request(app).get('/api/job-offers');
    // expect(res.statusCode).toBe(200);
    // expect(res.body.data).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
