import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const EventsQuery = z.object({
	page: z.number().min(1).default(1),
	perPage: z.number().min(1).default(6),
	categoryIds: z.array(z.string()).optional(),
	sortBy: z.enum(['asc', 'desc']).default('asc'),
});

export default resolver.pipe(
	resolver.zod(EventsQuery),
	async ({ page, perPage, categoryIds, sortBy }) => {
		const skip = (page - 1) * perPage;

		const where = {
			...(categoryIds && categoryIds.length > 0
				? {
						categories: {
							some: {
								id: { in: categoryIds },
							},
						},
				  }
				: {}),
		};

		const [events, totalCount] = await Promise.all([
			db.event.findMany({
				where,
				include: {
					format: true,
					categories: true,
					authors: true,
					participants: true,
					createdBy: true,
				},
				orderBy: {
					startDate: sortBy,
				},
				skip,
				take: perPage,
			}),
			db.event.count({ where }),
		]);

		return {
			events,
			totalPages: Math.ceil(totalCount / perPage),
			currentPage: page,
			totalCount,
		};
	}
);
