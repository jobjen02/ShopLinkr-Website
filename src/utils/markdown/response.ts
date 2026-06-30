// One place for the headers + Response shape of a markdown payload, used by the
// `.md` endpoint and the content-negotiation middleware so they stay identical.

/** Edge-cache policy for server-rendered responses (HTML and markdown alike). */
export const EDGE_CACHE_CONTROL = 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400';

export const MARKDOWN_HEADERS: Record<string, string> = {
    'Content-Type': 'text/markdown; charset=utf-8',
    'Cache-Control': EDGE_CACHE_CONTROL,
    'X-Robots-Tag': 'noindex',
    Vary: 'Accept',
};

/** Build a markdown Response with the standard headers and a token-count hint. */
export function markdownResponse(markdown: string, status = 200): Response {
    return new Response(markdown, {
        status,
        headers: {
            ...MARKDOWN_HEADERS,
            'X-Markdown-Tokens': String(Math.ceil(markdown.length / 4)),
        },
    });
}
