import { defineMiddleware } from 'astro:middleware';
import { resolveContentMarkdown, documentFromPage, markdownResponse, EDGE_CACHE_CONTROL } from './utils/markdown';

// Markdown for agents. A request with `Accept: text/markdown` gets a markdown
// version of any page, at the same URL:
//  - Content documents (blog/guide/support/integration) render straight from
//    their content entry via the shared resolver. No HTML round-trip.
//  - Composed pages (home, pricing, ...) are rendered once and their <main> is
//    scraped to markdown.
// Content pages also expose a `<url>.md` twin (same resolver, byte-identical
// output); composed pages answer only via the Accept header. Requires server
// rendering (prerender: false) so this middleware actually runs for the route.

const SKIP = /^\/(_|\.well-known|api)(\/|$)/;

export const onRequest = defineMiddleware(async (context, next) => {
    // Prerendered routes are static files; the middleware still runs at build
    // time where request headers are absent. Nothing below applies to them.
    if (context.isPrerendered) return next();

    const path = context.url.pathname;

    // Explicit `<url>.md` twin: serve the markdown document for any content URL,
    // whatever the Accept header. Non-content paths get a 404. Handling it here
    // (instead of a route) avoids the on-demand `[slug]` routes swallowing `.md`.
    if (path.endsWith('.md') && !SKIP.test(path)) {
        try {
            const md = await resolveContentMarkdown(path.slice(0, -3));
            if (md) return markdownResponse(md);
        } catch (err) {
            console.error(`[markdown] .md resolve failed for ${path}:`, err);
        }
        return new Response('Not found', { status: 404 });
    }

    const accept = context.request.headers.get('accept') ?? '';
    const wantsMarkdown =
        accept.includes('text/markdown') &&
        !SKIP.test(path) &&
        !/\.[a-z0-9]+$/i.test(path);

    // Content documents need no HTML render: resolve straight from the entry.
    if (wantsMarkdown) {
        try {
            const fromEntry = await resolveContentMarkdown(path);
            if (fromEntry) return markdownResponse(fromEntry);
        } catch (err) {
            console.error(`[markdown] resolve failed for ${path}:`, err);
        }
    }

    const response = await next();
    const type = response.headers.get('content-type') ?? '';

    // Composed page (no content entry): scrape the just-rendered HTML. On any
    // conversion error, fall back to the original HTML rather than 500-ing.
    if (wantsMarkdown && type.includes('text/html')) {
        const html = await response.text();
        try {
            return markdownResponse(await documentFromPage(html, context.url.href));
        } catch (err) {
            console.error(`[markdown] scrape failed for ${path}:`, err);
            return new Response(html, {
                status: response.status,
                headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                    'Cache-Control': EDGE_CACHE_CONTROL,
                    Vary: 'Accept',
                },
            });
        }
    }

    // Server-rendered HTML has no static CDN layer, so cache it at the edge.
    if (
        context.request.method === 'GET' &&
        response.ok &&
        type.includes('text/html') &&
        !response.headers.has('cache-control')
    ) {
        response.headers.set('Cache-Control', EDGE_CACHE_CONTROL);
        response.headers.set('Vary', 'Accept');
    }

    return response;
});
