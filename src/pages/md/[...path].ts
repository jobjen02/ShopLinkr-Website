import type { APIRoute } from 'astro';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkStringify from 'remark-stringify';

// SSR endpoint: returns a clean markdown version of any HTML page. Used for
// content negotiation (Accept: text/markdown) via a Vercel rewrite, and also
// reachable directly at /md/<path>. Stays in sync because it converts the live
// HTML of the page at request time.
export const prerender = false;

const processor = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeRemark)
    .use(remarkStringify, { bullet: '-', fences: true, emphasis: '_' });

// Paths that must never be markdown-converted (internal routes + this endpoint).
const BLOCKED = /^(md|_|\.well-known|_astro|_image|api)(\/|$)/;

const decode = (s: string) =>
    s
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#0?39;/g, "'")
        .replace(/&#x27;/gi, "'");

export const GET: APIRoute = async ({ params, url }) => {
    const path = (params.path ?? '').replace(/^\/+/, '');

    // Skip internal routes and anything that looks like a file (assets).
    if (BLOCKED.test(path) || /\.[a-z0-9]+$/i.test(path)) {
        return new Response('Not found', { status: 404 });
    }

    const target = `${url.origin}/${path}`;
    let res: Response;
    try {
        res = await fetch(target, { headers: { Accept: 'text/html' } });
    } catch {
        return new Response('Upstream error', { status: 502 });
    }

    const type = res.headers.get('content-type') || '';
    if (!res.ok || !type.includes('text/html')) {
        return new Response('Not found', { status: 404 });
    }

    const html = await res.text();

    // Keep only the main content, drop interactive/decorative markup.
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    const content = (mainMatch ? mainMatch[1] : html)
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<svg[\s\S]*?<\/svg>/gi, '')
        .replace(/<astro-island[\s\S]*?<\/astro-island>/gi, '')
        .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
        // FontAwesome icons use <i>, which would become empty markdown emphasis.
        .replace(/<i\b[^>]*>[\s\S]*?<\/i>/gi, '')
        .replace(/<i\b[^>]*\/>/gi, '');

    const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').trim());
    const desc = decode(
        (html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] || '').trim(),
    );

    const converted = String(await processor.process(content))
        // Decode numeric entities remark may emit, drop broken ones.
        .replace(/&#x([0-9a-f]+);/gi, (_m, h) => {
            const n = parseInt(h, 16);
            return Number.isFinite(n) && n > 0 ? String.fromCodePoint(n) : '';
        })
        .replace(/&#(\d+);/g, (_m, d) => {
            const n = parseInt(d, 10);
            return Number.isFinite(n) && n > 0 ? String.fromCodePoint(n) : '';
        })
        // Collapse empty emphasis left by stripped inline elements.
        .replace(/(\*\*|__)\s*\1/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    const header = `# ${title}\n\n` + (desc ? `> ${desc}\n\n` : '');
    const md = `${header}${converted}\n\n---\n\nBron: ${target}\n`;

    return new Response(md, {
        status: 200,
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'X-Markdown-Tokens': String(Math.ceil(md.length / 4)),
            'X-Robots-Tag': 'noindex',
            'Cache-Control': 'public, max-age=3600',
            Vary: 'Accept',
        },
    });
};
