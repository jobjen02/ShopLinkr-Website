// Best-effort in-memory rate limiter for the serverless API routes.
//
// Vercel functions are ephemeral and can run on several instances at once, so
// this counter lives per warm instance and is NOT a hard global guarantee. It
// does stop the obvious abuse this protects against: a single source hammering
// /api/contact or /api/newsletter to spam mail to third parties. For a hard
// global limit, put a Vercel WAF rule or Upstash Ratelimit in front of these
// routes; this util is the zero-infra floor.

interface Bucket {
    count: number;
    resetAt: number;
}

const store = new Map<string, Bucket>();
let lastSweep = 0;

// Drop expired buckets occasionally so the map cannot grow unbounded on a
// long-lived instance. Cheap: at most once per minute.
function sweep(now: number): void {
    if (now - lastSweep < 60_000) {
        return;
    }

    lastSweep = now;

    for (const [key, bucket] of store) {
        if (bucket.resetAt <= now) {
            store.delete(key);
        }
    }
}

export interface RateLimitResult {
    ok: boolean;
    retryAfterSeconds: number;
}

// Fixed-window counter: `limit` requests per `windowMs` per key. A fixed window
// can allow up to 2x the limit across a window boundary, which is fine for this
// use case (mail-spam mitigation, not billing).
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
    const now = Date.now();

    sweep(now);

    const bucket = store.get(key);

    if (!bucket || bucket.resetAt <= now) {
        store.set(key, { count: 1, resetAt: now + windowMs });
        return { ok: true, retryAfterSeconds: 0 };
    }

    if (bucket.count >= limit) {
        return {
            ok: false,
            retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
        };
    }

    bucket.count += 1;
    return { ok: true, retryAfterSeconds: 0 };
}

// Client IP from the proxy headers Vercel sets, with the Astro-provided address
// as a fallback. x-forwarded-for is a comma-separated list; the first entry is
// the originating client.
export function getClientIp(request: Request, fallback?: string | null): string {
    const forwardedFor = request.headers.get('x-forwarded-for');

    if (forwardedFor) {
        const first = forwardedFor.split(',')[0]?.trim();

        if (first) {
            return first;
        }
    }

    const realIp = request.headers.get('x-real-ip');

    if (realIp) {
        return realIp.trim();
    }

    return fallback?.trim() || 'unknown';
}
