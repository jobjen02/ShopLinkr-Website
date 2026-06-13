import { defineMiddleware } from 'astro:middleware';

// Content negotiation for AI agents: a request with `Accept: text/markdown`
// is rewritten to the /md endpoint, which returns a markdown version of the
// page. HTML stays the default for browsers. Runs as Vercel Edge Middleware
// (edgeMiddleware: true in astro.config), so it fires before static routes,
// which a vercel.json rewrite cannot do.

// Internal routes and the markdown endpoint itself must never be rewritten.
const SKIP = /^\/(md|_|\.well-known|api)(\/|$)/;

export const onRequest = defineMiddleware(async (context, next) => {
    const accept = context.request.headers.get('accept') ?? '';
    const path = context.url.pathname;

    if (
        accept.includes('text/markdown') &&
        !SKIP.test(path) &&
        !/\.[a-z0-9]+$/i.test(path)
    ) {
        return context.rewrite(`/md${path === '/' ? '/' : path}`);
    }

    const response = await next();

    // SSR content pages have no static CDN layer, so cache the HTML response at
    // the edge to keep it near-static-fast. Vary on Accept so a markdown request
    // can never be served a cached HTML response (or vice versa).
    const type = response.headers.get('content-type') ?? '';
    if (
        context.request.method === 'GET' &&
        type.includes('text/html') &&
        !response.headers.has('cache-control')
    ) {
        response.headers.set(
            'Cache-Control',
            'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        );
        response.headers.set('Vary', 'Accept');
    }

    return response;
});
