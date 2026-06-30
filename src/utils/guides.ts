// Shared theme grouping for the SEO "guides" collection, used by both the
// /gidsen hub and the individual guide pages (for related-guide cross-links),
// so the grouping stays in one place.

export type GuideGroup = 'voorraadbeheer' | 'excel' | 'bol' | 'koppelingen';

export const GUIDE_GROUP_ORDER: GuideGroup[] = ['voorraadbeheer', 'excel', 'bol', 'koppelingen'];

export function guideGroupOf(id: string): GuideGroup {
    if (id.includes('hoe-koppel-ik') || id.includes('how-to-connect')) return 'koppelingen';
    if (id.includes('excel')) return 'excel';
    if (id.includes('bol')) return 'bol';
    return 'voorraadbeheer';
}
