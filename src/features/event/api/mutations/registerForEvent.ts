import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';
import { AuthenticationError } from 'blitz';

const RegisterForEvent = z.object({
	eventId: z.string(),
});

export default resolver.pipe(
	resolver.zod(RegisterForEvent),
	resolver.authorize(),
	async ({ eventId }, ctx) => {
		const userId = ctx.session.userId;
		const userRole = ctx.session.role;

		if (!userId) throw new AuthenticationError();
		if (userRole !== 'CLIENT')
			throw new Error('Only clients can register for events');

		const existingRegistration = await db.event.findFirst({
			where: {
				id: eventId,
				participants: {
					some: {
						id: userId,
					},
				},
			},
		});

		if (existingRegistration) {
			throw new Error('User is already registered for this event');
		}

		const updatedEvent = await db.event.update({
			where: { id: eventId },
			data: {
				participants: {
					connect: { id: userId },
				},
			},
			include: {
				participants: true,
			},
		});

		return updatedEvent;
	}
);
