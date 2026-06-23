// English support taxonomy. Mirrors src/data/supportCategories.ts in shape, with
// translated slugs + labels + summaries. The NL_TO_EN_* maps below let the
// article translator set the correct EN category/subcategory slugs in frontmatter
// so EN articles line up with this taxonomy. NL data file is untouched.

import type { SupportCategory } from './supportCategories';

export const supportCategoriesEn: Array<SupportCategory> = [
    {
        slug: 'getting-started',
        label: 'Getting started',
        summary: 'Everything you need to get off to a good start',
        icon: 'fa-duotone fa-solid fa-flag',
        subcategories: [
            { slug: 'introduction', label: 'Introduction', summary: 'Learn what ShopLinkr is and how the platform works' },
            { slug: 'preparation', label: 'Preparation', summary: 'Everything to get well prepared to start with ShopLinkr' },
        ],
    },
    {
        slug: 'account',
        label: 'Account',
        summary: 'Everything to do with your account',
        icon: 'fa-duotone fa-solid fa-user-gear',
        subcategories: [
            { slug: 'billing-and-pricing', label: 'Billing & Pricing', summary: 'Info about the subscription, invoices and the Pay-as-you-go model' },
            { slug: 'subscription', label: 'Subscription', summary: 'Your trial, starting a subscription and everything about billing' },
            { slug: 'access-and-security', label: 'Access & Security', summary: 'Password, two-factor authentication and QR login' },
            { slug: 'users-and-roles', label: 'Users & Roles', summary: 'Invite colleagues and manage permissions' },
        ],
    },
    {
        slug: 'order-processing',
        label: 'Order processing',
        summary: 'Everything around processing your orders',
        icon: 'fa-duotone fa-solid fa-cart-flatbed-boxes',
        subcategories: [
            { slug: 'orders', label: 'Orders', summary: 'From arrival to shipping: all about processing orders' },
            { slug: 'pick-lists', label: 'Pick lists', summary: 'Generate pick lists, pick products and set up packing stations' },
            { slug: 'rules', label: 'Rules', summary: 'Automate your order processing with smart rules' },
            { slug: 'returns', label: 'Returns', summary: 'Receive, assess and process returns' },
        ],
    },
    {
        slug: 'inventory-management',
        label: 'Inventory management',
        summary: 'Everything around managing your stock',
        icon: 'fa-duotone fa-solid fa-boxes-stacked',
        subcategories: [
            { slug: 'products', label: 'Products', summary: 'Product management, bundles, stock sources and more' },
            { slug: 'stock', label: 'Stock', summary: 'Stock counts, adjustments, notifications and moves' },
            { slug: 'locations', label: 'Locations', summary: 'Create warehouse locations and link products to them' },
            { slug: 'purchasing', label: 'Purchasing', summary: 'Manage suppliers, create and receive deliveries' },
        ],
    },
    {
        slug: 'reports-and-insights',
        label: 'Reports & Insights',
        summary: 'Get insight into your performance and figures',
        icon: 'fa-duotone fa-solid fa-chart-line',
        subcategories: [
            { slug: 'reports', label: 'Reports', summary: 'View reports on product performance and stock value' },
        ],
    },
    {
        slug: 'integrations',
        label: 'Integrations',
        summary: 'All integrations at a glance',
        icon: 'fa-duotone fa-solid fa-plug',
        subcategories: [
            { slug: 'webshops-and-marketplaces', label: 'Webshops & Marketplaces', summary: 'Connect your webshop or marketplace to ShopLinkr' },
            { slug: 'carriers', label: 'Carriers', summary: 'Connect carriers like Sendcloud, MyParcel and DPD' },
            { slug: 'autoprint', label: 'AutoPrint', summary: 'Print shipping labels automatically with PrintNode' },
            { slug: 'api', label: 'API', summary: 'Integrate your own systems with ShopLinkr via the public API' },
        ],
    },
];

export const supportCategoriesEnBySlug: Record<string, SupportCategory> = supportCategoriesEn.reduce(
    (acc, category) => {
        acc[category.slug] = category;
        return acc;
    },
    {} as Record<string, SupportCategory>,
);

// NL -> EN slug maps (used by the article translator + for cross-locale linking).
export const CATEGORY_SLUG_NL_TO_EN: Record<string, string> = {
    'aan-de-slag': 'getting-started',
    account: 'account',
    orderverwerking: 'order-processing',
    voorraadbeheer: 'inventory-management',
    'rapportages-en-inzicht': 'reports-and-insights',
    integraties: 'integrations',
};

export const SUBCATEGORY_SLUG_NL_TO_EN: Record<string, string> = {
    introductie: 'introduction',
    voorbereiding: 'preparation',
    'facturatie-en-prijzen': 'billing-and-pricing',
    abonnement: 'subscription',
    'toegang-en-beveiliging': 'access-and-security',
    'gebruikers-en-rollen': 'users-and-roles',
    bestellingen: 'orders',
    picklijsten: 'pick-lists',
    regels: 'rules',
    retouren: 'returns',
    producten: 'products',
    voorraad: 'stock',
    locaties: 'locations',
    inkoop: 'purchasing',
    rapporten: 'reports',
    'webshops-en-marketplaces': 'webshops-and-marketplaces',
    vervoerders: 'carriers',
    autoprint: 'autoprint',
    api: 'api',
};
