import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { AuthenticationError } from 'blitz';

export default resolver.pipe(async (_, ctx) => {
	const userId = ctx.session.userId;
	if (!userId) throw new AuthenticationError();

	const events = await db.event.findMany({
		where: {
			participants: {
				some: {
					id: userId,
				},
			},
		},
		include: {
			format: true,
			categories: true,
		},
	});

	return events;
});
