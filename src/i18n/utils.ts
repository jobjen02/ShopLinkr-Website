// Locale helpers. In .astro files prefer Astro.currentLocale; getLangFromUrl is
// handy for plain functions and for resolving a locale to pass into Vue islands
// (which cannot read Astro.currentLocale on the client).

import { defaultLang, locales, type Locale } from './routes';

/** Resolve the locale from a URL by inspecting the first path segment. */
export function getLangFromUrl(url: URL): Locale {
    const [, seg] = url.pathname.split('/');
    return (locales as string[]).includes(seg) ? (seg as Locale) : defaultLang;
}

export { useTranslations } from './ui';
