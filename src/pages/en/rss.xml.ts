import { getRssString } from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { EDGE_CACHE_CONTROL } from '../../utils/markdown';

export const prerender = false;

// English twin of /rss.xml: blog posts (/en/blog/...) and guides (seoPagesEn,
// served under /en/ at the root).
export const GET: APIRoute = async (context) => {
    const [blogs, guides] = await Promise.all([getCollection('blogsEn'), getCollection('seoPagesEn')]);

    const items = [
        ...blogs.map((b) => ({ entry: b, link: `/en/blog/${b.id}` })),
        ...guides.map((g) => ({ entry: g, link: `/en/${g.id}` })),
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
        title: 'ShopLinkr — Blog & guides',
        description:
            'Articles and guides on inventory management, order processing and multichannel selling for online stores.',
        site: context.site ?? 'https://www.shoplinkr.com',
        trailingSlash: false,
        items,
        xmlns: { atom: 'http://www.w3.org/2005/Atom' },
        customData: [
            '<language>en</language>',
            '<atom:link href="https://www.shoplinkr.com/en/rss.xml" rel="self" type="application/rss+xml"/>',
        ].join(''),
    });

    return new Response(body, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': EDGE_CACHE_CONTROL,
        },
    });
};
