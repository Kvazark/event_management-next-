import { resolver } from '@blitzjs/rpc';
import db from 'db';

export default resolver.pipe(async (_, ctx) => {
	const userId = ctx.session.userId;
	if (!userId) throw new Error('Not authenticated');

	const user = await db.user.findUnique({
		where: { id: userId },
		select: {
			firstName: true,
			lastName: true,
			patronymic: true,
			email: true,
		},
	});

	if (!user) throw new Error('User not found');

	return user;
});
