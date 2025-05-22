import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile.service';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileService();
  const user = await getUserProfile.execute(request.user.sub);
  return reply.status(200).send({ data: { user: { ...user, password_hash: undefined } } });
}
