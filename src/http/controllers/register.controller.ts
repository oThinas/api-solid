import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository';
import { EmailAlreadyExistsError } from '@/services/errors/email-already-exists.error';
import { RegisterService } from '@/services/register.service';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { email, name, password } = registerBodySchema.parse(request.body);

  try {
    const userRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(userRepository);

    await registerService.execute({ email, name, password });
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
