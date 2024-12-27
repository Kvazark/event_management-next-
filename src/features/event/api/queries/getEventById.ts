import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const GetEventById = z.object({
	id: z.string(),
});

export default resolver.pipe(resolver.zod(GetEventById), async ({ id }) => {
	const event = await db.event.findUnique({
		where: { id },
		include: {
			format: true,
			categories: true,
			authors: true,
			participants: true,
			createdBy: true,
		},
	});

	if (!event) {
		throw new Error('Событие не найдено');
	}

	return event;
});
