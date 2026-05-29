import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogs = defineCollection({
    loader: glob({
        pattern: '**/*.{md,mdx}',
        base: './src/content/blogs',
    }),
    schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        author: z.string().default('ShopLinkr'),
        publishedAt: z.coerce.date(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        category: z.string().optional(),
        isVisible: z.boolean().default(true),
        isBlog: z.boolean().default(true),
    }),
});

const supportArticles = defineCollection({
    loader: glob({
        pattern: '**/*.{md,mdx}',
        base: './src/content/support',
    }),
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        category: z.string(),
        categoryLabel: z.string(),
        subcategory: z.string().optional(),
        subcategoryLabel: z.string().optional(),
        order: z.number().default(0),
        lastUpdated: z.coerce.date(),
    }),
});

const integrations = defineCollection({
    loader: glob({
        pattern: '**/*.json',
        base: './src/content/integrations',
    }),
    schema: z.object({
        name: z.string(),
        slug: z.string(),
        category: z.enum(['webshop', 'marketplace', 'carrier', 'other']),
        status: z.enum(['live', 'coming-soon']).default('live'),
        logo: z.string(),
        summary: z.string(),
        url: z.string().optional(),
        supportSlug: z.string().optional(),
        tagline: z.string().optional(),
        about: z.string().optional(),
        faqs: z.array(
            z.object({
                q: z.string(),
                a: z.string(),
            }),
        ).optional(),
    }),
});

export const collections = {
    blogs,
    supportArticles,
    integrations,
};
