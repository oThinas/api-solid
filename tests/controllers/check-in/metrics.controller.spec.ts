import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import request from 'supertest';
import { createAndAuthenticateUser } from 'tests/utils/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Check-in Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get the total count of check-ins', async () => {
    const token = await createAndAuthenticateUser(app);
    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: 'Gym 1',
        description: 'Gym 1 description',
        phone: '1234567890',
        latitude: -23.5287234,
        longitude: -46.660879,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    });

    const response = await request(app.server).get('/check-ins/metrics').set('Authorization', `Bearer ${token}`).send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ data: 2 });
  });
});
