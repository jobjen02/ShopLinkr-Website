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

// --- English collections (additive; the Dutch collections above are untouched) ---
// EN content lives in *-en dirs with a translated slug as filename. `translationKey`
// links an EN entry to its NL counterpart (the NL id) for hreflang + language switch.

const blogsEn = defineCollection({
    loader: glob({
        pattern: '**/*.{md,mdx}',
        base: './src/content/blogs-en',
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
        translationKey: z.string().optional(),
    }),
});

const supportArticlesEn = defineCollection({
    loader: glob({
        pattern: '**/*.{md,mdx}',
        base: './src/content/support-en',
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
        translationKey: z.string().optional(),
    }),
});

const integrationsEn = defineCollection({
    loader: glob({
        pattern: '**/*.json',
        base: './src/content/integrations-en',
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
        translationKey: z.string().optional(),
    }),
});

export const collections = {
    blogs,
    supportArticles,
    integrations,
    blogsEn,
    supportArticlesEn,
    integrationsEn,
};
