import type { APIRoute } from 'astro';

export const prerender = false;

interface NewsletterPayload {
    firstName?: unknown;
    email?: unknown;
    website?: unknown;
    source?: unknown;
}

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_SOURCE_LENGTH = 80;
const MAX_PAYLOAD_BYTES = 8 * 1024;
const UPSTREAM_TIMEOUT_MS = 10_000;

const GHL_API_TOKEN = (process.env.GOHIGHLEVEL_API_TOKEN
    ?? import.meta.env.GOHIGHLEVEL_API_TOKEN
    ?? '').trim();
const GHL_LOCATION_ID = (process.env.GOHIGHLEVEL_LOCATION_ID
    ?? import.meta.env.GOHIGHLEVEL_LOCATION_ID
    ?? '').trim();
const GHL_NEWSLETTER_FIELD_KEY = 'contact.nieuwsbrief';
const GHL_API_VERSION = '2021-07-28';

const CONTROL_CHARS_REGEX = new RegExp('[\\u0000-\\u001F\\u007F]', 'g');

function asString(value: unknown): string {
    return typeof value === 'string' ? value : '';
}

function stripControlChars(value: string): string {
    return value.replace(CONTROL_CHARS_REGEX, ' ');
}

function isValidEmail(value: unknown): value is string {
    return typeof value === 'string'
        && value.length <= MAX_EMAIL_LENGTH
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function jsonResponse(body: Record<string, unknown>, status: number): Response {
    return new Response(
        JSON.stringify(body),
        {
            status,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
            },
        },
    );
}

export const POST: APIRoute = async ({ request }) => {
    const isDebug = import.meta.env.DEV === true || import.meta.env.PUBLIC_DEBUG_CONTACT === 'true';

    const contentType = request.headers.get('content-type') ?? '';

    if (!contentType.toLowerCase().includes('application/json')) {
        return jsonResponse({
            ok: false,
            error: 'Invalid content type',
        }, 415);
    }

    const contentLengthHeader = request.headers.get('content-length');

    if (contentLengthHeader) {
        const contentLength = Number.parseInt(contentLengthHeader, 10);

        if (Number.isFinite(contentLength) && contentLength > MAX_PAYLOAD_BYTES) {
            return jsonResponse({
                ok: false,
                error: 'Payload too large',
            }, 413);
        }
    }

    let payload: NewsletterPayload;

    try {
        payload = await request.json() as NewsletterPayload;
    } catch {
        return jsonResponse({
            ok: false,
            error: 'Invalid JSON',
        }, 400);
    }

    if (!payload || typeof payload !== 'object') {
        return jsonResponse({
            ok: false,
            error: 'Invalid payload',
        }, 400);
    }

    const honeypotValue = asString(payload.website).trim();

    if (honeypotValue.length > 0) {
        return jsonResponse({ ok: true }, 200);
    }

    const firstName = stripControlChars(asString(payload.firstName)).trim().slice(0, MAX_NAME_LENGTH);
    const email = asString(payload.email).trim().toLowerCase().slice(0, MAX_EMAIL_LENGTH);
    const sourceRaw = stripControlChars(asString(payload.source)).trim().slice(0, MAX_SOURCE_LENGTH);
    const source = sourceRaw || 'website-footer';

    if (firstName.length < 2) {
        return jsonResponse({
            ok: false,
            error: 'First name too short',
        }, 422);
    }

    if (!isValidEmail(email)) {
        return jsonResponse({
            ok: false,
            error: 'Invalid email',
        }, 422);
    }

    function configError(varName: string): Response {
        console.error(`[newsletter] ${varName} niet ingesteld`);

        const body: Record<string, unknown> = {
            ok: false,
            error: 'Newsletter is niet juist geconfigureerd',
        };

        if (isDebug) {
            body.missing = varName;
        }

        return jsonResponse(body, 503);
    }

    if (!GHL_API_TOKEN) {
        return configError('GOHIGHLEVEL_API_TOKEN');
    }

    if (!GHL_LOCATION_ID) {
        return configError('GOHIGHLEVEL_LOCATION_ID');
    }

    const body = {
        firstName,
        email,
        locationId: GHL_LOCATION_ID,
        source,
        customFields: [
            {
                key: GHL_NEWSLETTER_FIELD_KEY,
                field_value: 'ja',
            },
        ],
    };

    try {
        const upstream = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${GHL_API_TOKEN}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Version: GHL_API_VERSION,
            },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        });

        const text = await upstream.text();
        let parsed: unknown;

        try {
            parsed = JSON.parse(text);
        } catch {
            parsed = text;
        }

        if (!upstream.ok) {
            console.error('[newsletter] GoHighLevel error', {
                status: upstream.status,
            });

            const errorBody: Record<string, unknown> = {
                ok: false,
                error: 'Aanmelden lukte niet',
            };

            if (isDebug) {
                errorBody.upstream_status = upstream.status;
                errorBody.upstream_body = parsed;
                errorBody.sent_body = body;
            }

            return jsonResponse(errorBody, 502);
        }

        const successBody: Record<string, unknown> = { ok: true };

        if (isDebug) {
            successBody.upstream_body = parsed;
        }

        return jsonResponse(successBody, 200);
    } catch (error) {
        const isTimeout = error instanceof DOMException && error.name === 'TimeoutError';

        console.error('[newsletter] Network error', {
            timeout: isTimeout,
        });

        const errorBody: Record<string, unknown> = {
            ok: false,
            error: isTimeout
                ? 'Aanmelden duurde te lang'
                : 'Onverwachte fout bij aanmelden',
        };

        if (isDebug && error instanceof Error) {
            errorBody.debug = error.message;
        }

        return jsonResponse(errorBody, 502);
    }
};

export const GET: APIRoute = () => {
    return new Response(
        JSON.stringify({
            ok: false,
            error: 'Method not allowed',
        }),
        {
            status: 405,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
                Allow: 'POST',
            },
        },
    );
};
