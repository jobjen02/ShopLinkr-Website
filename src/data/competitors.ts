// Competitor comparison registry. All copy for the /<x>-vs-shoplinkr and
// /<x>-alternatief landing pages lives here, per locale, so the page
// components stay generic and a new competitor never touches them.
//
// Adding a competitor:
//  1. Add an entry to `competitors` below with both locales filled in. Base
//     every claim about the competitor on their public website, avoid claims
//     about what they can NOT do, leave their exact prices out (they go
//     stale), and record the sources + check date in `sources`/`lastChecked`.
//  2. Add two route keys in src/i18n/routes.ts, named `<key>VsShoplinkr` is
//     not required — any key works; reference them via vsRouteKey/altRouteKey.
//  3. Create four thin page files (NL + EN, vs + alternative) that render
//     CompetitorVsPage / CompetitorAlternativePage with the competitor key
//     (copy src/pages/channeldock-vs-shoplinkr.astro).
//  4. List the new pages in public/llms.txt and public/en/llms.txt.

import type { Locale, RouteKey } from '../i18n/routes';

export interface ComparisonRow {
    label: string;
    shoplinkr: string;
    competitor: string;
}

export interface ComparisonGroup {
    title: string;
    rows: ComparisonRow[];
}

export interface DeepDive {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
}

export interface ComparisonQuote {
    text: string;
    author: string;
    /** Customer story slug; linked via the customerStories route. */
    storySlug: string;
    linkLabel: string;
}

export interface ComparisonFaq {
    question: string;
    answer: string;
}

export interface ComparisonSource {
    label: string;
    url: string;
}

export interface VsContent {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    subheading: string;
    breadcrumbLeaf: string;
    tldrEyebrow: string;
    tldrHeading: string;
    tldrPoints: string[];
    verdictEyebrow: string;
    verdictHeading: string;
    verdictShoplinkrHeading: string;
    verdictShoplinkr: string[];
    verdictCompetitorHeading: string;
    verdictCompetitor: string[];
    tableEyebrow: string;
    tableHeading: string;
    tableIntro: string;
    colFeature: string;
    tableGroups: ComparisonGroup[];
    tableNote: string;
    deepDives: DeepDive[];
    quote: ComparisonQuote;
    strengthsShoplinkrHeading: string;
    strengthsShoplinkr: string[];
    strengthsCompetitorHeading: string;
    strengthsCompetitor: string[];
    switchEyebrow: string;
    switchHeading: string;
    switchBody: string;
    switchLinkLabel: string;
    faqEyebrow: string;
    faqHeading: string;
    faqs: ComparisonFaq[];
    sourcesEyebrow: string;
    sourcesHeading: string;
    sourcesIntro: string;
    sources: ComparisonSource[];
}

export interface AlternativeContent {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    subheading: string;
    breadcrumbLeaf: string;
    reasonsEyebrow: string;
    reasonsHeading: string;
    reasons: Array<{ title: string; body: string }>;
    diffsEyebrow: string;
    diffsHeading: string;
    diffsIntro: string;
    colFeature: string;
    keyDiffs: ComparisonRow[];
    quote: ComparisonQuote;
    honestEyebrow: string;
    honestHeading: string;
    honestBody: string;
    compareLinkLabel: string;
    stepsEyebrow: string;
    stepsHeading: string;
    steps: Array<{ title: string; body: string }>;
    faqEyebrow: string;
    faqHeading: string;
    faqs: ComparisonFaq[];
}

export interface Competitor {
    /** Competitor display name, e.g. 'ChannelDock'. */
    name: string;
    vsRouteKey: RouteKey;
    altRouteKey: RouteKey;
    content: Record<Locale, { vs: VsContent; alternative: AlternativeContent }>;
}

const channeldock: Competitor = {
    name: 'ChannelDock',
    vsRouteKey: 'channeldockVsShoplinkr',
    altRouteKey: 'channeldockAlternative',
    content: {
        nl: {
            vs: {
                title: 'ChannelDock vs ShopLinkr: de complete vergelijking (2026) | ShopLinkr',
                description: 'ChannelDock of ShopLinkr? Vergelijk koppelingen, magazijnfuncties, productbeheer en prijsmodel van beide Nederlandse multichannel-platformen, inclusief bronnen en peildatum.',
                eyebrow: 'Vergelijking',
                heading: 'ChannelDock vs ShopLinkr',
                subheading: 'Twee Nederlandse platformen voor verkopen via meerdere kanalen, elk met een eigen focus. Dit is de complete, eerlijke vergelijking, inclusief bronnen en peildatum, zodat je kiest wat bij jouw webshop past.',
                breadcrumbLeaf: 'ChannelDock vs ShopLinkr',
                tldrEyebrow: 'In het kort',
                tldrHeading: 'Het verschil in één minuut',
                tldrPoints: [
                    'ShopLinkr is magazijnsoftware voor webshops: voorraadsync, orderverwerking, picklijsten, verzendlabels en retouren zitten in één pakket, met een pay-as-you-go prijs per bestelling waarin alle features, kanalen en gebruikers zijn inbegrepen.',
                    'ChannelDock is een multichannel-platform met losse modules: voorraad- en ordersync in de basis, met een volledige WMS-module en PIM-module als betaalde uitbreidingen. Het marketplace-aanbod is internationaler, met onder meer Amazon, eBay en Zalando, en er is een aparte oplossing voor fulfilmentcenters.',
                    'Vuistregel: verkoop je vooral via bol, Kaufland en je eigen webshop en wil je magazijn en verzending in één compleet pakket, kijk dan naar ShopLinkr. Wil je breed internationaal op marketplaces verkopen of zoek je een PIM, dan is ChannelDock het bekijken waard.',
                ],
                verdictEyebrow: 'Snel beslissen',
                verdictHeading: 'Voor wie is welk platform?',
                verdictShoplinkrHeading: 'Kies ShopLinkr als je…',
                verdictShoplinkr: [
                    'dagelijks zelf orders pickt, inpakt en verzendt vanuit je eigen magazijn of schuur',
                    'verkoopt via bol, Kaufland, Shopify, WooCommerce of Lightspeed en je voorraad overal kloppend wilt hebben',
                    'één duidelijke prijs per bestelling wilt, zonder losse modules, kosten per kanaal of add-ons achteraf',
                    'waarde hecht aan Nederlandstalige support en gratis geholpen wilt worden bij de overstap',
                ],
                verdictCompetitorHeading: 'Kies ChannelDock als je…',
                verdictCompetitor: [
                    'breed internationaal verkoopt op marketplaces als Amazon, eBay en Zalando',
                    'een volwaardige PIM-module zoekt voor productcontent, vertalingen en feeds',
                    'een fulfilmentcenter runt dat voor meerdere klanten verzendt',
                    'wilt starten met een gratis instapplan en pas later modules wilt bijschakelen',
                ],
                tableEyebrow: 'Naast elkaar',
                tableHeading: 'ChannelDock en ShopLinkr vergeleken',
                tableIntro: 'Alle belangrijke onderdelen naast elkaar, gegroepeerd per thema en gebaseerd op de publieke informatie van beide partijen.',
                colFeature: 'Onderdeel',
                tableGroups: [
                    {
                        title: 'Verkoopkanalen en koppelingen',
                        rows: [
                            { label: 'Marketplaces', shoplinkr: 'bol (inclusief verzenden via bol) en Kaufland, met diepe tweerichtingssync voor voorraad en orders.', competitor: 'Internationaler aanbod, onder meer Amazon, bol, eBay en Zalando.' },
                            { label: 'Webshops', shoplinkr: 'Shopify, WooCommerce en Lightspeed C-Series.', competitor: 'Onder meer Shopify, WooCommerce, Magento en Shopware.' },
                            { label: 'Vervoerders', shoplinkr: 'Gericht op de Benelux: PostNL, DPD, GLS, MyParcel, Sendcloud, QLS, Innosend, ParcelPro, PakketMail en meer.', competitor: 'Onder meer PostNL, DHL, DPD, GLS en bpost, plus internationale vervoerders zoals FedEx en Royal Mail.' },
                            { label: 'API', shoplinkr: 'Publieke REST API met documentatie, beschikbaar voor alle klanten.', competitor: 'REST API beschikbaar in het betaalde plan.' },
                        ],
                    },
                    {
                        title: 'Magazijn en orderverwerking',
                        rows: [
                            { label: 'Picklijsten en scannen', shoplinkr: 'Slimme pick-routes door je magazijn met barcode scannen, standaard inbegrepen.', competitor: 'Pick & pack in de basis; barcode scannen en route-optimalisatie zitten in de betaalde WMS-uitbreiding.' },
                            { label: 'Locatiebeheer', shoplinkr: 'Hiërarchische magazijnlocaties gekoppeld aan producten, inbegrepen.', competitor: 'Multi-locatie voorraadbeheer in het betaalde plan.' },
                            { label: 'Retouren', shoplinkr: 'Retouren verwerken en terugboeken naar voorraad, inbegrepen.', competitor: 'Retourverwerking als onderdeel van de orderflow.' },
                            { label: 'Automatisering', shoplinkr: 'Regels met condities en acties voor terugkerend werk, plus automatisch labels printen (AutoPrint).', competitor: 'Slimme verzendregels met automatische vervoerderskeuze in het betaalde plan.' },
                            { label: 'Rapportages en inkoop', shoplinkr: 'Bestsellers, dode voorraad, voorraadwaarde, ABC-analyse en slim inkoopadvies, inbegrepen.', competitor: 'Dashboard-analytics en AI-inkoopadvies in het betaalde plan.' },
                        ],
                    },
                    {
                        title: 'Productbeheer',
                        rows: [
                            { label: 'Productoverzicht', shoplinkr: 'Centraal productbeheer met varianten en bundels, inbegrepen.', competitor: 'Productbeheer in de basis; uitgebreid beheer via de PIM-module.' },
                            { label: 'PIM', shoplinkr: 'Geen aparte PIM-module.', competitor: 'Volwaardige PIM-module (productcontent, vertalingen, feeds) als betaalde uitbreiding met een vaste looptijd.' },
                        ],
                    },
                    {
                        title: 'Prijzen en voorwaarden',
                        rows: [
                            { label: 'Prijsmodel', shoplinkr: 'Pay-as-you-go per bestelling; alle features, onbeperkte kanalen en gebruikers inbegrepen.', competitor: 'Gratis tot 500 orders per maand; daarboven een maandprijs plus betaalde extra kanalen en losse modules (WMS, PIM).' },
                            { label: 'Gratis starten', shoplinkr: '14 dagen gratis proberen met je eigen orders, zonder creditcard.', competitor: 'Gratis instapplan tot 500 orders per maand, met beperkingen zoals één magazijn en support via e-mail.' },
                            { label: 'Contract', shoplinkr: 'Maandelijks opzegbaar, geen opzegtermijn.', competitor: 'Maandelijks voor de basismodules; de PIM-module kent een commitment van drie maanden of een jaar.' },
                            { label: 'Migratie en onboarding', shoplinkr: 'Gratis migratie en persoonlijke onboarding door het team.', competitor: 'Geen setupkosten; prioriteit-chatsupport in het betaalde plan.' },
                            { label: 'Support', shoplinkr: 'Nederlandstalige support via chat en mail voor alle klanten.', competitor: 'E-mailsupport in het gratis plan, prioriteit-chatsupport in het betaalde plan.' },
                            { label: 'Fulfilment (3PL)', shoplinkr: 'Binnenkort ook voor fulfilmentbedrijven.', competitor: 'Aparte oplossing en prijzen voor fulfilmentcenters.' },
                        ],
                    },
                ],
                tableNote: 'De informatie over ChannelDock is gebaseerd op channeldock.com en voor het laatst gecontroleerd op 18 juli 2026. Functies en prijzen veranderen; raadpleeg hun website voor de actuele stand. ChannelDock is een product van een andere aanbieder en is niet verbonden aan ShopLinkr.',
                deepDives: [
                    {
                        eyebrow: 'Magazijn',
                        heading: 'Het echte verschil zit in het magazijn',
                        paragraphs: [
                            'Op papier doen beide platformen hetzelfde: voorraad synchroniseren en bestellingen samenbrengen. Het verschil merk je op de werkvloer. Bij ShopLinkr is het magazijn het hart van het product: je loopt een slimme pickroute, scant producten met een barcodescanner, print automatisch het juiste verzendlabel en boekt retouren terug op locatie. Dat zit er allemaal standaard in, omdat het product eromheen is gebouwd.',
                            'ChannelDock benadert het van de andere kant: het vertrekpunt is de multichannel-sync, en magazijnfunctionaliteit schakel je bij via de WMS-uitbreiding. Voor een verkoper die vooral kanalen wil koppelen is dat prima; voor een webshop die elke dag zelf dozen inpakt betekent het dat de kernfuncties van je dagelijkse werk in een betaalde module zitten.',
                            'De vraag die je jezelf moet stellen is dus niet welk platform meer kan, maar waar jouw werkdag uit bestaat. Sta je dagelijks tussen de stellingen, dan wil je dat pickroutes, scannen en retouren eersteklas onderdelen zijn en geen uitbreiding.',
                        ],
                    },
                    {
                        eyebrow: 'Prijsmodel',
                        heading: 'Modules stapelen of alles-in-één',
                        paragraphs: [
                            'ChannelDock rekent met een gratis instapplan en daarboven een maandprijs die meebeweegt met je ordervolume, plus losse uitbreidingen: extra kanalen na de eerste twee, de WMS-module en de PIM-module hebben elk hun eigen prijs. Dat is flexibel als je klein begint en weinig nodig hebt, maar de rekensom verandert zodra je functies gaat stapelen.',
                            'ShopLinkr rekent één pay-as-you-go tarief per bestelling, waarin alles zit: elk kanaal, elke gebruiker, elke functie. Een rustige maand kost je automatisch minder, en er komt nooit een module-upsell achteraan. Je weet vooraf precies waar je aan toe bent, en je rekent je eigen situatie in een minuut na met de calculator op de prijzenpagina.',
                            'Welk model voordeliger uitpakt hangt af van je volume en welke functies je echt gebruikt. Vergelijk daarom niet de instapprijs, maar de totaalprijs voor jouw werkstroom: kanalen, magazijnfuncties en gebruikers meegerekend.',
                        ],
                    },
                    {
                        eyebrow: 'Doelgroep',
                        heading: 'Voor wie is welk platform gebouwd?',
                        paragraphs: [
                            'ShopLinkr is gebouwd voor Nederlandse en Belgische webshops die zelf verzenden en verkopen via bol, Kaufland en hun eigen webshop. De koppelingen gaan diep in plaats van breed: verzenden via bol, Kaufland-sync en Benelux-vervoerders zijn eersteklas onderdelen, en de support is Nederlandstalig.',
                            'ChannelDock richt zich breder: van marketplace-verkopers die internationaal schalen via Amazon, eBay en Zalando tot fulfilmentcenters die voor meerdere klanten verzenden. Die breedte is de kracht van hun aanbod, en tegelijk de reden dat de diepte per onderdeel in modules is opgedeeld.',
                        ],
                    },
                ],
                quote: {
                    text: 'Met ShopLinkr besparen we dagelijks enorm veel tijd. We hebben nu maar 1 medewerker in dienst in plaats van 5, en het gaat nu nog steeds efficiënter.',
                    author: 'Jasper de Waard, Schoongedaan',
                    storySlug: 'schoongedaan',
                    linkLabel: 'Lees het klantverhaal van Schoongedaan',
                },
                strengthsShoplinkrHeading: 'Waar ShopLinkr sterk in is',
                strengthsShoplinkr: [
                    'Alles in één pakket: geen losse modules of add-ons, elke functie zit standaard in de pay-as-you-go prijs.',
                    'Magazijnwerk als kern: picklijsten met slimme routes, barcode scannen, locatiebeheer en retouren zijn het hart van het product, geen uitbreiding.',
                    'Gemaakt voor de Nederlandse markt: diepe koppelingen met bol en Kaufland, Benelux-vervoerders en Nederlandstalige support.',
                    'Voorspelbaar meegroeien: je betaalt per bestelling, dus een rustige maand kost minder en je zit nergens aan vast.',
                ],
                strengthsCompetitorHeading: 'Waar ChannelDock sterk in is',
                strengthsCompetitor: [
                    'Breed internationaal marketplace-aanbod, waaronder Amazon, eBay en Zalando.',
                    'Een volwaardige PIM-module voor productcontent, vertalingen en feeds.',
                    'Een gratis instapplan tot 500 orders per maand om mee te beginnen.',
                    'Een aparte oplossing voor fulfilmentcenters die voor meerdere klanten verzenden.',
                ],
                switchEyebrow: 'Overstappen',
                switchHeading: 'Overstappen van ChannelDock naar ShopLinkr',
                switchBody: 'Overstappen hoeft geen project te zijn. Je koppelt je verkoopkanalen in een paar klikken, waarna je producten en voorraad automatisch binnenkomen. Migratie en onboarding zijn gratis, en met de proefperiode van 14 dagen draai je ShopLinkr rustig naast je huidige pakket voordat je kiest. Opzeggen kan daarna elke maand.',
                switchLinkLabel: 'Lees meer over ShopLinkr als ChannelDock-alternatief',
                faqEyebrow: 'Veelgestelde vragen',
                faqHeading: 'Veelgestelde vragen over deze vergelijking',
                faqs: [
                    {
                        question: 'Wat is het grootste verschil tussen ChannelDock en ShopLinkr?',
                        answer: 'ChannelDock is opgebouwd uit modules met een breed internationaal marketplace-aanbod, terwijl ShopLinkr één compleet pakket is dat magazijnwerk centraal zet. Bij ShopLinkr zitten picklijsten, barcode scannen, locatiebeheer en retouren standaard in de prijs; bij ChannelDock kies je per module wat je nodig hebt.',
                    },
                    {
                        question: 'Is ShopLinkr goedkoper dan ChannelDock?',
                        answer: 'Dat hangt af van je ordervolume en welke modules je nodig hebt. ChannelDock heeft een gratis plan tot 500 orders per maand; daarboven betaal je een maandbedrag plus eventuele modules en extra kanalen. ShopLinkr rekent pay-as-you-go per bestelling met alles inbegrepen. Reken je eigen situatie na op de prijzenpagina, dan zie je direct wat je bij ShopLinkr zou betalen.',
                    },
                    {
                        question: 'Heeft ShopLinkr een gratis versie?',
                        answer: 'ShopLinkr heeft geen permanent gratis plan, maar wel 14 dagen gratis proberen met je eigen orders, zonder creditcard. Daarna betaal je pay-as-you-go per bestelling, met alle features inbegrepen en maandelijks opzegbaar. ChannelDock biedt een gratis instapplan tot 500 orders per maand met beperkte functies.',
                    },
                    {
                        question: 'Welk platform past beter bij bol-verkopers?',
                        answer: 'Beide koppelen met bol. ShopLinkr is gebouwd rond de Nederlandse markt: verzenden via bol (VVB), Kaufland en Benelux-vervoerders zijn eersteklas onderdelen en de support is Nederlandstalig. Verkoop je daarnaast vooral internationaal via Amazon of Zalando, dan sluit het aanbod van ChannelDock daar beter op aan.',
                    },
                    {
                        question: 'Kunnen beide platformen picklijsten en verzendlabels verwerken?',
                        answer: 'Ja, maar de opzet verschilt. Bij ShopLinkr zitten slimme picklijsten, barcode scannen en automatisch labels printen standaard in het pakket. Bij ChannelDock zit basis pick & pack in het instapplan en vallen geavanceerde magazijnfuncties zoals scannen en route-optimalisatie onder de betaalde WMS-uitbreiding.',
                    },
                    {
                        question: 'Hebben beide platformen een API?',
                        answer: 'Ja. ShopLinkr heeft een publieke REST API met documentatie die voor alle klanten beschikbaar is. ChannelDock biedt API-toegang in het betaalde plan.',
                    },
                    {
                        question: 'Kan ik eenvoudig overstappen van ChannelDock naar ShopLinkr?',
                        answer: 'Ja. Je koppelt je verkoopkanalen opnieuw in ShopLinkr, waarna producten en voorraad automatisch worden ingelezen. Migratie en onboarding zijn gratis en je test 14 dagen vrijblijvend naast je huidige pakket, zonder creditcard.',
                    },
                ],
                sourcesEyebrow: 'Verantwoording',
                sourcesHeading: 'Bronnen en peildatum',
                sourcesIntro: 'Deze vergelijking is opgesteld op basis van de publieke informatie van beide partijen en voor het laatst gecontroleerd op 18 juli 2026.',
                sources: [
                    { label: 'ChannelDock website', url: 'https://channeldock.com/' },
                    { label: 'ChannelDock prijzen', url: 'https://channeldock.com/en/prices/' },
                    { label: 'ShopLinkr prijzen', url: 'https://www.shoplinkr.com/prijzen' },
                    { label: 'ShopLinkr integraties', url: 'https://www.shoplinkr.com/integraties' },
                ],
            },
            alternative: {
                title: 'ChannelDock alternatief? Ontdek ShopLinkr | ShopLinkr',
                description: 'Op zoek naar een alternatief voor ChannelDock? ShopLinkr bundelt voorraad, picklijsten, verzendlabels en orderverwerking in één pakket zonder losse modules. Stap gratis over en probeer 14 dagen vrijblijvend.',
                eyebrow: 'ChannelDock-alternatief',
                heading: 'Het Nederlandse alternatief voor ChannelDock',
                subheading: 'ShopLinkr bundelt alles wat je magazijn nodig heeft in één pakket: geen losse modules, geen prijs per extra kanaal, gewoon pay-as-you-go per bestelling. Overstappen is gratis en je test 14 dagen vrijblijvend.',
                breadcrumbLeaf: 'ChannelDock-alternatief',
                reasonsEyebrow: 'Waarom overstappen',
                reasonsHeading: 'Vijf redenen om ShopLinkr te overwegen',
                reasons: [
                    { title: 'Alles inbegrepen, geen modules', body: 'Bij ShopLinkr zijn picklijsten, barcode scannen, locatiebeheer, retouren en inkoopadvies onderdeel van het pakket. Je hoeft geen aparte WMS- of PIM-module bij te kopen om je magazijn volledig te draaien.' },
                    { title: 'Eén heldere prijs per bestelling', body: 'Je betaalt pay-as-you-go over je werkelijke bestellingen, met alle features, onbeperkte kanalen en onbeperkte gebruikers inbegrepen. Geen prijs per extra kanaal, geen add-ons die er later bijkomen, en maandelijks opzegbaar.' },
                    { title: 'Magazijnwerk als kern, niet als uitbreiding', body: 'ShopLinkr is gebouwd rond het magazijn: slimme pick-routes, scannen, locaties en retouren vormen het hart van het product. Ideaal voor webshops die elke dag zelf pakketten verzenden.' },
                    { title: 'Diepe koppelingen voor de Nederlandse markt', body: 'bol inclusief verzenden via bol, Kaufland, Shopify, WooCommerce en Lightspeed C-Series, plus Benelux-vervoerders zoals PostNL, DPD, GLS, MyParcel, Sendcloud en QLS. Geen honderden oppervlakkige kanalen, wel precies de diepgang die Nederlandse verkopers nodig hebben.' },
                    { title: 'Gratis migratie en Nederlandse support', body: 'Ons team zet de overstap gratis met je op, en daarna krijg je snelle Nederlandstalige support via chat en mail. Je test 14 dagen met je eigen orders, zonder creditcard.' },
                ],
                diffsEyebrow: 'Kernverschillen',
                diffsHeading: 'De grootste verschillen in één oogopslag',
                diffsIntro: 'De volledige vergelijking staat op de vergelijkingspagina; dit zijn de verschillen waar overstappers het vaakst naar vragen.',
                colFeature: 'Onderdeel',
                keyDiffs: [
                    { label: 'Magazijnfuncties', shoplinkr: 'Picklijsten, scannen, locaties en retouren standaard inbegrepen.', competitor: 'Volledige WMS-functionaliteit als betaalde uitbreiding.' },
                    { label: 'Prijsmodel', shoplinkr: 'Pay-as-you-go per bestelling, alles inbegrepen.', competitor: 'Maandprijs plus losse modules en betaalde extra kanalen.' },
                    { label: 'Kanalen', shoplinkr: 'Onbeperkt aantal kanalen inbegrepen.', competitor: 'Extra kanalen tegen meerprijs na de eerste twee.' },
                    { label: 'Focus', shoplinkr: 'Nederlandse markt: bol, Kaufland en Benelux-vervoerders.', competitor: 'Internationale marketplaces zoals Amazon, eBay en Zalando.' },
                    { label: 'Support en migratie', shoplinkr: 'Nederlandstalige support plus gratis migratie en onboarding.', competitor: 'E-mailsupport gratis plan; prioriteit-chat in betaald plan.' },
                ],
                quote: {
                    text: 'Meestal kunnen nieuwe mensen er binnen een kwartier tot twintig minuten mee werken. Voor ons is dat ideaal.',
                    author: 'Stephan, Strandwinkel',
                    storySlug: 'strandwinkel',
                    linkLabel: 'Lees het klantverhaal van Strandwinkel',
                },
                honestEyebrow: 'Eerlijk is eerlijk',
                honestHeading: 'Wanneer past ChannelDock beter?',
                honestBody: 'Verkoop je vooral internationaal op marketplaces als Amazon, eBay en Zalando, heb je een volwaardige PIM-module nodig of run je een fulfilmentcenter voor meerdere klanten, dan is ChannelDock een logische kandidaat. Vergelijk beide platformen rustig naast elkaar voordat je kiest.',
                compareLinkLabel: 'Bekijk de volledige vergelijking: ChannelDock vs ShopLinkr',
                stepsEyebrow: 'Zo stap je over',
                stepsHeading: 'Overstappen in drie stappen',
                steps: [
                    { title: 'Maak een gratis account', body: 'Start je proefperiode van 14 dagen zonder creditcard en koppel je verkoopkanalen in een paar klikken.' },
                    { title: 'Producten en voorraad rollen binnen', body: 'Je producten, voorraadaantallen en openstaande bestellingen worden automatisch ingelezen vanuit je kanalen. Wij helpen gratis met de inrichting en migratie.' },
                    { title: 'Draai parallel en beslis', body: 'Verwerk je orders twee weken naast je huidige pakket. Bevalt het, dan zeg je je oude abonnement op; zo niet, dan zit je nergens aan vast.' },
                ],
                faqEyebrow: 'Veelgestelde vragen',
                faqHeading: 'Veelgestelde vragen over overstappen',
                faqs: [
                    {
                        question: 'Waarom zou ik overstappen van ChannelDock naar ShopLinkr?',
                        answer: 'De meest genoemde redenen: alle magazijnfuncties zitten standaard in het pakket in plaats van in losse modules, je betaalt één pay-as-you-go prijs per bestelling zonder kosten per extra kanaal, en je krijgt Nederlandstalige support met gratis migratie en onboarding.',
                    },
                    {
                        question: 'Hoe lang duurt overstappen van ChannelDock naar ShopLinkr?',
                        answer: 'Het koppelen van je verkoopkanalen kost een paar minuten per kanaal; daarna rollen producten en voorraad automatisch binnen. De meeste webshops draaien binnen een dag hun eerste orders via ShopLinkr. Ons team helpt gratis met de inrichting, en in de praktijk zijn nieuwe medewerkers binnen een kwartier ingewerkt.',
                    },
                    {
                        question: 'Wat kost ShopLinkr vergeleken met ChannelDock?',
                        answer: 'ShopLinkr rekent pay-as-you-go per bestelling, met alle features, kanalen en gebruikers inbegrepen en maandelijks opzegbaar. ChannelDock werkt met een gratis instapplan en daarboven een maandprijs met losse modules en betaalde extra kanalen. Wat voordeliger uitpakt hangt af van je volume; reken je situatie na op onze prijzenpagina.',
                    },
                    {
                        question: 'Kan ik mijn data meenemen vanuit ChannelDock?',
                        answer: 'Je koppelt je verkoopkanalen opnieuw aan ShopLinkr, waarna producten, voorraad en bestellingen automatisch worden ingelezen vanuit die kanalen. Ons team helpt gratis bij de migratie en inrichting.',
                    },
                    {
                        question: 'Werkt ShopLinkr met mijn vervoerder?',
                        answer: 'ShopLinkr koppelt met de vervoerders en verzendplatformen die Nederlandse en Belgische webshops het meest gebruiken, waaronder PostNL, DPD, GLS, MyParcel, Sendcloud, QLS, Innosend, ParcelPro en PakketMail, plus verzenden via bol. Het volledige overzicht staat op de integratiepagina.',
                    },
                    {
                        question: 'Kan ik ShopLinkr eerst naast ChannelDock gebruiken?',
                        answer: 'Ja, dat raden we zelfs aan. Je test ShopLinkr 14 dagen gratis met je eigen orders naast je huidige pakket, zonder creditcard. Zo vergelijk je in de praktijk en stap je pas definitief over als het bevalt.',
                    },
                ],
            },
        },
        en: {
            vs: {
                title: 'ChannelDock vs ShopLinkr: the complete comparison (2026) | ShopLinkr',
                description: 'ChannelDock or ShopLinkr? Compare integrations, warehouse features, product management and pricing model of both Dutch multichannel platforms, including sources and check date.',
                eyebrow: 'Comparison',
                heading: 'ChannelDock vs ShopLinkr',
                subheading: 'Two Dutch platforms for selling across multiple channels, each with its own focus. This is the complete, honest comparison, including sources and check date, so you can pick what fits your webshop.',
                breadcrumbLeaf: 'ChannelDock vs ShopLinkr',
                tldrEyebrow: 'In short',
                tldrHeading: 'The difference in one minute',
                tldrPoints: [
                    'ShopLinkr is warehouse software for webshops: stock sync, order processing, pick lists, shipping labels and returns come in one package, with a pay-as-you-go price per order that includes every feature, channel and user.',
                    'ChannelDock is a multichannel platform built from modules: stock and order sync at its core, with a full WMS module and PIM module as paid add-ons. Its marketplace coverage is more international, including Amazon, eBay and Zalando, and it offers a separate solution for fulfillment centers.',
                    'Rule of thumb: if you mainly sell through bol, Kaufland and your own webshop and want warehouse and shipping in one complete package, look at ShopLinkr. If you want broad international marketplace coverage or need a PIM, ChannelDock is worth a look.',
                ],
                verdictEyebrow: 'Decide quickly',
                verdictHeading: 'Which platform is for whom?',
                verdictShoplinkrHeading: 'Pick ShopLinkr if you…',
                verdictShoplinkr: [
                    'pick, pack and ship orders yourself every day from your own warehouse or workspace',
                    'sell through bol, Kaufland, Shopify, WooCommerce or Lightspeed and want your stock correct everywhere',
                    'want one clear price per order, without separate modules, per-channel fees or add-ons later',
                    'value Dutch-language support and want free help with the switch',
                ],
                verdictCompetitorHeading: 'Pick ChannelDock if you…',
                verdictCompetitor: [
                    'sell broadly on international marketplaces such as Amazon, eBay and Zalando',
                    'need a full PIM module for product content, translations and feeds',
                    'run a fulfillment center that ships for multiple clients',
                    'want to start on a free entry plan and add modules later',
                ],
                tableEyebrow: 'Side by side',
                tableHeading: 'ChannelDock and ShopLinkr compared',
                tableIntro: 'All the important areas side by side, grouped by theme and based on the public information from both parties.',
                colFeature: 'Area',
                tableGroups: [
                    {
                        title: 'Sales channels and integrations',
                        rows: [
                            { label: 'Marketplaces', shoplinkr: 'bol (including Shipping via bol) and Kaufland, with deep two-way sync for stock and orders.', competitor: 'More international coverage, including Amazon, bol, eBay and Zalando.' },
                            { label: 'Webshops', shoplinkr: 'Shopify, WooCommerce and Lightspeed C-Series.', competitor: 'Including Shopify, WooCommerce, Magento and Shopware.' },
                            { label: 'Carriers', shoplinkr: 'Focused on the Benelux: PostNL, DPD, GLS, MyParcel, Sendcloud, QLS, Innosend, ParcelPro, PakketMail and more.', competitor: 'Including PostNL, DHL, DPD, GLS and bpost, plus international carriers such as FedEx and Royal Mail.' },
                            { label: 'API', shoplinkr: 'Public REST API with documentation, available to all customers.', competitor: 'REST API available on the paid plan.' },
                        ],
                    },
                    {
                        title: 'Warehouse and order processing',
                        rows: [
                            { label: 'Pick lists and scanning', shoplinkr: 'Smart pick routes through your warehouse with barcode scanning, included as standard.', competitor: 'Pick & pack in the base plan; barcode scanning and route optimization are part of the paid WMS add-on.' },
                            { label: 'Location management', shoplinkr: 'Hierarchical warehouse locations linked to products, included.', competitor: 'Multi-location stock management on the paid plan.' },
                            { label: 'Returns', shoplinkr: 'Process returns and book them back into stock, included.', competitor: 'Returns handling as part of the order flow.' },
                            { label: 'Automation', shoplinkr: 'Rules with conditions and actions for recurring work, plus automatic label printing (AutoPrint).', competitor: 'Smart shipping rules with automatic carrier routing on the paid plan.' },
                            { label: 'Reporting and purchasing', shoplinkr: 'Bestsellers, dead stock, stock value, ABC analysis and smart restock advice, included.', competitor: 'Dashboard analytics and AI restock advice on the paid plan.' },
                        ],
                    },
                    {
                        title: 'Product management',
                        rows: [
                            { label: 'Product overview', shoplinkr: 'Central product management with variants and bundles, included.', competitor: 'Product management in the base plan; extended management via the PIM module.' },
                            { label: 'PIM', shoplinkr: 'No separate PIM module.', competitor: 'Full PIM module (product content, translations, feeds) as a paid add-on with a fixed commitment.' },
                        ],
                    },
                    {
                        title: 'Pricing and terms',
                        rows: [
                            { label: 'Pricing model', shoplinkr: 'Pay-as-you-go per order; all features, unlimited channels and users included.', competitor: 'Free up to 500 orders per month; beyond that a monthly fee plus paid extra channels and separate modules (WMS, PIM).' },
                            { label: 'Free to start', shoplinkr: '14-day free trial with your own orders, no credit card required.', competitor: 'Free entry plan up to 500 orders per month, with limits such as one warehouse and email-only support.' },
                            { label: 'Contract', shoplinkr: 'Cancel monthly, no notice period.', competitor: 'Monthly for the base modules; the PIM module has a three-month or yearly commitment.' },
                            { label: 'Migration and onboarding', shoplinkr: 'Free migration and personal onboarding by the team.', competitor: 'No setup fees; priority chat support on the paid plan.' },
                            { label: 'Support', shoplinkr: 'Dutch-language support via chat and email for all customers.', competitor: 'Email support on the free plan, priority chat support on the paid plan.' },
                            { label: 'Fulfillment (3PL)', shoplinkr: 'Coming soon for fulfillment companies too.', competitor: 'Separate solution and pricing for fulfillment centers.' },
                        ],
                    },
                ],
                tableNote: 'The information about ChannelDock is based on channeldock.com and was last checked on 18 July 2026. Features and prices change; check their website for the current state. ChannelDock is a product of another provider and is not affiliated with ShopLinkr.',
                deepDives: [
                    {
                        eyebrow: 'Warehouse',
                        heading: 'The real difference is in the warehouse',
                        paragraphs: [
                            'On paper both platforms do the same thing: sync stock and bring orders together. You notice the difference on the work floor. With ShopLinkr the warehouse is the heart of the product: you walk a smart pick route, scan products with a barcode scanner, print the right shipping label automatically and book returns back by location. All of that comes standard, because the product is built around it.',
                            'ChannelDock approaches it from the other side: the starting point is multichannel sync, and you add warehouse functionality via the WMS add-on. For a seller who mainly wants to connect channels that is fine; for a webshop that packs boxes every day it means the core features of your daily work sit in a paid module.',
                            'So the question to ask is not which platform can do more, but what your workday consists of. If you spend your days between the shelves, you want pick routes, scanning and returns to be first-class features rather than an add-on.',
                        ],
                    },
                    {
                        eyebrow: 'Pricing model',
                        heading: 'Stacking modules or all-in-one',
                        paragraphs: [
                            'ChannelDock charges a free entry plan and beyond that a monthly fee that moves with your order volume, plus separate add-ons: extra channels after the first two, the WMS module and the PIM module each have their own price. That is flexible if you start small and need little, but the math changes once you start stacking features.',
                            'ShopLinkr charges one pay-as-you-go rate per order that includes everything: every channel, every user, every feature. A quiet month automatically costs less, and there is never a module upsell afterwards. You know exactly where you stand, and you can check your own numbers in a minute with the calculator on the pricing page.',
                            'Which model works out cheaper depends on your volume and which features you actually use. So do not compare the entry price; compare the total price for your workflow, channels, warehouse features and users included.',
                        ],
                    },
                    {
                        eyebrow: 'Audience',
                        heading: 'Who is each platform built for?',
                        paragraphs: [
                            'ShopLinkr is built for Dutch and Belgian webshops that ship their own orders and sell through bol, Kaufland and their own webshop. The integrations go deep rather than wide: Shipping via bol, Kaufland sync and Benelux carriers are first-class features, and support is in Dutch.',
                            'ChannelDock aims wider: from marketplace sellers scaling internationally via Amazon, eBay and Zalando to fulfillment centers shipping for multiple clients. That breadth is the strength of their offering, and at the same time the reason the depth per area is split into modules.',
                        ],
                    },
                ],
                quote: {
                    text: 'With ShopLinkr we save a huge amount of time every day. We now run with just 1 employee instead of 5, and it still works more efficiently than before.',
                    author: 'Jasper de Waard, Schoongedaan',
                    storySlug: 'schoongedaan',
                    linkLabel: 'Read the Schoongedaan customer story',
                },
                strengthsShoplinkrHeading: 'Where ShopLinkr is strong',
                strengthsShoplinkr: [
                    'Everything in one package: no separate modules or add-ons, every feature is included in the pay-as-you-go price.',
                    'Warehouse work at the core: pick lists with smart routes, barcode scanning, location management and returns are the heart of the product, not an add-on.',
                    'Built for the Dutch market: deep integrations with bol and Kaufland, Benelux carriers and Dutch-language support.',
                    'Grows predictably with you: you pay per order, so a quiet month costs less and you are never locked in.',
                ],
                strengthsCompetitorHeading: 'Where ChannelDock is strong',
                strengthsCompetitor: [
                    'Broad international marketplace coverage, including Amazon, eBay and Zalando.',
                    'A full PIM module for product content, translations and feeds.',
                    'A free entry plan for up to 500 orders per month to get started.',
                    'A separate solution for fulfillment centers that ship for multiple clients.',
                ],
                switchEyebrow: 'Switching',
                switchHeading: 'Switching from ChannelDock to ShopLinkr',
                switchBody: 'Switching does not have to be a project. You connect your sales channels in a few clicks, after which your products and stock flow in automatically. Migration and onboarding are free, and with the 14-day trial you can run ShopLinkr alongside your current package before you decide. After that, you can cancel any month.',
                switchLinkLabel: 'Read more about ShopLinkr as a ChannelDock alternative',
                faqEyebrow: 'Frequently asked questions',
                faqHeading: 'Frequently asked questions about this comparison',
                faqs: [
                    {
                        question: 'What is the biggest difference between ChannelDock and ShopLinkr?',
                        answer: 'ChannelDock is built from modules with broad international marketplace coverage, while ShopLinkr is one complete package with warehouse work at its core. With ShopLinkr, pick lists, barcode scanning, location management and returns are included in the price by default; with ChannelDock you pick the modules you need.',
                    },
                    {
                        question: 'Is ShopLinkr cheaper than ChannelDock?',
                        answer: 'That depends on your order volume and which modules you need. ChannelDock has a free plan up to 500 orders per month; beyond that you pay a monthly fee plus any modules and extra channels. ShopLinkr charges pay-as-you-go per order with everything included. Run your own numbers on the pricing page to see exactly what you would pay with ShopLinkr.',
                    },
                    {
                        question: 'Does ShopLinkr have a free version?',
                        answer: 'ShopLinkr has no permanent free plan, but you can try it for 14 days with your own orders, no credit card required. After that you pay as you go per order, with all features included and monthly cancellation. ChannelDock offers a free entry plan up to 500 orders per month with limited features.',
                    },
                    {
                        question: 'Which platform fits bol sellers better?',
                        answer: 'Both integrate with bol. ShopLinkr is built around the Dutch market: Shipping via bol (VVB), Kaufland and Benelux carriers are first-class features and support is in Dutch. If you mainly sell internationally via Amazon or Zalando, ChannelDock’s coverage matches that better.',
                    },
                    {
                        question: 'Can both platforms handle pick lists and shipping labels?',
                        answer: 'Yes, but the setup differs. With ShopLinkr, smart pick lists, barcode scanning and automatic label printing come standard in the package. With ChannelDock, basic pick & pack is part of the entry plan and advanced warehouse features such as scanning and route optimization fall under the paid WMS add-on.',
                    },
                    {
                        question: 'Do both platforms have an API?',
                        answer: 'Yes. ShopLinkr has a public REST API with documentation available to all customers. ChannelDock offers API access on the paid plan.',
                    },
                    {
                        question: 'Can I easily switch from ChannelDock to ShopLinkr?',
                        answer: 'Yes. You reconnect your sales channels in ShopLinkr, after which products and stock are imported automatically. Migration and onboarding are free, and you can test for 14 days alongside your current package, no credit card required.',
                    },
                ],
                sourcesEyebrow: 'Accountability',
                sourcesHeading: 'Sources and check date',
                sourcesIntro: 'This comparison was compiled from the public information of both parties and last checked on 18 July 2026.',
                sources: [
                    { label: 'ChannelDock website', url: 'https://channeldock.com/' },
                    { label: 'ChannelDock pricing', url: 'https://channeldock.com/en/prices/' },
                    { label: 'ShopLinkr pricing', url: 'https://www.shoplinkr.com/en/pricing' },
                    { label: 'ShopLinkr integrations', url: 'https://www.shoplinkr.com/en/integrations' },
                ],
            },
            alternative: {
                title: 'Looking for a ChannelDock alternative? Meet ShopLinkr | ShopLinkr',
                description: 'Looking for an alternative to ChannelDock? ShopLinkr bundles stock, pick lists, shipping labels and order processing in one package without separate modules. Switch for free and try it 14 days without obligation.',
                eyebrow: 'ChannelDock alternative',
                heading: 'The Dutch alternative to ChannelDock',
                subheading: 'ShopLinkr bundles everything your warehouse needs in one package: no separate modules, no price per extra channel, just pay-as-you-go per order. Switching is free and you can test for 14 days without obligation.',
                breadcrumbLeaf: 'ChannelDock alternative',
                reasonsEyebrow: 'Why switch',
                reasonsHeading: 'Five reasons to consider ShopLinkr',
                reasons: [
                    { title: 'Everything included, no modules', body: 'With ShopLinkr, pick lists, barcode scanning, location management, returns and restock advice are part of the package. You do not need to buy a separate WMS or PIM module to run your warehouse fully.' },
                    { title: 'One clear price per order', body: 'You pay as you go over your actual orders, with all features, unlimited channels and unlimited users included. No price per extra channel, no add-ons that appear later, and you can cancel monthly.' },
                    { title: 'Warehouse work at the core, not as an add-on', body: 'ShopLinkr is built around the warehouse: smart pick routes, scanning, locations and returns form the heart of the product. Ideal for webshops that ship their own parcels every day.' },
                    { title: 'Deep integrations for the Dutch market', body: 'bol including Shipping via bol, Kaufland, Shopify, WooCommerce and Lightspeed C-Series, plus Benelux carriers such as PostNL, DPD, GLS, MyParcel, Sendcloud and QLS. Not hundreds of shallow channels, but exactly the depth Dutch sellers need.' },
                    { title: 'Free migration and Dutch support', body: 'Our team sets up the switch with you for free, and after that you get fast Dutch-language support via chat and email. You test for 14 days with your own orders, no credit card required.' },
                ],
                diffsEyebrow: 'Key differences',
                diffsHeading: 'The biggest differences at a glance',
                diffsIntro: 'The full comparison lives on the comparison page; these are the differences switchers ask about most.',
                colFeature: 'Area',
                keyDiffs: [
                    { label: 'Warehouse features', shoplinkr: 'Pick lists, scanning, locations and returns included as standard.', competitor: 'Full WMS functionality as a paid add-on.' },
                    { label: 'Pricing model', shoplinkr: 'Pay-as-you-go per order, everything included.', competitor: 'Monthly fee plus separate modules and paid extra channels.' },
                    { label: 'Channels', shoplinkr: 'Unlimited channels included.', competitor: 'Extra channels at a surcharge after the first two.' },
                    { label: 'Focus', shoplinkr: 'Dutch market: bol, Kaufland and Benelux carriers.', competitor: 'International marketplaces such as Amazon, eBay and Zalando.' },
                    { label: 'Support and migration', shoplinkr: 'Dutch-language support plus free migration and onboarding.', competitor: 'Email support on the free plan; priority chat on the paid plan.' },
                ],
                quote: {
                    text: 'New people can usually work with it within fifteen to twenty minutes. For us that is ideal.',
                    author: 'Stephan, Strandwinkel',
                    storySlug: 'strandwinkel',
                    linkLabel: 'Read the Strandwinkel customer story',
                },
                honestEyebrow: 'Fair is fair',
                honestHeading: 'When is ChannelDock the better fit?',
                honestBody: 'If you mainly sell internationally on marketplaces such as Amazon, eBay and Zalando, need a full PIM module or run a fulfillment center for multiple clients, ChannelDock is a logical candidate. Compare both platforms side by side before you decide.',
                compareLinkLabel: 'See the full comparison: ChannelDock vs ShopLinkr',
                stepsEyebrow: 'How to switch',
                stepsHeading: 'Switch in three steps',
                steps: [
                    { title: 'Create a free account', body: 'Start your 14-day trial without a credit card and connect your sales channels in a few clicks.' },
                    { title: 'Products and stock flow in', body: 'Your products, stock levels and open orders are imported automatically from your channels. We help with setup and migration for free.' },
                    { title: 'Run in parallel and decide', body: 'Process your orders for two weeks alongside your current package. If you like it, cancel your old subscription; if not, you are not tied to anything.' },
                ],
                faqEyebrow: 'Frequently asked questions',
                faqHeading: 'Frequently asked questions about switching',
                faqs: [
                    {
                        question: 'Why would I switch from ChannelDock to ShopLinkr?',
                        answer: 'The most common reasons: all warehouse features come standard in the package instead of in separate modules, you pay one pay-as-you-go price per order without costs per extra channel, and you get Dutch-language support with free migration and onboarding.',
                    },
                    {
                        question: 'How long does switching from ChannelDock to ShopLinkr take?',
                        answer: 'Connecting your sales channels takes a few minutes per channel; after that, products and stock flow in automatically. Most webshops process their first orders through ShopLinkr within a day. Our team helps with setup for free, and in practice new team members are up and running within fifteen minutes.',
                    },
                    {
                        question: 'What does ShopLinkr cost compared to ChannelDock?',
                        answer: 'ShopLinkr charges pay-as-you-go per order, with all features, channels and users included and monthly cancellation. ChannelDock works with a free entry plan and beyond that a monthly fee with separate modules and paid extra channels. Which works out cheaper depends on your volume; run your own numbers on our pricing page.',
                    },
                    {
                        question: 'Can I bring my data from ChannelDock?',
                        answer: 'You reconnect your sales channels to ShopLinkr, after which products, stock and orders are imported automatically from those channels. Our team helps with migration and setup for free.',
                    },
                    {
                        question: 'Does ShopLinkr work with my carrier?',
                        answer: 'ShopLinkr integrates with the carriers and shipping platforms Dutch and Belgian webshops use most, including PostNL, DPD, GLS, MyParcel, Sendcloud, QLS, Innosend, ParcelPro and PakketMail, plus Shipping via bol. The full overview is on the integrations page.',
                    },
                    {
                        question: 'Can I use ShopLinkr alongside ChannelDock first?',
                        answer: 'Yes, we even recommend it. You test ShopLinkr for 14 days for free with your own orders alongside your current package, no credit card required. That way you compare in practice and only switch for good once it proves itself.',
                    },
                ],
            },
        },
    },
};

export const competitors = {
    channeldock,
} as const satisfies Record<string, Competitor>;

export type CompetitorKey = keyof typeof competitors;
