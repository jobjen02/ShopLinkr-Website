export interface SupportSubcategory {
    slug: string;
    label: string;
    summary?: string;
}

export interface SupportCategory {
    slug: string;
    label: string;
    summary: string;
    icon: string;
    subcategories: Array<SupportSubcategory>;
}

export const supportCategories: Array<SupportCategory> = [
    {
        slug: 'aan-de-slag',
        label: 'Aan de slag',
        summary: 'Alle informatie die je nodig hebt om goed te kunnen starten',
        icon: 'fa-duotone fa-solid fa-flag',
        subcategories: [
            {
                slug: 'introductie',
                label: 'Introductie',
                summary: 'Leer wat ShopLinkr is en hoe het platform werkt',
            },
            {
                slug: 'voorbereiding',
                label: 'Voorbereiding',
                summary: 'Alles om goed voorbereid van start te gaan met ShopLinkr',
            },
        ],
    },
    {
        slug: 'account',
        label: 'Account',
        summary: 'Alles met betrekking tot je account',
        icon: 'fa-duotone fa-solid fa-user-gear',
        subcategories: [
            {
                slug: 'facturatie-en-prijzen',
                label: 'Facturatie & Prijzen',
                summary: 'Informatie over het abonnement, facturen en het Pay as you Go model',
            },
            {
                slug: 'abonnement',
                label: 'Abonnement',
                summary: 'Je proefperiode, abonnement starten en alles over facturatie',
            },
            {
                slug: 'toegang-en-beveiliging',
                label: 'Toegang & Beveiliging',
                summary: 'Wachtwoord, tweefactorauthenticatie en QR-login',
            },
            {
                slug: 'gebruikers-en-rollen',
                label: 'Gebruikers & Rollen',
                summary: "Collega's uitnodigen en rechten beheren",
            },
        ],
    },
    {
        slug: 'orderverwerking',
        label: 'Orderverwerking',
        summary: 'Alles rondom het verwerken van je bestellingen',
        icon: 'fa-duotone fa-solid fa-cart-flatbed-boxes',
        subcategories: [
            {
                slug: 'bestellingen',
                label: 'Bestellingen',
                summary: 'Van binnenkomst tot verzending: alles over het verwerken van bestellingen',
            },
            {
                slug: 'picklijsten',
                label: 'Picklijsten',
                summary: 'Picklijsten genereren, producten picken en inpakstations instellen',
            },
            {
                slug: 'regels',
                label: 'Regels',
                summary: 'Automatiseer je orderverwerking met slimme regels',
            },
            {
                slug: 'retouren',
                label: 'Retouren',
                summary: 'Retouren ontvangen, beoordelen en verwerken',
            },
        ],
    },
    {
        slug: 'voorraadbeheer',
        label: 'Voorraadbeheer',
        summary: 'Alles rondom het beheren van je voorraad',
        icon: 'fa-duotone fa-solid fa-boxes-stacked',
        subcategories: [
            {
                slug: 'producten',
                label: 'Producten',
                summary: 'Productbeheer, bundels, voorraadbronnen en meer',
            },
            {
                slug: 'voorraad',
                label: 'Voorraad',
                summary: 'Voorraadtellingen, mutaties, notificaties en verplaatsingen',
            },
            {
                slug: 'locaties',
                label: 'Locaties',
                summary: 'Magazijnlocaties aanmaken en producten eraan koppelen',
            },
            {
                slug: 'inkoop',
                label: 'Inkoop',
                summary: 'Leveranciers beheren, leveringen aanmaken en ontvangen',
            },
        ],
    },
    {
        slug: 'rapportages-en-inzicht',
        label: 'Rapportages & Inzicht',
        summary: 'Krijg inzicht in je prestaties en cijfers',
        icon: 'fa-duotone fa-solid fa-chart-line',
        subcategories: [
            {
                slug: 'rapporten',
                label: 'Rapporten',
                summary: 'Bekijk rapporten over je productprestaties en voorraadwaarde',
            },
        ],
    },
    {
        slug: 'integraties',
        label: 'Integraties',
        summary: 'Alle integraties op een rijtje',
        icon: 'fa-duotone fa-solid fa-plug',
        subcategories: [
            {
                slug: 'webshops-en-marketplaces',
                label: 'Webshops & Marketplaces',
                summary: 'Koppel je webshop of marketplace aan ShopLinkr',
            },
            {
                slug: 'vervoerders',
                label: 'Vervoerders',
                summary: 'Koppel vervoerders zoals Sendcloud, MyParcel en DPD',
            },
            {
                slug: 'autoprint',
                label: 'AutoPrint',
                summary: 'Print verzendlabels automatisch met PrintNode',
            },
            {
                slug: 'api',
                label: 'API',
                summary: 'Integreer je eigen systemen met ShopLinkr via de publieke API',
            },
        ],
    },
];

export const supportCategoriesBySlug: Record<string, SupportCategory> = supportCategories.reduce(
    (acc, category) => {
        acc[category.slug] = category;
        return acc;
    },
    {} as Record<string, SupportCategory>,
);

export function findSubcategoryBySlug(category: SupportCategory, slug: string): SupportSubcategory | undefined {
    return category.subcategories.find((s) => s.slug === slug);
}
