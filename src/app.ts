import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { checkInsRoutes, gymsRoutes, usersRoutes } from './http/controllers/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: '10m' },
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
});
app.register(fastifyCookie);

app.register(usersRoutes);
app.register(gymsRoutes, { prefix: 'gyms' });
app.register(checkInsRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', format: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO: log to external tool e.g. Sentry, DataDog, etc.
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});
