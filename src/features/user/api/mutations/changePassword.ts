import { resolver } from '@blitzjs/rpc';
import { z } from 'zod';
import db from 'db';

const ChangePasswordSchema = z.object({
	currentPassword: z.string().min(6),
	newPassword: z.string().min(6),
});

export default resolver.pipe(
	resolver.zod(ChangePasswordSchema),
	resolver.authorize(),
	async ({ currentPassword, newPassword }, ctx) => {
		const userId = ctx.session.userId;
		if (!userId) throw new Error('Not authenticated');

		try {
			// Сначала проверяем текущий пароль
			const user = await db.user.findFirstOrThrow({
				where: {
					id: userId,
				},
			});

			if (user.hashedPassword !== currentPassword) {
				throw new Error('Current password is incorrect');
			}

			// Только если текущий пароль верный - обновляем на новый
			const updatedUser = await db.user.update({
				where: { id: userId },
				data: {
					hashedPassword: newPassword,
					updatedAt: new Date(),
				},
			});

			// Проверяем, что пароль действительно обновился
			if (updatedUser.hashedPassword !== newPassword) {
				throw new Error('Password update failed');
			}

			return updatedUser;
		} catch (error) {
			if (error.message === 'Current password is incorrect') {
				throw error;
			}
			if (error.message === 'Password update failed') {
				throw error;
			}
			throw new Error('Failed to update password');
		}
	}
);
