import type { APIRoute } from 'astro';

export const prerender = false;

interface NewsletterPayload {
    firstName?: string;
    email?: string;
    website?: string;
    source?: string;
}

const GHL_API_TOKEN = (process.env.GOHIGHLEVEL_API_TOKEN
    ?? import.meta.env.GOHIGHLEVEL_API_TOKEN
    ?? '').trim();
const GHL_LOCATION_ID = (process.env.GOHIGHLEVEL_LOCATION_ID
    ?? import.meta.env.GOHIGHLEVEL_LOCATION_ID
    ?? '').trim();
const GHL_NEWSLETTER_FIELD_KEY = 'contact.nieuwsbrief';
const GHL_API_VERSION = '2021-07-28';

function isValidEmail(value: unknown): value is string {
    return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export const POST: APIRoute = async ({ request }) => {
    const isDebug = import.meta.env.DEV === true || import.meta.env.PUBLIC_DEBUG_CONTACT === 'true';

    let payload: NewsletterPayload;

    try {
        payload = await request.json() as NewsletterPayload;
    } catch {
        return new Response(
            JSON.stringify({ ok: false, error: 'Invalid JSON' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } },
        );
    }

    if (payload.website && payload.website.length > 0) {
        return new Response(
            JSON.stringify({ ok: true }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
    }

    const firstName = (payload.firstName ?? '').trim();
    const email = (payload.email ?? '').trim().toLowerCase();
    const source = (payload.source ?? 'website-footer').trim();

    if (firstName.length < 2) {
        return new Response(
            JSON.stringify({ ok: false, error: 'First name too short' }),
            { status: 422, headers: { 'Content-Type': 'application/json' } },
        );
    }

    if (!isValidEmail(email)) {
        return new Response(
            JSON.stringify({ ok: false, error: 'Invalid email' }),
            { status: 422, headers: { 'Content-Type': 'application/json' } },
        );
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

        return new Response(
            JSON.stringify(body),
            { status: 503, headers: { 'Content-Type': 'application/json' } },
        );
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
        });

        const text = await upstream.text();
        let parsed: unknown;

        try {
            parsed = JSON.parse(text);
        } catch {
            parsed = text;
        }

        if (!upstream.ok) {
            console.error('[newsletter] GoHighLevel error', upstream.status, text);

            const errorBody: Record<string, unknown> = {
                ok: false,
                error: 'Aanmelden lukte niet',
            };

            if (isDebug) {
                errorBody.upstream_status = upstream.status;
                errorBody.upstream_body = parsed;
                errorBody.sent_body = body;
            }

            return new Response(
                JSON.stringify(errorBody),
                { status: 502, headers: { 'Content-Type': 'application/json' } },
            );
        }

        const successBody: Record<string, unknown> = { ok: true };

        if (isDebug) {
            successBody.upstream_body = parsed;
        }

        return new Response(
            JSON.stringify(successBody),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
    } catch (error) {
        console.error('[newsletter] Network error', error);

        const errorBody: Record<string, unknown> = {
            ok: false,
            error: 'Onverwachte fout bij aanmelden',
        };

        if (isDebug && error instanceof Error) {
            errorBody.debug = error.message;
        }

        return new Response(
            JSON.stringify(errorBody),
            { status: 502, headers: { 'Content-Type': 'application/json' } },
        );
    }
};

export const GET: APIRoute = () => {
    return new Response(
        JSON.stringify({ ok: false, error: 'Method not allowed' }),
        { status: 405, headers: { 'Content-Type': 'application/json', Allow: 'POST' } },
    );
};
