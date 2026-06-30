import type { Locale } from '../i18n/routes';

// Single source of truth for how article dates surface on blog + guide pages.
// Visible byline shows the freshest date only: "Bijgewerkt op X" when the
// content was genuinely revised (updatedAt newer than publishedAt), otherwise
// "Geplaatst op X". The schema always carries both datePublished and
// dateModified separately, so hiding the publish date here costs no signal.

const LABELS = {
    nl: { published: 'Geplaatst op', updated: 'Bijgewerkt op' },
    en: { published: 'Published on', updated: 'Updated on' },
} as const;

function formatDate(date: Date, locale: Locale): string {
    return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'nl-NL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
}

// True only when updatedAt exists and is strictly newer than publishedAt, so a
// same-day or stale updatedAt never fakes freshness.
function isRevised(publishedAt: Date, updatedAt?: Date): updatedAt is Date {
    return !!updatedAt && updatedAt.getTime() > publishedAt.getTime();
}

// The date the page exposes as dateModified in its schema.
export function dateModified(publishedAt: Date, updatedAt?: Date): Date {
    return isRevised(publishedAt, updatedAt) ? updatedAt : publishedAt;
}

// The visible byline string, e.g. "Bijgewerkt op 30 juni 2026".
export function articleDateLabel(publishedAt: Date, updatedAt: Date | undefined, locale: Locale): string {
    const l = LABELS[locale === 'en' ? 'en' : 'nl'];
    return isRevised(publishedAt, updatedAt)
        ? `${l.updated} ${formatDate(updatedAt, locale)}`
        : `${l.published} ${formatDate(publishedAt, locale)}`;
}
