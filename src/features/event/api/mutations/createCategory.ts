import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const CreateCategory = z.object({
	title: z.string().min(2, 'Название должно содержать минимум 2 символа'),
});

export default resolver.pipe(
	resolver.zod(CreateCategory),
	resolver.authorize(),
	async ({ title }) => {
		const category = await db.category.create({
			data: {
				title: title.trim(),
			},
		});
		return category;
	}
);
