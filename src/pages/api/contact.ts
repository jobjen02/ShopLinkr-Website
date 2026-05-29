import type { APIRoute } from 'astro';

export const prerender = false;

interface ContactPayload {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
    consent?: boolean;
    website?: string;
}

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
    return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
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

export const POST: APIRoute = async ({ request }) => {
    let payload: ContactPayload;

    try {
        payload = await request.json() as ContactPayload;
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

    const name = (payload.name ?? '').trim();
    const email = (payload.email ?? '').trim();
    const message = (payload.message ?? '').trim();
    const phone = (payload.phone ?? '').trim();
    const subject = (payload.subject ?? '').trim() || 'Contactverzoek via website';

    if (name.length < 2) {
        return new Response(
            JSON.stringify({ ok: false, error: 'Name too short' }),
            { status: 422, headers: { 'Content-Type': 'application/json' } },
        );
    }

    if (!isValidEmail(email)) {
        return new Response(
            JSON.stringify({ ok: false, error: 'Invalid email' }),
            { status: 422, headers: { 'Content-Type': 'application/json' } },
        );
    }

    if (message.length < 10) {
        return new Response(
            JSON.stringify({ ok: false, error: 'Message too short' }),
            { status: 422, headers: { 'Content-Type': 'application/json' } },
        );
    }

    if (!payload.consent) {
        return new Response(
            JSON.stringify({ ok: false, error: 'Consent required' }),
            { status: 422, headers: { 'Content-Type': 'application/json' } },
        );
    }

    const isDebugConfig = import.meta.env.DEV === true || import.meta.env.PUBLIC_DEBUG_CONTACT === 'true';

    function configError(varName: string): Response {
        console.error(`[contact] ${varName} niet ingesteld`);

        const body: Record<string, unknown> = {
            ok: false,
            error: 'Server is niet juist geconfigureerd',
        };

        if (isDebugConfig) {
            body.missing = varName;
        }

        return new Response(
            JSON.stringify(body),
            { status: 503, headers: { 'Content-Type': 'application/json' } },
        );
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
        submitted_at: new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' }),
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
    const isDebug = import.meta.env.DEV === true || import.meta.env.PUBLIC_DEBUG_CONTACT === 'true';

    const debugLog: Array<Record<string, unknown>> = [];

    interface SendResult {
        ok: boolean;
        status?: number;
        body?: unknown;
        sentBody?: Record<string, unknown>;
        error?: string;
    }

    async function sendMail(args: {
        mailName: string;
        to: string;
        from: string;
        replyTo: string;
        replacements: Record<string, string>;
    }): Promise<SendResult> {
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
            return {
                ok: false,
                error: error instanceof Error ? error.message : String(error),
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

    debugLog.push({ type: 'admin', ...adminResult });

    if (!adminResult.ok) {
        console.error('[contact] Admin mail failed', adminResult);

        const errorBody: Record<string, unknown> = {
            ok: false,
            error: 'Mail kon niet verstuurd worden',
        };

        if (isDebug) {
            errorBody.results = debugLog;
            errorBody.sent_url = mailCoachUrl;
        }

        return new Response(
            JSON.stringify(errorBody),
            { status: 502, headers: { 'Content-Type': 'application/json' } },
        );
    }

    if (MAILCOACH_CONTACT_USER_TEMPLATE) {
        const userResult = await sendMail({
            mailName: MAILCOACH_CONTACT_USER_TEMPLATE,
            to: userAddress,
            from: fromAddress,
            replyTo: `${CONTACT_FROM_NAME} <${CONTACT_TO_EMAIL}>`,
            replacements: userReplacements,
        });

        debugLog.push({ type: 'user_confirmation', ...userResult });

        if (!userResult.ok) {
            console.error('[contact] User confirmation mail failed', userResult);
        }
    }

    const successBody: Record<string, unknown> = { ok: true };

    if (isDebug) {
        successBody.results = debugLog;
    }

    return new Response(
        JSON.stringify(successBody),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
};

export const GET: APIRoute = () => {
    return new Response(
        JSON.stringify({ ok: false, error: 'Method not allowed' }),
        { status: 405, headers: { 'Content-Type': 'application/json', Allow: 'POST' } },
    );
};
