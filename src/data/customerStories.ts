// Customer stories, the single source of truth for both the /referenties index
// (compact cards) and each /referenties/<slug> detail page. Add a story by
// appending an object here: the card and the detail route appear automatically.
//
// Company name, logo, url and videoId are locale-invariant and live at the top
// level. url and logo are nullable and are omitted from schema when absent, never
// invented. The prose is per-locale. `teaser`/`highlight` feed the index card.
// `intro`/`challenge`/`solution`/`metric` are the core detail narrative; `facts`,
// `quote`/`quoteAuthor` and `extra` are optional richer elements that a story only
// fills when we actually have that material (nothing here is invented).

import type { Locale } from '../i18n/routes';

export interface CustomerFact {
    label: string;
    value: string;
}

export interface CustomerSection {
    label: string;
    body: string;
}

export interface CustomerStoryContent {
    teaser: string; // one-line hook for the index card
    highlight: string; // short punchy stat for the card badge
    intro: string; // "Over <klant>" on the detail page
    challenge: string;
    solution: string;
    metric: string; // full result line on the detail page
    facts?: CustomerFact[]; // optional quick-facts panel; only real, per-customer facts
    quote?: string; // pull quote between sections
    quoteAuthor?: string;
    extra?: CustomerSection[]; // optional extra narrative blocks (e.g. "De toekomst")
}

export interface CustomerStory {
    slug: string;
    company: string;
    logo: string | null;
    url: string | null;
    videoId: string;
    content: Record<Locale, CustomerStoryContent>;
}

export const customerStories: CustomerStory[] = [
    {
        slug: 'strandwinkel',
        company: 'Strandwinkel',
        logo: '/testimonials/Strandwinkel.png',
        url: 'https://www.strandwinkel.nl',
        videoId: 'KJVlKQxHupU',
        content: {
            nl: {
                teaser: 'Alles voor een dag strand, vanuit een zelf opgebouwd magazijn in De Lier.',
                highlight: '700 euro per jaar bespaard',
                intro: 'Strandwinkel in De Lier verkoopt alles voor een dag aan het strand, van parasols tot strandbedjes. Het bedrijf komt voort uit Strand Nederland, de overkoepelende organisatie van alle strandpaviljoens. Toen tijdens corona de beurzen en magazines wegvielen, begon Stephan met zijn team van zes wat producten te verkopen. Dat groeide uit tot een volwaardige webshop, met een showroom en magazijn die ze volledig zelf hebben opgebouwd.',
                challenge: 'Strandwinkel draaide al op een voorraadsysteem, maar benutte daar maar zo\'n 10% van. Stephan wilde verder professionaliseren en keek naar dure all-in systemen, maar twijfelde bij sommige aanbieders of ze in de praktijk deden wat ze beloofden. Ondertussen liep het orderproces stroef: enkelvoudige bestellingen en orders met meerdere producten hadden elk een eigen picklijst, waar het team steeds tussen moest schakelen.',
                solution: 'Na een testmaand stapte Strandwinkel over op ShopLinkr, met korte lijnen naar de mensen die het systeem zelf bouwen. Nu verwerkt het team alle bestellingen vanuit één plek. Enkelvoudige en meervoudige orders zitten in één picklijst, die ze \'s ochtends in groepjes van 10, 20 of 30 bestellingen klaarzetten. Pakbonnen printen ze niet meer, alles gaat digitaal. Nieuwe medewerkers en stagiairs draaien binnen twintig minuten mee.',
                metric: '700 euro per jaar bespaard door pakbonnen digitaal te verwerken, en nieuwe medewerkers zijn binnen twintig minuten ingewerkt.',
                facts: [
                    { label: 'Eigenaar', value: 'Stephan' },
                    { label: 'Waar', value: 'De Lier' },
                    { label: 'Specialisme', value: 'Alles voor het strand' },
                    { label: 'Ontstaan', value: 'Tijdens corona, uit Strand Nederland' },
                    { label: 'Klant sinds', value: '2025' },
                ],
                quote: 'Meestal kunnen nieuwe mensen er binnen een kwartier tot twintig minuten mee werken. Voor ons is dat ideaal.',
                quoteAuthor: 'Stephan, Strandwinkel',
                extra: [
                    {
                        label: 'De toekomst',
                        body: 'Stephan ziet in de hele handel de marges dalen, en daarmee de tijd voor kwaliteit. Zijn droom gaat de andere kant op: minder wegwerp, meer duurzame producten. Liever een parasol waar iemand vijf jaar mee doet dan eentje die na een seizoen de container in gaat. Betere kwaliteit voor de klant, meer plezier voor het team, en een eerlijk product voor een eerlijke prijs.',
                    },
                ],
            },
            en: {
                teaser: 'Everything for a day at the beach, from a self-built warehouse in De Lier.',
                highlight: '€700 saved per year',
                intro: 'Strandwinkel, based in De Lier, sells everything you need for a day at the beach, from parasols to sun loungers. The business grew out of Strand Nederland, the umbrella organisation for all beach pavilions in the country. When trade fairs and magazines fell away during covid, Stephan and his team of six started selling a few products. That grew into a full webshop, with a showroom and warehouse they built entirely themselves.',
                challenge: 'Strandwinkel already ran an inventory system, but used only about 10% of it. Stephan wanted to professionalise further and looked at expensive all-in-one systems, but doubted whether some providers actually delivered in practice. Meanwhile the order process was clunky: single-item orders and multi-product orders each had their own pick list, and the team kept switching between them.',
                solution: 'After a one-month trial, Strandwinkel switched to ShopLinkr, with direct lines to the people who build the system themselves. The team now handles every order from one place. Single and multi-product orders sit in one pick list, which they prepare each morning in batches of 10, 20 or 30 orders. They no longer print packing slips; everything is digital. New staff and interns are up to speed within twenty minutes.',
                metric: '€700 saved per year by handling packing slips digitally, and new staff are trained in under twenty minutes.',
                facts: [
                    { label: 'Owner', value: 'Stephan' },
                    { label: 'Location', value: 'De Lier' },
                    { label: 'Focus', value: 'Everything for the beach' },
                    { label: 'Origins', value: 'During covid, from Strand Nederland' },
                    { label: 'Customer since', value: '2025' },
                ],
                quote: 'New people can usually work with it within fifteen to twenty minutes. For us that is ideal.',
                quoteAuthor: 'Stephan, Strandwinkel',
                extra: [
                    {
                        label: 'Looking ahead',
                        body: 'Stephan sees margins shrinking across the trade, and with them the time left for quality. His ambition points the other way: less throwaway, more durable products. He would rather sell a parasol that lasts five years than one that ends up in the bin after a season. Better quality for the customer, more enjoyment for the team, and a fair product for a fair price.',
                    },
                ],
            },
        },
    },
    {
        slug: 'schoongedaan',
        company: 'Schoongedaan.nl',
        logo: '/testimonials/Schoongedaan.png',
        url: 'https://schoongedaan.nl',
        videoId: 'PZq1V6Unp_U',
        content: {
            nl: {
                teaser: 'Van een kastje naast zijn bureau naar honderden foutloze orders per dag.',
                highlight: '60 naar 500 orders per dag',
                intro: 'Jasper startte Schoongedaan in 2023 vanuit een kastje naast zijn bureau. Inmiddels runt hij een snelgroeiend bedrijf in Nieuwegein, gespecialiseerd in schoonmaakmiddelen voor vloeren, keukens, zwembaden en nog veel meer. Via bol, Kaufland en zijn eigen webshop levert hij dagelijks honderden bestellingen.',
                challenge: 'Door snelle groei raakte het oude magazijn al snel chaotisch. Producten stonden door elkaar en orderpicken kostte veel tijd. Jasper kon maximaal 60 bestellingen per dag verwerken en liep tegen fouten, retouren en frustratie aan.',
                solution: 'Met ShopLinkr bracht Jasper structuur in zijn magazijn en koppelde hij al zijn verkoopkanalen. Dankzij slimme picklijsten en mobiele barcodescanners is het pick- en pack-proces nu volledig geautomatiseerd. Bestellingen, voorraad, verzending en zelfs retouren regelt hij vanuit één systeem, waardoor Jasper dagelijks honderden bestellingen foutloos verwerkt.',
                metric: 'Van 60 bestellingen per dag naar 150 tot 250 bestellingen, met pieken van 500 bestellingen op maandag.',
                facts: [
                    { label: 'Eigenaar', value: 'Jasper de Waard' },
                    { label: 'Waar', value: 'Nieuwegein' },
                    { label: 'Specialisme', value: 'Alles voor de schoonmaak' },
                    { label: 'Opgericht', value: '2023' },
                    { label: 'Klant sinds', value: '2024' },
                ],
                quote: 'Met ShopLinkr besparen we dagelijks enorm veel tijd. We hebben nu maar 1 medewerker in dienst in plaats van 5, en het gaat nu nog steeds efficiënter.',
                quoteAuthor: 'Jasper de Waard, Schoongedaan',
            },
            en: {
                teaser: 'From a cabinet beside his desk to hundreds of error-free orders a day.',
                highlight: '60 to 500 orders a day',
                intro: 'Jasper started Schoongedaan in 2023 from a little cabinet next to his desk. Today he runs a fast-growing company in Nieuwegein, specialized in cleaning products for floors, kitchens, swimming pools and much more. Through bol, Kaufland and his own webshop he ships hundreds of orders every day.',
                challenge: 'Rapid growth quickly turned the old warehouse into chaos. Products were mixed up and order picking took a lot of time. Jasper could process at most 60 orders a day and kept running into mistakes, returns and frustration.',
                solution: 'With ShopLinkr, Jasper brought structure to his warehouse and connected all of his sales channels. Thanks to smart pick lists and mobile barcode scanners, the pick-and-pack process is now fully automated. He handles orders, inventory, shipping and even returns from a single system, which lets Jasper process hundreds of orders a day without errors.',
                metric: 'From 60 orders a day to 150-250, with peaks of 500 on Mondays.',
                facts: [
                    { label: 'Owner', value: 'Jasper de Waard' },
                    { label: 'Location', value: 'Nieuwegein' },
                    { label: 'Focus', value: 'Everything for cleaning' },
                    { label: 'Founded', value: '2023' },
                    { label: 'Customer since', value: '2024' },
                ],
                quote: 'With ShopLinkr we save a huge amount of time every day. We now run with just 1 employee instead of 5, and it still works more efficiently than before.',
                quoteAuthor: 'Jasper de Waard, Schoongedaan',
            },
        },
    },
];

export function findCustomerStory(slug: string): CustomerStory | undefined {
    return customerStories.find((s) => s.slug === slug);
}
