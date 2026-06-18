// Translation registry. Maps each locale to its dictionary and exposes
// useTranslations(locale), which returns the whole dictionary object so
// components can read nested values and arrays with full type-safety:
//
//   const t = useTranslations(locale);
//   t.hero.heading           // string
//   t.showcase.features      // array
//
// Adding a language: create src/i18n/locales/<code>.ts typed as Dictionary,
// add the locale to src/i18n/routes.ts and to `dictionaries` below. The
// compiler then forces the new file to cover every key.

import { defaultLang, type Locale } from './routes';
import nl, { type Dictionary } from './locales/nl';
import en from './locales/en';

export type { Dictionary };

export const dictionaries: Record<Locale, Dictionary> = { nl, en };

// Display names for the language switcher.
export const languages: Record<Locale, string> = {
    nl: 'Nederlands',
    en: 'English',
};

export function useTranslations(locale: Locale): Dictionary {
    return dictionaries[locale] ?? dictionaries[defaultLang];
}
