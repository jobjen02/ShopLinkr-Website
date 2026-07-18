import { getRssString } from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { EDGE_CACHE_CONTROL } from '../utils/markdown';

export const prerender = false;

// One feed per locale covering both chronological collections: blog posts
// (/blogs/...) and guides (seoPages, served at the site root).
export const GET: APIRoute = async (context) => {
    const [blogs, guides] = await Promise.all([getCollection('blogs'), getCollection('seoPages')]);

    const items = [
        ...blogs.map((b) => ({ entry: b, link: `/blogs/${b.id}` })),
        ...guides.map((g) => ({ entry: g, link: `/${g.id}` })),
    ]
        .sort((a, b) => b.entry.data.publishedAt.getTime() - a.entry.data.publishedAt.getTime())
        .map(({ entry, link }) => ({
            title: entry.data.title,
            description: entry.data.excerpt,
            link,
            pubDate: entry.data.publishedAt,
            categories: entry.data.category ? [entry.data.category] : undefined,
        }));

    const body = await getRssString({
        title: 'ShopLinkr — Blog & gidsen',
        description:
            'Artikelen en gidsen over voorraadbeheer, orderverwerking en multichannel verkopen voor webshops.',
        site: context.site ?? 'https://www.shoplinkr.com',
        trailingSlash: false,
        items,
        xmlns: { atom: 'http://www.w3.org/2005/Atom' },
        customData: [
            '<language>nl</language>',
            '<atom:link href="https://www.shoplinkr.com/rss.xml" rel="self" type="application/rss+xml"/>',
        ].join(''),
    });

    return new Response(body, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': EDGE_CACHE_CONTROL,
        },
    });
};
