// Author registry: single source of truth for the people who write content.
// Used for the visible byline + author-bio block on blog/guide/support articles
// and for the Person `author` node in their JSON-LD. Each author has a stable
// @id (#<slug>) so every page references the same identity, and worksFor links
// to the canonical Organization (#organization, defined in BaseLayout).
//
// Articles pick an author via their frontmatter `author` field (the full name);
// anything unset or unknown falls back to the founder. See SEO-GEO-PLAN.md 2.3.

import type { Locale } from '../i18n/routes';

export type Author = {
    slug: string;
    name: string;
    roleNl: string;
    roleEn: string;
    bioNl: string;
    bioEn: string;
    photo: string;
    linkedin?: string;
};

export const AUTHORS: Author[] = [
    {
        slug: 'job-jenniskens',
        name: 'Job Jenniskens',
        roleNl: 'Oprichter',
        roleEn: 'Founder',
        bioNl: 'Begon ShopLinkr vanuit zijn eigen webshop. Bouwt nog steeds elke dag aan het platform en kent elk hoekje van de code.',
        bioEn: 'Started ShopLinkr from his own webshop. Still builds on the platform every day and knows every corner of the code.',
        photo: '/images/team/rIjDTHDh7F1ucNVPvkRg3dHT2ZQ.png',
        linkedin: 'https://www.linkedin.com/in/jobjen/',
    },
    {
        slug: 'stijn-verhagen',
        name: 'Stijn Verhagen',
        roleNl: 'Marketing',
        roleEn: 'Marketing',
        bioNl: 'Eerste aanspreekpunt voor klanten. Zorgt dat je vraag binnen no time bij de juiste persoon ligt.',
        bioEn: 'First point of contact for customers. Makes sure your question lands with the right person in no time.',
        photo: '/images/team/92PrDnKBY75TXrhH11Ti9A1jU.png',
        linkedin: 'https://www.linkedin.com/in/stijn-verh/',
    },
    {
        slug: 'tommy-van-kessel',
        name: 'Tommy van Kessel',
        roleNl: 'Product Design',
        roleEn: 'Product Design',
        bioNl: 'Maakt het product net dat tikje rustiger. Elke knop, elk scherm, elke flow gaat eerst over zijn tafel.',
        bioEn: 'Makes the product that little bit calmer. Every button, every screen, every flow crosses his desk first.',
        photo: '/images/team/rzPqzsMXycKbFfV8gkOWIaFcJ8.png',
    },
];

const DEFAULT_AUTHOR = AUTHORS[0];

/** Resolve an author by full name (frontmatter `author`), falling back to the founder. */
export function getAuthor(name?: string): Author {
    if (!name) return DEFAULT_AUTHOR;
    return AUTHORS.find((a) => a.name === name) ?? DEFAULT_AUTHOR;
}

/** Resolve an author by their url slug (for the /auteur/[slug] archive route). */
export function getAuthorBySlug(slug?: string): Author | undefined {
    return AUTHORS.find((a) => a.slug === slug);
}

/** Link to an author's archive page. Slug is language-invariant. */
export function authorHref(slug: string, locale: Locale): string {
    return locale === 'en' ? `/en/author/${slug}` : `/auteur/${slug}`;
}

export function authorRole(author: Author, locale: Locale): string {
    return locale === 'en' ? author.roleEn : author.roleNl;
}

export function authorBioText(author: Author, locale: Locale): string {
    return locale === 'en' ? author.bioEn : author.bioNl;
}

/** Visible byline, e.g. "Job Jenniskens, Oprichter". */
export function authorByline(name: string | undefined, locale: Locale): string {
    const a = getAuthor(name);
    return `${a.name}, ${authorRole(a, locale)}`;
}

/** Person node for article JSON-LD, linked to the canonical Organization. */
export function authorSchema(name: string | undefined, locale: Locale) {
    const a = getAuthor(name);
    return {
        '@type': 'Person',
        '@id': `https://www.shoplinkr.com/#${a.slug}`,
        name: a.name,
        jobTitle: authorRole(a, locale),
        ...(a.linkedin && { url: a.linkedin, sameAs: [a.linkedin] }),
        worksFor: { '@id': 'https://www.shoplinkr.com/#organization' },
    };
}

/**
 * The founder Person node, emitted site-wide (from BaseLayout) so the
 * `#job-jenniskens` @id referenced by Organization.founder resolves on every
 * page, not just on the articles the founder authored. Identical shape to
 * authorSchema so the two definitions merge cleanly by @id on article pages.
 */
export function founderPersonSchema(locale: Locale) {
    return authorSchema(DEFAULT_AUTHOR.name, locale);
}
