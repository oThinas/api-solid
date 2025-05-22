import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from 'tests/utils/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to list nearby gyms', async () => {
    const token = await createAndAuthenticateUser(app);

    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -23.5287234,
      longitude: -46.660879,
    });
    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -20.7255962,
      longitude: -40.93398,
    });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -23.5287234,
        longitude: -46.660879,
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body).toEqual({
      data: expect.arrayContaining([
        expect.objectContaining({
          title: 'Near Gym',
        }),
      ]),
    });
  });
});
