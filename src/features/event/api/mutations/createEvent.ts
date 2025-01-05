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
			}

			const isUpdate = !!input.id;

			if (isUpdate) {
				const existingEvent = await db.event.findUnique({
					where: { id: input.id },
					select: {
						createdIdBy: true,
						authors: {
							select: { id: true },
						},
					},
				});

				if (!existingEvent) {
					throw new Error('Event not found');
				}

				const isCreator = existingEvent.createdIdBy === userId;
				const isAuthor = existingEvent.authors.some(
					(author) => author.id === userId
				);

				if (!isCreator && !isAuthor) {
					throw new Error('Not authorized to edit this event');
				}
			}

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

			const authors = await db.user.findMany({
				where: {
					id: { in: input.authorIds },
					role: 'ADMIN',
				},
			});

			if (authors.length !== input.authorIds.length) {
				throw new Error('Some of the selected authors are not administrators');
			}

			const eventData = {
				title: input.title,
				startDate: input.startDate,
				endDate: input.endDate,
				formatId: format.id,
				description: input.description,
				image: imageUrl,
			};

			let event;
			if (isUpdate) {
				const existingEvent = await db.event.findUnique({
					where: { id: input.id },
					select: { createdIdBy: true },
				});

				event = await db.event.update({
					where: { id: input.id },
					data: {
						...eventData,
						createdIdBy: existingEvent!.createdIdBy,
						updatedBy: userId,
						categories: {
							set: input.categoryIds.map((id) => ({ id })),
						},
						authors: {
							set: input.authorIds.map((id) => ({ id })),
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
						createdIdBy: userId,
						categories: {
							connect: input.categoryIds.map((id) => ({ id })),
						},
						authors: {
							connect: input.authorIds.map((id) => ({ id })),
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
			throw error;
		}
	}
);
