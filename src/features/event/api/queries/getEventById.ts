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
			createdBy: {
				select: {
					id: true,
					email: true,
					firstName: true,
					lastName: true,
					patronymic: true,
				},
			},
		},
	});

	if (!event) {
		throw new Error('Событие не найдено');
	}

	let updatedByUser = null;
	if (event.updatedBy) {
		updatedByUser = await db.user.findUnique({
			where: { id: event.updatedBy },
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				patronymic: true,
			},
		});
	}

	return {
		...event,
		updatedByUser,
	};
});
