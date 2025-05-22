import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from 'tests/utils/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to search gyms by title', async () => {
    const token = await createAndAuthenticateUser(app);

    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Gym 1',
      description: 'Gym 1 description',
      phone: '1234567890',
      latitude: -23.5287234,
      longitude: -46.660879,
    });
    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Gym 2',
      description: 'Gym 2 description',
      phone: '1234567890',
      latitude: -23.5287234,
      longitude: -46.660879,
    });

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Gym 1',
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body).toEqual({
      data: expect.arrayContaining([
        expect.objectContaining({
          title: 'Gym 1',
        }),
      ]),
    });
  });
});
