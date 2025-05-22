import { InvalidCredentialsError } from '@/services/errors/invalid-credentials.error';
import { makeAuthenticateService } from '@/services/factories/make-authenticate.service';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateService = makeAuthenticateService();
    const user = await authenticateService.execute({ email, password });

    const token = await reply.jwtSign({ role: user.role }, { sign: { sub: user.id } });
    const refreshToken = await reply.jwtSign({ role: user.role }, { sign: { sub: user.id, expiresIn: '7d' } });

    reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message });
    }

    throw error;
  }
}
