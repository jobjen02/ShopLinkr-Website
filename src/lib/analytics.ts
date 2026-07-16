/**
 * Central analytics layer for ShopLinkr.
 *
 * The site loads Google Tag Manager (container GTM-M33XL5PD, in BaseHead.astro).
 * Instead of talking to GA4 directly, we push clean, semantic events onto
 * `window.dataLayer`; the GTM container forwards them to GA4 as events and
 * conversions. This keeps every tag in GTM and avoids double-tagging.
 *
 * No personal data is ever pushed from here — only interaction metadata (which
 * CTA, where on the page, which language). The form helpers send counts and
 * identifiers, never the name/email a visitor typed.
 *
 * See docs/analytics-events.md for the full event catalog and the GTM/GA4 setup
 * steps that turn these dataLayer events into reports and conversions.
 */

import { externalLinks } from '../data/externalLinks';

declare global {
    interface Window {
        dataLayer?: Array<Record<string, unknown>>;
    }
}

/**
 * GA4-facing event names. Keep these in sync with the GTM custom-event triggers
 * documented in docs/analytics-events.md.
 */
export const EVENTS = {
    demoBookingClick: 'demo_booking_click',
    registerClick: 'register_click',
    loginClick: 'login_click',
    outboundClick: 'outbound_click',
    generateLead: 'generate_lead',
    newsletterSignup: 'newsletter_signup',
    pricingCalculatorUse: 'pricing_calculator_use',
} as const;

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

/**
 * Params attached to every event automatically, read from the DOM at push time.
 * This is the single place to set site-wide defaults — callers never pass these,
 * and an explicit param of the same name still wins over the default.
 */
function defaultParams(): AnalyticsParams {
    if (typeof document === 'undefined') {
        return {};
    }
    return {
        page_language: document.documentElement.lang || undefined,
        page_path: window.location.pathname,
    };
}

/**
 * Push a semantic event onto the GTM dataLayer. A no-op on the server, and safe
 * to call before GTM has finished loading — GTM replays whatever it finds queued.
 * Global defaults (see defaultParams) are merged in first; `undefined` params are
 * dropped so GA4 never receives empty values.
 */
export function track(event: string, params: AnalyticsParams = {}): void {
    if (typeof window === 'undefined') {
        return;
    }

    window.dataLayer = window.dataLayer || [];

    const merged: AnalyticsParams = { ...defaultParams(), ...params };
    const payload: Record<string, unknown> = { event };
    for (const [key, value] of Object.entries(merged)) {
        if (value !== undefined) {
            payload[key] = value;
        }
    }

    window.dataLayer.push(payload);
}

// --- Delegated click tracking --------------------------------------------

interface CtaRule {
    host: string;
    pathPrefix?: string;
    event: string;
    ctaId: string;
}

// Ordered most-specific first: the registration URL lives under the same host as
// the login/app URL, so it must be classified before the catch-all login rule.
const CTA_RULES: Array<CtaRule> = (() => {
    const register = new URL(externalLinks.register);
    const demo = new URL(externalLinks.demoBooking);
    const login = new URL(externalLinks.login);

    return [
        { host: register.host, pathPrefix: register.pathname, event: EVENTS.registerClick, ctaId: 'register' },
        { host: demo.host, pathPrefix: '/widget/booking', event: EVENTS.demoBookingClick, ctaId: 'demo_booking' },
        { host: login.host, event: EVENTS.loginClick, ctaId: 'login' },
    ];
})();

function classify(url: URL): CtaRule | null {
    for (const rule of CTA_RULES) {
        if (url.host !== rule.host) {
            continue;
        }
        if (rule.pathPrefix && !url.pathname.startsWith(rule.pathPrefix)) {
            continue;
        }
        return rule;
    }
    return null;
}

// Best-effort location of a link, without having to annotate every button. Key
// sections (hero, cta banner, pricing) carry an explicit data-analytics-location;
// header/footer/mobile menu are detected from the existing markup; anything else
// falls back to page_body (the page path still tells you which page it was on).
function locationOf(anchor: Element): string {
    const marked = anchor.closest<HTMLElement>('[data-analytics-location]');
    if (marked?.dataset.analyticsLocation) {
        return marked.dataset.analyticsLocation;
    }
    if (anchor.closest('#mobile-menu')) {
        return 'mobile_menu';
    }
    if (anchor.closest('#site-header')) {
        return 'header';
    }
    if (anchor.closest('footer')) {
        return 'footer';
    }
    return 'page_body';
}

function textOf(anchor: Element): string {
    return (anchor.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100);
}

function onClick(event: MouseEvent): void {
    const start = event.target as Element | null;
    const anchor = start?.closest<HTMLAnchorElement>('a[href]');
    if (!anchor) {
        return;
    }

    let url: URL;
    try {
        url = new URL(anchor.href);
    } catch {
        return;
    }

    const cta = classify(url);

    if (cta) {
        track(cta.event, {
            cta_id: cta.ctaId,
            cta_text: textOf(anchor),
            cta_location: locationOf(anchor),
            link_url: url.href,
        });
        return;
    }

    const isOutbound =
        url.host !== window.location.host && (url.protocol === 'https:' || url.protocol === 'http:');
    if (isOutbound) {
        track(EVENTS.outboundClick, {
            link_url: url.href,
            link_domain: url.host,
            link_text: textOf(anchor),
            cta_location: locationOf(anchor),
        });
    }
}

let started = false;

/**
 * Attach a single delegated click listener that emits CTA and outbound-link
 * events. Idempotent — call once on the client (BaseLayout does this globally).
 * Capture phase so a click is still seen even if a component stops its bubbling.
 */
export function initClickTracking(): void {
    if (typeof document === 'undefined' || started) {
        return;
    }
    started = true;
    document.addEventListener('click', onClick, { capture: true });
}
