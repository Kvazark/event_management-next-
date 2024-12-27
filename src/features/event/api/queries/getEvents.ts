import { resolver } from '@blitzjs/rpc';
import db from 'db';

export default resolver.pipe(async () => {
	const events = await db.event.findMany({
		include: {
			format: true,
			categories: true,
			createdBy: true,
			authors: true,
			participants: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return events;
});
