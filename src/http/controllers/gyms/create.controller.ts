import { makeCreateGymService } from '@/services/factories/make-create-gym.service';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
    description: z.string().nullable(),
    phone: z.string().nullable(),
  });
  const data = createGymBodySchema.parse(request.body);

  const createGymService = makeCreateGymService();
  await createGymService.execute(data);

  return reply.status(201).send();
}
