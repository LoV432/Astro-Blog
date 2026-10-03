import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			heading: z.string(),
			description: z.string(),
			cover: image(),
			tags: z.array(z.string()).default([]),
			publishedAt: z.coerce.date(),
			updatedAt: z.coerce.date().optional()
		})
});

export const collections = { blog };
