import type { FastifyInstance } from 'fastify';
import { authenticate, profile, register } from './controllers';
import { verifyJWT } from './middlewares/verify-jwt';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/session', authenticate);

  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
