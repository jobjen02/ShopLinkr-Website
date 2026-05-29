import type { APIRoute } from 'astro';

export const prerender = false;

const UPSTREAM_TIMEOUT_MS = 8_000;

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

    if (length < 8) {
        return `(te kort, lengte ${length}${hadWhitespace ? ', let op: bevatte whitespace' : ''})`;
    }

    const head = trimmed.slice(0, 4);
    const tail = trimmed.slice(-4);

    return `${head}...${tail} (lengte ${length}${hadWhitespace ? ', let op: bevatte whitespace' : ''})`;
}

function debugResponse(body: Record<string, unknown>): Response {
    return new Response(
        JSON.stringify(body, null, 2),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
            },
        },
    );
}

export const GET: APIRoute = async () => {
    if (import.meta.env.PROD) {
        return new Response('Not Found', { status: 404 });
    }

    const baseUrl = MAILCOACH_BASE_URL.replace(/\/$/, '');
    const checkUrl = `${baseUrl}/api/email-lists`;
    const tokenInfo = tokenPreview(MAILCOACH_API_TOKEN);

    if (!MAILCOACH_API_TOKEN) {
        return debugResponse({
            ok: false,
            token: tokenInfo,
            base_url: baseUrl,
            hint: 'MAILCOACH_API_TOKEN is niet ingesteld in .env',
        });
    }

    try {
        const response = await fetch(checkUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${MAILCOACH_API_TOKEN.trim()}`,
                Accept: 'application/json',
            },
            signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        });

        const text = await response.text();
        let parsed: unknown;

        try {
            parsed = JSON.parse(text);
        } catch {
            parsed = text;
        }

        return debugResponse({
            ok: response.ok,
            token: tokenInfo,
            base_url: baseUrl,
            check_url: checkUrl,
            upstream_status: response.status,
            upstream_body: parsed,
        });
    } catch (error) {
        const isTimeout = error instanceof DOMException && error.name === 'TimeoutError';

        return debugResponse({
            ok: false,
            token: tokenInfo,
            base_url: baseUrl,
            check_url: checkUrl,
            network_error: isTimeout
                ? 'Upstream timeout'
                : (error instanceof Error ? error.message : String(error)),
        });
    }
};
