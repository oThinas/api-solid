import { appRoutes } from '@/http/routes';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';

export const app = fastify();

app.register(appRoutes);
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
