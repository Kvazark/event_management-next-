import { resolver } from '@blitzjs/rpc';
import { z } from 'zod';
import db from 'db';

const UpdateUserSchema = z.object({
	firstName: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50),
	patronymic: z.string().nullable().optional(),
	email: z.string().email(),
});

export default resolver.pipe(
	resolver.zod(UpdateUserSchema),
	async (data, ctx) => {
		const userId = ctx.session.userId;
		if (!userId) throw new Error('Not authenticated');

		// Проверяем, не занят ли email другим пользователем
		if (data.email) {
			const existingUser = await db.user.findFirst({
				where: {
					email: data.email,
					id: { not: userId },
				},
			});

			if (existingUser) {
				throw new Error('Email already in use');
			}
		}

		const updatedUser = await db.user.update({
			where: { id: userId },
			data: {
				firstName: data.firstName,
				lastName: data.lastName,
				patronymic: data.patronymic,
				email: data.email,
			},
			select: {
				firstName: true,
				lastName: true,
				patronymic: true,
				email: true,
			},
		});

		return updatedUser;
	}
);
