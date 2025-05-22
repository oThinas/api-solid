import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import request from 'supertest';
import { createAndAuthenticateUser } from 'tests/utils/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a check-in', async () => {
    const token = await createAndAuthenticateUser(app);
    const gym = await prisma.gym.create({
      data: {
        title: 'Gym 1',
        description: 'Gym 1 description',
        phone: '1234567890',
        latitude: -23.5287234,
        longitude: -46.660879,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.5287234,
        longitude: -46.660879,
      });

    expect(response.statusCode).toEqual(201);
  });
});
