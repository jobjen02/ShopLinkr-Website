import type { APIRoute } from 'astro';

export const prerender = false;

interface ContactPayload {
    name?: unknown;
    email?: unknown;
    phone?: unknown;
    subject?: unknown;
    message?: unknown;
    consent?: unknown;
    website?: unknown;
}

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 40;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_PAYLOAD_BYTES = 32 * 1024;
const UPSTREAM_TIMEOUT_MS = 10_000;

const MAILCOACH_BASE_URL = process.env.MAILCOACH_BASE_URL
    ?? import.meta.env.MAILCOACH_BASE_URL
    ?? 'https://mailcoach.app';
const MAILCOACH_API_TOKEN = (process.env.MAILCOACH_API_TOKEN
    ?? import.meta.env.MAILCOACH_API_TOKEN
    ?? '').trim();
const MAILCOACH_CONTACT_ADMIN_TEMPLATE = process.env.MAILCOACH_CONTACT_ADMIN_TEMPLATE
    ?? import.meta.env.MAILCOACH_CONTACT_ADMIN_TEMPLATE
    ?? '';
const MAILCOACH_CONTACT_USER_TEMPLATE = process.env.MAILCOACH_CONTACT_USER_TEMPLATE
    ?? import.meta.env.MAILCOACH_CONTACT_USER_TEMPLATE
    ?? '';
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL
    ?? import.meta.env.CONTACT_TO_EMAIL
    ?? 'contact@shoplinkr.com';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL
    ?? import.meta.env.CONTACT_FROM_EMAIL
    ?? 'no-reply@shoplinkr.com';
const CONTACT_FROM_NAME = process.env.CONTACT_FROM_NAME
    ?? import.meta.env.CONTACT_FROM_NAME
    ?? 'ShopLinkr Website';
const CONTACT_ADMIN_GREETING_NAME = process.env.CONTACT_ADMIN_GREETING_NAME
    ?? import.meta.env.CONTACT_ADMIN_GREETING_NAME
    ?? 'Team';

function isValidEmail(value: unknown): value is string {
    return typeof value === 'string'
        && value.length <= MAX_EMAIL_LENGTH
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function asString(value: unknown): string {
    return typeof value === 'string' ? value : '';
}

const CONTROL_CHARS_REGEX = new RegExp('[\\u0000-\\u001F\\u007F]', 'g');

function stripControlChars(value: string): string {
    return value.replace(CONTROL_CHARS_REGEX, ' ');
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function toHtmlMessage(value: string): string {
    return escapeHtml(value).replace(/\r?\n/g, '<br>');
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

    let payload: ContactPayload;

    try {
        payload = await request.json() as ContactPayload;
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

    const name = stripControlChars(asString(payload.name)).trim().slice(0, MAX_NAME_LENGTH);
    const email = asString(payload.email).trim().slice(0, MAX_EMAIL_LENGTH);
    const message = asString(payload.message).trim().slice(0, MAX_MESSAGE_LENGTH);
    const phone = stripControlChars(asString(payload.phone)).trim().slice(0, MAX_PHONE_LENGTH);
    const subjectRaw = stripControlChars(asString(payload.subject)).trim().slice(0, MAX_SUBJECT_LENGTH);
    const subject = subjectRaw || 'Contactverzoek via website';
    const consent = payload.consent === true;

    if (name.length < 2) {
        return jsonResponse({
            ok: false,
            error: 'Name too short',
        }, 422);
    }

    if (!isValidEmail(email)) {
        return jsonResponse({
            ok: false,
            error: 'Invalid email',
        }, 422);
    }

    if (message.length < 10) {
        return jsonResponse({
            ok: false,
            error: 'Message too short',
        }, 422);
    }

    if (!consent) {
        return jsonResponse({
            ok: false,
            error: 'Consent required',
        }, 422);
    }

    const isDebug = import.meta.env.DEV === true || import.meta.env.PUBLIC_DEBUG_CONTACT === 'true';

    function configError(varName: string): Response {
        console.error(`[contact] ${varName} niet ingesteld`);

        const body: Record<string, unknown> = {
            ok: false,
            error: 'Server is niet juist geconfigureerd',
        };

        if (isDebug) {
            body.missing = varName;
        }

        return jsonResponse(body, 503);
    }

    if (!MAILCOACH_API_TOKEN) {
        return configError('MAILCOACH_API_TOKEN');
    }

    if (!MAILCOACH_CONTACT_ADMIN_TEMPLATE) {
        return configError('MAILCOACH_CONTACT_ADMIN_TEMPLATE');
    }

    const fromAddress = CONTACT_FROM_NAME
        ? `${CONTACT_FROM_NAME} <${CONTACT_FROM_EMAIL}>`
        : CONTACT_FROM_EMAIL;

    const userAddress = `${name} <${email}>`;

    const baseReplacements = {
        name,
        email,
        phone,
        subject,
        message,
        message_html: toHtmlMessage(message),
        submitted_at: new Date().toLocaleString('nl-NL', {
            timeZone: 'Europe/Amsterdam',
        }),
    };

    const adminReplacements = {
        ...baseReplacements,
        greeting_name: CONTACT_ADMIN_GREETING_NAME,
    };

    const userReplacements = {
        ...baseReplacements,
        greeting_name: name,
    };

    const mailCoachUrl = `${MAILCOACH_BASE_URL.replace(/\/$/, '')}/api/transactional-mails/send`;

    interface SendDebugResult {
        ok: boolean;
        status?: number;
        error?: string;
        body?: unknown;
        sentBody?: Record<string, unknown>;
    }

    const debugLog: Array<Record<string, unknown>> = [];

    async function sendMail(args: {
        mailName: string;
        to: string;
        from: string;
        replyTo: string;
        replacements: Record<string, string>;
    }): Promise<SendDebugResult> {
        const body: Record<string, unknown> = {
            mail_name: args.mailName,
            to: args.to,
            from: args.from,
            reply_to: args.replyTo,
            replacements: args.replacements,
        };

        try {
            const upstream = await fetch(mailCoachUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${MAILCOACH_API_TOKEN}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
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

            return {
                ok: upstream.ok,
                status: upstream.status,
                body: parsed,
                sentBody: body,
            };
        } catch (error) {
            const isTimeout = error instanceof DOMException && error.name === 'TimeoutError';

            return {
                ok: false,
                error: isTimeout
                    ? 'Upstream timeout'
                    : (error instanceof Error ? error.message : String(error)),
                sentBody: body,
            };
        }
    }

    const adminResult = await sendMail({
        mailName: MAILCOACH_CONTACT_ADMIN_TEMPLATE,
        to: CONTACT_TO_EMAIL,
        from: fromAddress,
        replyTo: userAddress,
        replacements: adminReplacements,
    });

    debugLog.push({
        type: 'admin',
        ...adminResult,
    });

    if (!adminResult.ok) {
        console.error('[contact] Admin mail failed', {
            status: adminResult.status,
            error: adminResult.error,
        });

        const errorBody: Record<string, unknown> = {
            ok: false,
            error: 'Mail kon niet verstuurd worden',
        };

        if (isDebug) {
            errorBody.results = debugLog;
            errorBody.sent_url = mailCoachUrl;
        }

        return jsonResponse(errorBody, 502);
    }

    if (MAILCOACH_CONTACT_USER_TEMPLATE) {
        const userResult = await sendMail({
            mailName: MAILCOACH_CONTACT_USER_TEMPLATE,
            to: userAddress,
            from: fromAddress,
            replyTo: `${CONTACT_FROM_NAME} <${CONTACT_TO_EMAIL}>`,
            replacements: userReplacements,
        });

        debugLog.push({
            type: 'user_confirmation',
            ...userResult,
        });

        if (!userResult.ok) {
            console.error('[contact] User confirmation mail failed', {
                status: userResult.status,
                error: userResult.error,
            });
        }
    }

    const successBody: Record<string, unknown> = { ok: true };

    if (isDebug) {
        successBody.results = debugLog;
    }

    return jsonResponse(successBody, 200);
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
