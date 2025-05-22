import { makeCheckInService } from '@/services/factories/make-check-in.service';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });
  const { gymId } = createCheckInParamsSchema.parse(request.params);

  const createCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  });
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  const checkInService = makeCheckInService();
  await checkInService.execute({ gymId, userLatitude: latitude, userLongitude: longitude, userId: request.user.sub });

  return reply.status(201).send();
}
