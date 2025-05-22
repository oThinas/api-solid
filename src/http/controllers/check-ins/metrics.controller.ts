import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics.service';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsService = makeGetUserMetricsService();
  const checkInsCount = await getUserMetricsService.execute(request.user.sub);

  return reply.status(200).send({ data: checkInsCount });
}
