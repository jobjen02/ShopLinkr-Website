// Central locale-keyed data registry.
//
// Goal: NEVER scatter `locale === 'en' ? xEn : x` ternaries through the app.
// Define each piece of locale-specific data ONCE here, keyed by locale, and
// look it up by locale at the call site. Adding a new language becomes a
// localised, compiler-checked change: add the key to each Record below and
// TypeScript forces you to provide every dataset. No call site has to change.

import type { Locale } from './routes';
import { faqsByPage, faqCategories as faqCategoriesNl, type FaqItem, type FaqCategory } from '../data/faqs';
import { faqsByPageEn, faqCategories as faqCategoriesEn } from '../data/faqs-en';
import { supportCategories, type SupportCategory } from '../data/supportCategories';
import { supportCategoriesEn } from '../data/supportCategories-en';

/** Wrap a per-locale record as a typed lookup: `pick(map)(locale)`. */
function pick<T>(map: Record<Locale, T>) {
    return (locale: Locale): T => map[locale];
}

/** FAQ items grouped by page key, for the given locale. */
export const faqsByPageFor = pick<Record<string, FaqItem[]>>({ nl: faqsByPage, en: faqsByPageEn });

/** FAQ categories for the given locale. */
export const faqCategoriesFor = pick<FaqCategory[]>({ nl: faqCategoriesNl, en: faqCategoriesEn });

/** Support categories for the given locale. */
export const supportCategoriesFor = pick<SupportCategory[]>({ nl: supportCategories, en: supportCategoriesEn });

/**
 * Astro content-collection names per logical collection + locale. Use with
 * getCollection(collectionName('blogs', locale)) so the locale->collection
 * mapping lives in exactly one place.
 */
export const collections = {
    blogs: { nl: 'blogs', en: 'blogsEn' },
    seo: { nl: 'seoPages', en: 'seoPagesEn' },
    support: { nl: 'supportArticles', en: 'supportArticlesEn' },
    integrations: { nl: 'integrations', en: 'integrationsEn' },
} as const satisfies Record<string, Record<Locale, string>>;

export function collectionName<K extends keyof typeof collections>(key: K, locale: Locale): (typeof collections)[K][Locale] {
    return collections[key][locale];
}

/** Per-locale metadata: BCP-47 tag (Intl / inLanguage) and OpenGraph locale. */
export const localeMeta: Record<Locale, { bcp47: string; og: string }> = {
    nl: { bcp47: 'nl-NL', og: 'nl_NL' },
    en: { bcp47: 'en-US', og: 'en_US' },
};
