import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from 'tests/utils/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a gym', async () => {
    const token = await createAndAuthenticateUser(app);
    const response = await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Gym 1',
      description: 'Gym 1 description',
      phone: '1234567890',
      latitude: -23.5287234,
      longitude: -46.660879,
    });

    expect(response.statusCode).toEqual(201);
  });
});
