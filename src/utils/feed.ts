import { getRssString } from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { collectionName, localeMeta } from '../i18n/localeData';
import { localizedPath, type Locale } from '../i18n/routes';
import { useTranslations } from '../i18n/ui';
import { EDGE_CACHE_CONTROL } from './markdown';

// One RSS feed per locale, covering both chronological collections: blog posts
// and guides (seoPages, served at the locale root). Everything locale-specific
// (strings, paths, collection names) comes from the i18n registries, so adding
// a locale requires no changes here.

const FALLBACK_ORIGIN = 'https://www.shoplinkr.com';

/** Guides live at the locale root: /<slug> (nl) or /en/<slug> (en). */
function rootPath(id: string, locale: Locale): string {
    const home = localizedPath('home', locale);
    return home === '/' ? `/${id}` : `${home}/${id}`;
}

export async function feedResponse(locale: Locale, site: URL | string | undefined): Promise<Response> {
    const t = useTranslations(locale);
    const origin = site ?? FALLBACK_ORIGIN;

    const [blogs, guides] = await Promise.all([
        getCollection(collectionName('blogs', locale)),
        getCollection(collectionName('seo', locale)),
    ]);

    const items = [
        ...blogs.map((entry) => ({ entry, link: `${localizedPath('blog', locale)}/${entry.id}` })),
        ...guides.map((entry) => ({ entry, link: rootPath(entry.id, locale) })),
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
        title: t.feed.title,
        description: t.feed.description,
        site: origin,
        trailingSlash: false,
        items,
        xmlns: { atom: 'http://www.w3.org/2005/Atom' },
        customData: [
            `<language>${localeMeta[locale].bcp47.toLowerCase()}</language>`,
            `<atom:link href="${new URL(localizedPath('rss', locale), origin)}" rel="self" type="application/rss+xml"/>`,
        ].join(''),
    });

    return new Response(body, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': EDGE_CACHE_CONTROL,
        },
    });
}
