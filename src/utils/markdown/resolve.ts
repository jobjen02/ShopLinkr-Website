import { getCollection } from 'astro:content';
import { documentFromHtml, integrationDocument } from './convert';

// The single source of truth that maps a request pathname to its markdown, or
// null when the path is not a content document (the caller then falls back to
// scraping the rendered page). Both the `.md` endpoint and the middleware go
// through here, so a page's markdown is identical however it is requested.

const ORIGIN = 'https://shoplinkr.com';

type AnyEntry = { id: string; body?: string; data: Record<string, any> };

/** Resolve an article collection (HTML body + a title + a description field). */
async function htmlArticle(
    path: string,
    collection: 'blogs' | 'blogsEn' | 'seoPages' | 'seoPagesEn' | 'supportArticles' | 'supportArticlesEn',
    match: (entry: AnyEntry) => boolean,
    description: (data: Record<string, any>) => string,
): Promise<string | null> {
    const entries = (await getCollection(collection)) as unknown as AnyEntry[];
    const entry = entries.find(match);
    if (!entry) return null;
    return documentFromHtml({
        title: entry.data.title,
        description: description(entry.data),
        bodyHtml: entry.body ?? '',
        sourceUrl: `${ORIGIN}${path}`,
    });
}

/** Resolve an integration (structured JSON, not an HTML body). */
async function integration(
    path: string,
    collection: 'integrations' | 'integrationsEn',
    slug: string,
    locale: 'nl' | 'en',
): Promise<string | null> {
    const entries = (await getCollection(collection)) as unknown as AnyEntry[];
    const entry = entries.find((e) => e.data.slug === slug);
    if (!entry) return null;
    return integrationDocument(entry.data as any, `${ORIGIN}${path}`, locale);
}

// Ordered specific-first; the bare /<slug> and /en/<slug> catch the root-served
// SEO pages and must come last. A non-content path falls through to null.
export async function resolveContentMarkdown(pathname: string): Promise<string | null> {
    const path = pathname.replace(/\/+$/, '') || '/';

    let m: RegExpMatchArray | null;

    if ((m = path.match(/^\/en\/blog\/([^/]+)$/))) {
        const slug = m[1];
        return htmlArticle(path, 'blogsEn', (e) => e.id === slug, (d) => d.excerpt);
    }
    if ((m = path.match(/^\/blogs\/([^/]+)$/))) {
        const slug = m[1];
        return htmlArticle(path, 'blogs', (e) => e.id === slug, (d) => d.excerpt);
    }
    // Support URLs are the article's flat basename (matching the /support/[slug]
    // route), so basenames must be unique per locale, which they are today.
    if ((m = path.match(/^\/en\/support\/([^/]+)$/))) {
        const slug = m[1];
        return htmlArticle(path, 'supportArticlesEn', (e) => e.id.split('/').pop() === slug, (d) => d.summary);
    }
    if ((m = path.match(/^\/support\/([^/]+)$/))) {
        const slug = m[1];
        return htmlArticle(path, 'supportArticles', (e) => e.id.split('/').pop() === slug, (d) => d.summary);
    }
    if ((m = path.match(/^\/en\/integrations\/([^/]+)$/))) {
        return integration(path, 'integrationsEn', m[1], 'en');
    }
    if ((m = path.match(/^\/integraties\/([^/]+)$/))) {
        return integration(path, 'integrations', m[1], 'nl');
    }
    if ((m = path.match(/^\/en\/([^/]+)$/))) {
        const slug = m[1];
        return htmlArticle(path, 'seoPagesEn', (e) => e.id === slug, (d) => d.excerpt);
    }
    if ((m = path.match(/^\/([^/]+)$/))) {
        const slug = m[1];
        return htmlArticle(path, 'seoPages', (e) => e.id === slug, (d) => d.excerpt);
    }

    return null;
}
