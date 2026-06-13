import { defineMiddleware } from 'astro:middleware';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkStringify from 'remark-stringify';

// Markdown for agents: a request with `Accept: text/markdown` gets a markdown
// version of the page. We render the page once via next(), then convert that
// HTML inline. No self-fetch (which is unreliable on Vercel) and no separate
// endpoint. Pages must be server-rendered (prerender: false) so this runs.

const processor = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeRemark)
    .use(remarkStringify, { bullet: '-', fences: true, emphasis: '_' });

const SKIP = /^\/(_|\.well-known|api)(\/|$)/;

const decode = (s: string) =>
    s
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#0?39;/g, "'")
        .replace(/&#x27;/gi, "'");

const toMarkdown = async (html: string, sourceUrl: string) => {
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    const content = (mainMatch ? mainMatch[1] : html)
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<svg[\s\S]*?<\/svg>/gi, '')
        .replace(/<astro-island[\s\S]*?<\/astro-island>/gi, '')
        .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
        .replace(/<i\b[^>]*>[\s\S]*?<\/i>/gi, '')
        .replace(/<i\b[^>]*\/>/gi, '');

    const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').trim());
    const desc = decode(
        (html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] || '').trim(),
    );

    const converted = String(await processor.process(content))
        .replace(/&#x([0-9a-f]+);/gi, (_m, h) => {
            const n = parseInt(h, 16);
            return Number.isFinite(n) && n > 0 ? String.fromCodePoint(n) : '';
        })
        .replace(/&#(\d+);/g, (_m, d) => {
            const n = parseInt(d, 10);
            return Number.isFinite(n) && n > 0 ? String.fromCodePoint(n) : '';
        })
        .replace(/(\*\*|__)\s*\1/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    const header = `# ${title}\n\n` + (desc ? `> ${desc}\n\n` : '');
    return `${header}${converted}\n\n---\n\nBron: ${sourceUrl}\n`;
};

export const onRequest = defineMiddleware(async (context, next) => {
    const accept = context.request.headers.get('accept') ?? '';
    const path = context.url.pathname;
    const wantsMarkdown =
        accept.includes('text/markdown') &&
        !SKIP.test(path) &&
        !/\.[a-z0-9]+$/i.test(path);

    const response = await next();
    const type = response.headers.get('content-type') ?? '';

    // Convert the just-rendered HTML to markdown for agents.
    if (wantsMarkdown && type.includes('text/html')) {
        const html = await response.text();
        const md = await toMarkdown(html, context.url.href);
        return new Response(md, {
            status: response.status,
            headers: {
                'Content-Type': 'text/markdown; charset=utf-8',
                'X-Markdown-Tokens': String(Math.ceil(md.length / 4)),
                'X-Robots-Tag': 'noindex',
                Vary: 'Accept',
            },
        });
    }

    // Server-rendered HTML has no static CDN layer, so cache it at the edge.
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
