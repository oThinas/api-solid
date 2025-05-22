import { verifyJWT } from '@/http/middlewares/verify-jwt';
import type { FastifyInstance } from 'fastify';
import { create } from './create.controller';
import { nearby } from './nearby.controller';
import { search } from './search.controller';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/search', search);
  app.get('/nearby', nearby);
  app.post('/', create);
}
