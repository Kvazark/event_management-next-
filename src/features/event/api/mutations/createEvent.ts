import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';
import { uploadFile } from '@/features/event/lib/uploadHelper';

const CreateEvent = z.object({
	id: z.string().optional(),
	formatId: z.string().optional(),
	title: z.string().min(1),
	startDate: z.date(),
	endDate: z.date(),
	formatType: z.enum(['онлайн', 'офлайн', 'гибрид']),
	link: z.string().optional(),
	address: z.string().optional(),
	description: z.string().optional(),
	image: z.any(),
	categoryIds: z.array(z.string()),
	authorIds: z.array(z.string()),
});

export default resolver.pipe(
	resolver.zod(CreateEvent),
	resolver.authorize(),
	async (input, ctx) => {
		const userId = ctx.session.userId;
		if (!userId) throw new Error('Not authenticated');

		try {
			let imageUrl = input.image;
			if (input.image instanceof File) {
				imageUrl = await uploadFile(input.image);
			} else if (
				typeof input.image === 'string' &&
				!input.image.startsWith('/uploads/')
			) {
				throw new Error('Некорректный формат изображения');
			}
			const authors = await db.user.findMany({
				where: {
					id: { in: input.authorIds },
					role: 'ADMIN',
				},
			});

			if (authors.length !== input.authorIds.length) {
				throw new Error('Some of the selected authors are not administrators');
			}

			const isUpdate = !!input.id;

			const formatData = {
				formatName: input.formatType,
				link: input.link,
				address: input.address,
			};

			let format;
			if (isUpdate && input.formatId) {
				format = await db.format.update({
					where: { id: input.formatId },
					data: formatData,
				});
			} else {
				format = await db.format.create({
					data: formatData,
				});
			}

			const eventData = {
				title: input.title,
				startDate: input.startDate,
				endDate: input.endDate,
				formatId: format.id,
				description: input.description,
				image: imageUrl,
				createdIdBy: userId,
			};

			let event;
			if (isUpdate) {
				event = await db.event.update({
					where: { id: input.id },
					data: {
						...eventData,
						categories: {
							set: input.categoryIds.map((id) => ({ id })),
						},
						authors: {
							set: authors.map((author) => ({ id: author.id })),
						},
					},
					include: {
						format: true,
						categories: true,
						createdBy: true,
						authors: true,
					},
				});
			} else {
				event = await db.event.create({
					data: {
						...eventData,
						categories: {
							connect: input.categoryIds.map((id) => ({ id })),
						},
						authors: {
							connect: authors.map((author) => ({ id: author.id })),
						},
					},
					include: {
						format: true,
						categories: true,
						createdBy: true,
						authors: true,
					},
				});
			}

			return event;
		} catch (error) {
			console.error('Error during event creation:', error);
			throw new Error('Error creating event');
		}
	}
);
