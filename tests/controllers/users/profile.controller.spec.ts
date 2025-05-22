import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from 'tests/utils/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get user profile', async () => {
    const token = await createAndAuthenticateUser(app);
    const profileResponse = await request(app.server).get('/me').set('Authorization', `Bearer ${token}`).send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body).toEqual({
      data: {
        user: expect.objectContaining({
          email: 'johndoe@example.com',
        }),
      },
    });
  });
});
