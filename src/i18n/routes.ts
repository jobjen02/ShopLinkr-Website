// Locale-aware routing for the marketing site.
//
// NL is the default locale and is served at the root with NO prefix
// (astro.config.mjs: prefixDefaultLocale: false). EN is served under /en/.
// Because EN slugs are TRANSLATED (e.g. /prijzen <-> /en/pricing), Astro's
// getRelativeLocaleUrl (which only swaps the prefix) is not enough: we keep an
// explicit route-key -> per-locale-slug map here. This map feeds both the
// language switcher and the reciprocal hreflang tags in BaseHead.
//
// NL slugs MUST match the existing file names so NL URLs never change.

export type Locale = 'nl' | 'en';

export const locales: Locale[] = ['nl', 'en'];
export const defaultLang: Locale = 'nl';

// Add a route here as soon as both its NL and EN page exist. A route that is
// only present in NL should NOT be listed: that keeps it out of the language
// switcher and out of the reciprocal hreflang set (no hreflang to a 404).
export const routes = {
    home: { nl: '', en: '' },

    // Core marketing
    pricing: { nl: 'prijzen', en: 'pricing' },
    contact: { nl: 'contact', en: 'contact' },
    about: { nl: 'over-ons', en: 'about' },
    team: { nl: 'team', en: 'team' },
    customerStories: { nl: 'referenties', en: 'customer-stories' },
    faq: { nl: 'veelgestelde-vragen', en: 'faq' },
    cookies: { nl: 'cookies', en: 'cookies' },
    integrations: { nl: 'integraties', en: 'integrations' },
    blog: { nl: 'blogs', en: 'blog' },
    support: { nl: 'support', en: 'support' },

    // Features (functionaliteiten)
    features: { nl: 'functionaliteiten', en: 'features' },
    'features.orders': { nl: 'functionaliteiten/bestellingen', en: 'features/orders' },
    'features.inventory': { nl: 'functionaliteiten/voorraad', en: 'features/inventory' },
    'features.products': { nl: 'functionaliteiten/producten', en: 'features/products' },
    'features.picklists': { nl: 'functionaliteiten/picklijsten', en: 'features/pick-lists' },
    'features.rules': { nl: 'functionaliteiten/regels', en: 'features/rules' },
    'features.purchasing': { nl: 'functionaliteiten/inkoopadvies', en: 'features/purchase-advice' },
    'features.locations': { nl: 'functionaliteiten/locatiebeheer', en: 'features/locations' },
    'features.carriers': { nl: 'functionaliteiten/vervoerders', en: 'features/carriers' },
    'features.returns': { nl: 'functionaliteiten/retouren', en: 'features/returns' },
    'features.customers': { nl: 'functionaliteiten/klanten', en: 'features/customers' },
    'features.deliveries': { nl: 'functionaliteiten/leveringen', en: 'features/deliveries' },
    'features.users': { nl: 'functionaliteiten/gebruikers', en: 'features/users' },
    'features.reports': { nl: 'functionaliteiten/rapporten', en: 'features/reports' },

    // Integration combo landing pages
    'integrations.shopifyBol': { nl: 'integraties/shopify-koppelen-aan-bol-com', en: 'integrations/connect-shopify-to-bol-com' },
    'integrations.wooBol': { nl: 'integraties/woocommerce-koppelen-aan-bol-com', en: 'integrations/connect-woocommerce-to-bol-com' },
    'integrations.wooShopify': { nl: 'integraties/woocommerce-koppelen-aan-shopify', en: 'integrations/connect-woocommerce-to-shopify' },

    // SEO landing pages
    inventoryManagement: { nl: 'voorraadbeheer', en: 'inventory-management' },
    inventorySoftware: { nl: 'voorraadbeheer-software', en: 'inventory-management-software' },
    inventorySystem: { nl: 'voorraadbeheer-systeem', en: 'inventory-management-system' },
    inventoryWebshop: { nl: 'voorraadbeheer-webshop', en: 'webshop-inventory-management' },
    inventoryExcel: { nl: 'voorraadbeheer-excel-template', en: 'inventory-excel-template' },
    bolInventory: { nl: 'bol-voorraadbeheer', en: 'bol-inventory-management' },
    multipleBolAccounts: { nl: 'meerdere-bol-accounts', en: 'multiple-bol-accounts' },
    simpleInventory: { nl: 'simpel-vooraadbeheer', en: 'simple-inventory-management' },
    efficientWebshop: { nl: 'efficient-webshopbeheer', en: 'efficient-webshop-management' },
    wooInventorySync: { nl: 'woocommerce-voorraad-synchronisatie', en: 'woocommerce-inventory-sync' },
    shoplinkerOrShoplinkr: { nl: 'shoplinker-of-shoplinkr', en: 'shoplinker-or-shoplinkr' },
    webwinkelVakdagen: { nl: 'webwinkelvakdagen2026', en: 'webwinkel-vakdagen-2026' },
    returnFormTemplate: { nl: 'retourformulier-template', en: 'return-form-template' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

/**
 * Build the path for a route in a given locale.
 * NL (default) has no prefix; other locales get a /<locale> prefix.
 * Home returns '/' (NL) or '/en' (EN); other routes have no trailing slash.
 */
export function localizedPath(key: RouteKey, locale: Locale): string {
    const slug = routes[key][locale];
    const prefix = locale === defaultLang ? '' : `/${locale}`;
    if (slug === '') {
        return prefix === '' ? '/' : prefix;
    }
    return `${prefix}/${slug}`;
}

/**
 * Localize an internal NL href for the target locale. Mapped routes return their
 * localized path (/prijzen -> /en/pricing); anything not in the map (e.g. an NL
 * feature page with no EN twin yet) is returned unchanged, so EN visitors land
 * on the NL page until it is translated. Pass NL ("source") hrefs only.
 */
export function localizeHref(nlHref: string, locale: Locale): string {
    const match = routeKeyFromPath(nlHref);
    if (match && match.locale === defaultLang) {
        return localizedPath(match.key, locale);
    }
    return nlHref;
}

/**
 * Reverse lookup: given a request pathname, find which mapped route + locale it
 * is. Returns null for any path not in the map (e.g. blog/support pages that
 * have no EN twin yet) so callers can render nothing for those.
 */
export function routeKeyFromPath(pathname: string): { key: RouteKey; locale: Locale } | null {
    const clean = pathname.replace(/^\/+|\/+$/g, '');
    const segments = clean.split('/').filter(Boolean);

    let locale: Locale = defaultLang;
    let rest = clean;
    if (segments[0] === 'en') {
        locale = 'en';
        rest = segments.slice(1).join('/');
    }

    for (const key of Object.keys(routes) as RouteKey[]) {
        if (routes[key][locale] === rest) {
            return { key, locale };
        }
    }
    return null;
}
