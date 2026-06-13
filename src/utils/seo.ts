const SITE_URL = 'https://shoplinkr.com';

type Crumb = [label: string, path: string];

export function breadcrumbs(items: Array<Crumb>): Record<string, unknown> {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map(([name, path], index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name,
            item: `${SITE_URL}${path}`,
        })),
    };
}
