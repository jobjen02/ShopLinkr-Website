import type { APIRoute } from 'astro';

export const prerender = false;

const MAILCOACH_BASE_URL = process.env.MAILCOACH_BASE_URL
    ?? import.meta.env.MAILCOACH_BASE_URL
    ?? 'https://mailcoach.app';
const MAILCOACH_API_TOKEN = process.env.MAILCOACH_API_TOKEN
    ?? import.meta.env.MAILCOACH_API_TOKEN
    ?? '';

function tokenPreview(token: string): string {
    if (!token) {
        return '(leeg)';
    }

    const trimmed = token.trim();
    const hadWhitespace = trimmed !== token;
    const length = trimmed.length;
    const head = trimmed.slice(0, 4);
    const tail = trimmed.slice(-4);

    return `${head}...${tail} (lengte ${length}${hadWhitespace ? ', let op: bevatte whitespace' : ''})`;
}

export const GET: APIRoute = async () => {
    if (import.meta.env.PROD) {
        return new Response('Not Found', { status: 404 });
    }

    const baseUrl = MAILCOACH_BASE_URL.replace(/\/$/, '');
    const checkUrl = `${baseUrl}/api/email-lists`;
    const tokenInfo = tokenPreview(MAILCOACH_API_TOKEN);

    if (!MAILCOACH_API_TOKEN) {
        return new Response(
            JSON.stringify({
                ok: false,
                token: tokenInfo,
                base_url: baseUrl,
                hint: 'MAILCOACH_API_TOKEN is niet ingesteld in .env',
            }, null, 2),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
    }

    try {
        const response = await fetch(checkUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${MAILCOACH_API_TOKEN.trim()}`,
                Accept: 'application/json',
            },
        });

        const text = await response.text();
        let parsed: unknown;

        try {
            parsed = JSON.parse(text);
        } catch {
            parsed = text;
        }

        return new Response(
            JSON.stringify({
                ok: response.ok,
                token: tokenInfo,
                base_url: baseUrl,
                check_url: checkUrl,
                upstream_status: response.status,
                upstream_body: parsed,
            }, null, 2),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                ok: false,
                token: tokenInfo,
                base_url: baseUrl,
                check_url: checkUrl,
                network_error: error instanceof Error ? error.message : String(error),
            }, null, 2),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
    }
};
