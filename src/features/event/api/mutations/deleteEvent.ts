import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

const DeleteEvent = z.object({
	id: z.string(),
});

export default resolver.pipe(
	resolver.zod(DeleteEvent),
	resolver.authorize(),
	async ({ id }, ctx) => {
		const userId = ctx.session.userId;
		if (!userId) throw new Error('Not authenticated');
		const event = await db.event.findUnique({
			where: {
				id,
				OR: [{ createdIdBy: userId }, { authors: { some: { id: userId } } }],
			},
			include: {
				format: true,
				categories: true,
				authors: true,
				participants: true,
			},
		});

		if (!event) {
			throw new Error('Event not found or you are not authorized to delete it');
		}
		if (event.image && event.image.startsWith('/uploads/')) {
			const imagePath = path.join(process.cwd(), 'public', event.image);
			try {
				if (fs.existsSync(imagePath)) {
					fs.unlinkSync(imagePath);
				}
			} catch (error) {
				console.error('Error deleting image file:', error);
			}
		}
		const formatId = event.formatId;

		try {
			await db.$transaction(async (prisma) => {
				await prisma.event.delete({
					where: { id },
				});

				if (formatId) {
					await prisma.format.delete({
						where: { id: formatId },
					});
				}
			});

			return event;
		} catch (error) {
			console.error('Transaction error:', error);
			throw error;
		}
	}
);
