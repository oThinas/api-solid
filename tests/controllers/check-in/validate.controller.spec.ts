import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import request from 'supertest';
import { createAndAuthenticateUser } from 'tests/utils/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Validate Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to validate a check-in', async () => {
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

    let checkIn = await prisma.checkIn.create({
      data: {
        user_id: user.id,
        gym_id: gym.id,
      },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);

    checkIn = await prisma.checkIn.findUniqueOrThrow({ where: { id: checkIn.id } });
    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
