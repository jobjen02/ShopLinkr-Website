# Nachtelijke site-review — 22 juni 2026

Volledige, brede review van de hele Astro-site (96 pagina's, 66 componenten, 326 content-bestanden, 2 dictionaries, alle data- en config-bestanden). Uitgevoerd met 36 parallelle audit-agents over alle dimensies: bugs, typfouten, grammatica, consistentie, spacing/padding, afmetingen/responsive, dark mode, toegankelijkheid, technische SEO, content-SEO, AI-indexering en interne links.

**Resultaat:** 319 bevindingen. Ik heb alles wat veilig en eenduidig was vannacht direct gefixt en geverifieerd. Wat een inhoudelijke of merk-beslissing van jou vraagt heb ik bewust **niet** aangepast en hieronder voor je op een rij gezet.

**Build na alle fixes: groen.** 498 pagina's, 0 warnings (was 418 build-warnings, zie middleware-fix), 0 errors.

---

## 1. Wat ik vannacht heb gefixt (geverifieerd)

Alles hieronder staat al op schijf, nog niet gecommit.

### Kritiek / bugs
- **Gelekte tool-markup in een gepubliceerd artikel.** `seo-en/how-to-connect-qls-to-shopify.md` eindigde met letterlijke `</content>` en `</invoke>` regels (lek uit een eerdere content-generatie). Die renderden als zichtbare kapotte tekst onderaan de pagina. Verwijderd.
- **418 build-warnings weg.** `src/middleware.ts` las `context.request.headers` ook tijdens het pre-renderen van statische pagina's, wat per pagina een warning gaf (`Astro.request.headers was used...`). Guard toegevoegd: `if (context.isPrerendered) return next();`. De markdown- en edge-cache-logica geldt toch alleen voor server-rendered responses. Build is nu schoon.
- **package.json miste directe dependencies.** `unified`, `rehype-parse` en `remark-stringify` worden in de middleware geïmporteerd maar stonden alleen transitief in de lock. Toegevoegd, zodat een schone `npm install` niet kan breken.

### SEO / structuur
- **31 dubbele H1's verwijderd.** Alle `hoe-koppel-ik-*` en `how-to-connect-*` SEO-artikelen hadden in de body een eigen `<h1>` terwijl `ArticleLayout` de frontmatter-titel al als H1 rendert. Twee H1's per pagina is een SEO/toegankelijkheidsfout. De in-body H1 (een duplicaat van de titel) is overal weggehaald; nu één H1 per pagina.
- **Dode links in llms.txt gefixt.** `llms.txt` adverteerde `https://shoplinkr.com/privacy` en `/voorwaarden` aan AI-crawlers, maar die routes bestaan niet (de juridische documenten zijn PDF's op DigitalOcean). Beide nu naar de echte PDF-URL's uit `externalLinks.ts`.

### Content (taal, geen feiten aangeraakt)
65 taal- en markup-fixes over 58 content-bestanden, o.a.:
- **Merknamen met hoofdletter** in titels (die als `<title>` én H1 in de zoekresultaten verschijnen): `dpd`→`DPD`, `Qls`→`QLS`, `innosend`→`Innosend`, `myparcel`→`MyParcel`, `postnl`→`PostNL`, `sendy`→`Sendy`, `sendcloud`→`Sendcloud`, `excel`→`Excel` (5 titels). **`bol` heb ik bewust niet aangeraakt**, zie beslissing A.
- **Nederlandse spatiefouten** (samenstellingen die los stonden): `voorraadbeheer systeem`→`voorraadbeheersysteem`, `magazijn werk`→`magazijnwerk`, `verzend workflow`→`verzendworkflow`, `voorraad beheer`→`voorraadbeheer`, `verkoop kanalen`→`verkoopkanalen`, `reset link`→`resetlink`, `praktijk ervaring`→`praktijkervaring`, e.a.
- **Grammatica**: ontbrekend lidwoord (`bijvoorbeeld een kolom`), de/het-congruentie (`een apart werkblad`, `een populair e-commerceplatform`), ontbrekend voorzetsel (`het risico op misgelopen verkoop`), dubbel woord (`als als`).
- **Redundante `<strong>` in koppen** verwijderd (koppen zijn al vet) in 4 blog-bestanden, NL en EN gelijkgetrokken.
- **Ontbrekende `alt`-teksten** toegevoegd op afbeeldingen.
- **`rel="noopener noreferrer"`** toegevoegd op externe `target="_blank"`-links die het misten.
- **Informele toon** hersteld waar per ongeluk `uw` stond.

> Belangrijk: 26 wijzigingen die agents te ver doorvoerden (mid-zin `Bol`→`bol`, en interne links absoluut maken) heb ik teruggedraaid, plus een vreemde `"Pay as you Go"`-hoofdletter. Die vallen onder beslissing A/G.

### Design (spacing / dark mode / i18n)
- `NotFoundPage.astro`: sectie `py-20 md:py-32` → `py-24 md:py-32` (de canonieke sectie-spacing, kwam al voor in dezelfde file).
- `FeaturesIndexPage.astro`: eyebrow `mb-5` → `mb-4` (sectie-header-canon, gelijk aan alle 13 feature-pagina's).
- `BlogIndexPage.astro`: featured-split `gap-8 lg:gap-12` → `gap-12 lg:gap-16` (de 2-koloms-split-canon).
- `FeatureCarriersPage.astro` (dark mode): logo-tegel-ring `ring-chalk-dark` → `ring-chalk-dark dark:ring-flint`, zodat de tegel in dark mode geen lichte rand krijgt (gelijk aan IntegrationCard/Testimonials).
- `FeatureCarriersPage.astro` (i18n): gebruikte hardcoded de NL `integrations`-collectie ook op de EN-pagina. Nu `collectionName('integrations', locale)`, gelijk aan TrustBar.
- `faqs-en.ts`: Britse spelling → Amerikaans (`colours`→`colors`, `metres/litres/metre`→`meters/liters/meter`, `recognises/recognisable`→`recognizes/recognizable`).

---

## 2. Beslissingen die ik aan jou laat (NIET aangepast)

Dit zijn de dingen waar ik je oordeel voor nodig heb. Niets hiervan is gewijzigd.

### A. `bol` vs `Bol` — site-brede schrijfwijze  ⭐ grootste beslissing
Je memory zegt dat `bol`/`bol.com` bewust met kleine letter mid-zin geschreven wordt. Maar de content gebruikt op dit moment **1014x `Bol` met hoofdletter tegen 645x `bol`** met kleine letter. De feitelijke norm in de content is dus juist mét hoofdletter. Dit consistent maken is een grote, merk-brede ingreep die ik niet ongevraagd 's nachts over honderden zinnen wil doordrukken.

**Keuze:** óf overal mid-zin `bol` afdwingen (zinsbegin blijft `Bol`), óf `Bol` accepteren als de norm. Zeg welke, dan trek ik het in één keer consistent (zin-positie-bewust, dus geen kapotte zinsbeginnen).

### B. Mogelijk verzonnen of onverifieerbare claims (66 stuks, 57 bestanden)
De content-audit markeerde claims die ik niet kan verifiëren en die op verzinsels lijken. Conform je regel "nooit features/prijzen/cijfers verzinnen" heb ik hier **niets** aan veranderd, want alleen jij weet wat klopt. De volledige lijst staat onderaan in **Appendix B**. De opvallendste:
- Terugkerend in veel artikelen: *"meer dan 110.000 verwerkte bestellingen en 22.000 producten"* en *"14 dagen gratis proberen"*. Kloppen die getallen nog? Ze staan in tientallen artikelen.
- `seo/hoe-koppel-ik-dpd-met-bol.md`: noemt een bol-dienst *"Bol.com Select"* en een evenement *"Bulk 10-daagse"*. De "Bulk 10-daagse" lijkt geen bestaand bol-evenement.
- `blogs/wat-is-een-ean-code.md`: *"EAN ... sinds 2009 internationaal bekend als International Article Number"* — specifiek jaartal, onbevestigd.
- `blogs/wat-is-verzenden-via-bol-(vvb)-precies.md`: claimt dat bol *"same-day delivery"* als VVB-optie biedt.
- Diverse artikelen claimen dingen over DPD/QLS/Sendy bedrijfsgeschiedenis (oprichtingsjaren, pakketvolumes) die geverifieerd moeten worden.

Loop Appendix B door en zeg per stuk "klopt / aanpassen naar X / verwijderen", dan voer ik het uit.

### C. SEO-structuur: verweesde pagina's + keyword-kannibalisatie  (hoge SEO-impact)
- **Alle 59 SEO-landingspagina's zijn verweesd.** Ze worden nergens vanaf gelinkt (niet vanuit de blog-index, footer, header of feature-pagina's), alleen bereikbaar via sitemap of directe URL. Daardoor krijgen ze nauwelijks interne linkwaarde en zijn ze moeilijk vindbaar/herindexeerbaar voor Google. **Aanbeveling:** een vindbare hub-pagina (bv. `/gidsen` NL / `/guides` EN) die ze gegroepeerd toont, plus contextuele links vanuit verwante feature- en integratie-pagina's. Dit raakt je navigatie/URL-structuur, dus jouw call.
- **De vervoerder-matrix bestaat dubbel.** Voor elke vervoerder × kanaal is er zowel een `hoe-koppel-ik-X-met-Y` áls een `X-en-Y-samen-gebruiken` artikel, beide dun (36–72 regels) en gericht op exact dezelfde zoekterm. Ze concurreren met elkaar én met de canonieke `/integraties/<vervoerder>`-pagina (keyword-kannibalisatie). **Aanbeveling:** per intentie samenvoegen tot één sterke pagina + 301-redirect van de verliezer.
- **5 NL + 6 EN bijna-identieke voorraadbeheer-landingspagina's** (`voorraadbeheer-software`, `-systeem`, `-webshop`, enz.) concurreren onderling. Overweeg differentiëren of consolideren.

### D. Markdown-voor-agents werkt niet op de content-pagina's
De markdown-middleware draait alleen op server-rendered (`prerender:false`) routes. Maar juist de rijkste content (alle 59 SEO-pagina's, blogs, support-artikelen, integratie-detailpagina's) is `prerender:true` en wordt als statische HTML geserveerd, dus die middleware draait er nooit. Een agent die `Accept: text/markdown` stuurt naar bv. `/voorraadbeheer-met-excel-een-complete-gids` krijgt HTML, geen markdown. **Opties:** óf die content-routes op `prerender:false` zetten (SSR-kosten), óf statische `.md`-zusterbestanden genereren bij de build. Dit is een architectuurkeuze met een afweging, dus aan jou.

### E. FAQ structured data uitbreiden  (makkelijke SEO+AI-winst)
`FAQPage` JSON-LD staat nu alleen op de FAQ- en prijzen-pagina, terwijl de `FaqList`-component op ~40 pagina's zichtbare FAQ's toont (alle feature- en landingspagina's). Die FAQ's komen uit de getypte `faqs.ts`-data, dus er is een schone bron. FAQ-schema overal waar FaqList rendert = kans op rich results in Google én betere extractie door AI. Ik heb dit niet automatisch gedaan om geen dubbele/foute structured data te riskeren, maar het is laagdrempelig. Zeg "doen" en ik bouw het netjes (met dubbel-emit-guard op de FAQ/prijzen-pagina).

### F. Meta descriptions buiten de optimale lengte
Een cluster meta descriptions is te lang (wordt afgekapt in Google, >160 tekens) of te dun (<60 tekens). Voorbeelden: `featureLocations` 209, `featurePicklists` ~200 tekens; en diverse SEO-artikelen waarvan de `excerpt` 1-op-1 de meta description is (tot 281 tekens). Dit netjes inkorten is licht herschrijven van marketingtekst, dus ik laat het aan jou (of zeg "kort ze in" en ik doe een conservatieve pass die de betekenis behoudt). Volledige lijst in Appendix C.

### G. Kleine consistentie-keuzes
- **`pay-as-you-go` schrijfwijze** is door de hele site inconsistent: 5 verschillende vormen (`Pay as you Go`, `pay-as-you-go`, `pay as you go`, `Pay as you go`, `Pay-as-you-go`). Kies één canonieke vorm (waarschijnlijk `pay-as-you-go`, zoals in de URL's).
- **Hergebruikte/placeholder hero-afbeeldingen.** `blogs/product-tags.md` hergebruikt de afbeelding én alt-tekst (`"ShopLinkr logo"`) van het inkomende-leveringen-artikel; `blogs/hoe-koppel-je-bol-com-met-jouw-webshop.md` deelde een hero zonder alt (alt heb ik wel toegevoegd). Eigen beeld kiezen is aan jou.
- **Dubbele excerpts/meta:** `blogs/woocommerce-koppelen-aan-shoplinkr.md` heeft een excerpt dat byte-identiek is aan dat van de Shopify-blog (op de naam na). Eén van de twee uniek maken.
- **Engels-stijl Title Case** in enkele NL blogs (`Wat Zijn Voorraadsystemen?`) waar de rest sentence case gebruikt. Bewust niet automatisch omgezet (risico op fout-casen van eigennamen). Zeg "doen" en ik doe het eigennaam-bewust.
- **Off-tier card-paddings** op een paar pagina's (ContactPage `p-7 md:p-8`, TeamPage `p-8 md:p-12`) wijken licht af van de canon, maar kunnen bewust zijn. Niet aangeraakt.

---

## 3. SEO tips & tricks

1. **Los de verweesde SEO-pagina's op (beslissing C).** Dit is de grootste structurele SEO-winst: interne links zijn hoe Google pagina's vindt en hun belang inschat. Een hub + contextuele links tillen 59 pagina's van "vrijwel onzichtbaar" naar "geïndexeerd en gerankt".
2. **Voeg `SoftwareApplication`/`Product` schema toe voor ShopLinkr zelf.** Nu is er `Organization` + `WebSite`, maar geen product-schema met categorie, besturingssysteem (web), aanbieder en (indien gewenst) `AggregateRating`/`Offer`. Dat helpt Google het product begrijpen en kan rich results opleveren.
3. **Zet `og:type` op `article` voor artikel-pagina's.** `BaseHead` hardcodet nu `website` voor alles, ook blogs/SEO/support. Artikelen horen `og:type=article` met `article:published_time`/`article:modified_time`. Lage moeite, betere social/SEO-signalen.
4. **Echte `dateModified`.** De Article-JSON-LD zet `dateModified` gelijk aan `datePublished`. Een echte laatst-bijgewerkt-datum (en `lastmod` in de sitemap) is een versheid-signaal voor Google.
5. **Maak titles en H1's onderscheidend.** Op de voorraad-landingspagina's zijn `<title>` en H1 vrijwel dezelfde keyword-string; varieer ze (titel = keyword + merk, H1 = waardepropositie).
6. **FAQ-schema uitrollen (beslissing E)** voor kans op FAQ-rich-results.
7. **Consolideer dunne, concurrerende pagina's (beslissing C).** Eén sterke pagina rankt beter dan twee dunne die om dezelfde term vechten.
8. **Klein:** voeg `twitter:site`/`twitter:creator` toe als je een X-handle hebt; geef de integratie-detailpagina's een specifieker schema dan generiek `WebPage`.

## 4. AI-indexering tips & tricks (ChatGPT, Claude, Perplexity, Google AI)

Wat al goed staat: `robots.txt` staat alle grote AI-crawlers expliciet toe met `Content-Signal: search=yes, ai-input=yes, ai-train=yes`; er is een `Organization`-entiteit met `sameAs`; `llms.txt` + `llms-full.txt` + `.well-known/api-catalog` zijn aanwezig en correct bedraad. Sterke basis.

Verbeterpunten:
1. **Laat de markdown-middleware ook op content-pagina's werken (beslissing D).** Dit is de belangrijkste AI-winst: de hele kennisbank (SEO-gidsen, blogs, support) is nu níet als schone markdown opvraagbaar voor agents, terwijl dat juist de meest citeerwaardige content is.
2. **`FAQPage` + `HowTo` structured data (beslissing E).** AI-modellen halen vraag-antwoord- en stap-voor-stap-structuren er makkelijk uit. 57 van de ~62 SEO-artikelen hebben al een "Veelgestelde vragen over..."-sectie met Q&A in de body, maar zonder schema. Support-artikelen zijn overwegend stappenplannen, perfect voor `HowTo`.
3. **Houd `llms.txt` synchroon met de site.** Nu de 59 SEO-pagina's op root-URL's staan, zou de "Resources"-sectie van `llms.txt` een paar van die sterke gidsen mogen noemen (Excel-voorraadbeheer, vervoerder-koppelingen) zodat agents ze vinden. (De dode juridische links heb ik al gefixt.)
4. **Definieer ShopLinkr crisp en machine-leesbaar** op de homepage en in `llms.txt`: in één zin wat het is (Nederlands WMS/voorraadplatform voor MKB-webshops), voor wie, en de kern-integraties. Dat staat er deels al; maak het de eerste, ondubbelzinnige alinea zodat AI het letterlijk kan citeren.
5. **Semantische HTML-landmarks** (`<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`) consequent gebruiken helpt zowel toegankelijkheid als AI-parsing.

---

## 5. Appendices

Hieronder de volledige, machine-gegenereerde lijsten.

### Appendix B — Mogelijk verzonnen / onverifieerbare claims (66, niet aangepast)

### blogs/wat-is-een-ean-code.md
- (high) Over-specific date claim that EAN was renamed to International Article Number 'sinds 2009'. The EAN/IAN renaming and the 2009 year are an unverifiable, very specific factual claim that should be confirmed before publishing.
  EVIDENCE: "EAN staat voor European Article Number, sinds 2009 internationaal bekend als International Article Number."

### blogs/wat-is-verzenden-via-bol-(vvb)-precies.md
- (high) Specific shipping-option claim that bol.com offers 'same-day delivery' as a VVB verzendoptie. This is an over-specific, unverifiable claim about a third party's service tiers and should be confirmed.
  EVIDENCE: "Kies uit verschillende verzendopties die bol.com biedt, van standaard tot same-day delivery."

### seo/hoe-koppel-ik-dpd-met-bol.md
- (high) Unverifiable / likely fabricated third-party claim. The article asserts bol.com offers a subscription service 'Bol.com Select' and runs an event called the 'Bulk 10-daagse'. The 'Bulk 10-daagse' does not appear to be a real bol.com event name (bol does not mar
  EVIDENCE: ""...diensten zoals Bol.com Select, een abonnementsdienst..." en "...evenementen zoals de Bulk 10-daagse, waar klanten kunnen profiteren van grote kortingen...""

### global
- (high) Recurring unverifiable marketing statistics in the closing CTA across most audited articles: 'al meer dan 110.000 bestellingen hebben verwerkt', 'beheer meer dan 22.000 producten in ons systeem', and 'binnen 15 minuten volledig opgezet'. These are over-specifi
  EVIDENCE: ""Sluit je aan bij de duizenden tevreden gebruikers die al meer dan 110.000 bestellingen hebben verwerkt..." / "...beheer meer dan 22.000 producten in ons systee"

### seo/bol-lvb-voorraad-switch.md
- (high) Risk of describing a feature/behavior that may not match reality. The article presents the 'bol LVB voorraad switch' as a function to 'direct schakelen tussen de lokale voorraad en de bol.com voorraad' in realtime. LVB (Logistiek via bol) is bol's fulfilment s
  EVIDENCE: ""De bol LVB voorraad switch is een innovatieve functie die aanbieders op bol in staat stelt om direct te schakelen tussen de lokale voorraad en de bol.com voorr"

### seo/hoe-koppel-ik-dpd-met-shopify.md
- (high) Over-specific, unverifiable third-party statistics about DPD presented as fact (employee count, fleet size, founding year). Numbers like these change over time and are not sourced; high risk of being wrong/outdated.
  EVIDENCE: "DPD is opgericht in 1976 ... Met meer dan 46.000 medewerkers en een vloot van 42.000 voertuigen, is DPD in staat om miljoenen pakketten per dag te bezorgen."

### seo/hoe-koppel-ik-dpd-met-woocommerce.md
- (high) Over-specific, unverifiable third-party statistics about DPD presented as fact (founding year/place, employee count, fleet size).
  EVIDENCE: "DPD is opgericht in 1976 in Aschaffenburg, Duitsland ... Met meer dan 46.000 medewerkers en 42.000 voertuigen zorgt DPD voor de levering van miljoenen pakketten"

### seo/hoe-koppel-ik-myparcel-met-shopify.md
- (high) Over-specific, unverifiable third-party claims about MyParcel presented as fact (founding year, international reach to a precise country count).
  EVIDENCE: "MyParcel is een Nederlands bedrijf dat in 2009 is opgericht ... internationaal verzenden naar meer dan 220 landen wereldwijd."

### seo/hoe-koppel-ik-postnl-met-shopify.md
- (high) Over-specific, unverifiable third-party claim about PostNL's history presented as fact. Combined with the woocommerce twin this is also internally inconsistent: here PostNL's history is dated to "de 19e eeuw", while hoe-koppel-ik-postnl-met-woocommerce.md stat
  EVIDENCE: "PostNL heeft een lange geschiedenis die teruggaat tot de 19e eeuw."

### seo/hoe-koppel-ik-postnl-met-woocommerce.md
- (high) Over-specific, unverifiable third-party founding-year claim for PostNL, and it contradicts the PostNL/Shopify article (which dates the origin to the 19th century).
  EVIDENCE: "PostNL heeft een lange geschiedenis die teruggaat tot de oprichting van het bedrijf in 1799."
- (high) Over-specific, unverifiable third-party claim about WooCommerce launch year and originator presented as fact.
  EVIDENCE: "WooCommerce is in 2011 gelanceerd door WooThemes"

### global (all 15 ShopLinkr CTA paragraphs)
- (high) Specific marketing statistics about ShopLinkr usage repeated in every article's closing CTA. These are concrete, unverifiable numbers; if outdated or unsubstantiated they are a factual-risk claim. Flagging for human verification (do not auto-change).
  EVIDENCE: "al meer dan 110.000 bestellingen hebben verwerkt en meer dan 22.000 producten ... (e.g. hoe-koppel-ik-dpd-met-shopify.md line 51)"

### global (alle 15 artikelen, in de afsluitende CTA-alinea)
- (high) Elke CTA bevat zeer specifieke, niet-verifieerbare cijfers: 'meer dan 110.000 bestellingen verwerkt' en 'meer dan 22.000 producten in ons systeem'. Dit zijn over-specifieke statistieken die als feitelijke claim gecontroleerd moeten worden (kloppen ze nog? cons
  EVIDENCE: ""die al meer dan 110.000 bestellingen hebben verwerkt en beheer meer dan 22.000 producten in ons systeem""

### seo/hoe-voorraad-bijhouden-in-excel-tips-en-tricks.md
- (high) Over-specifieke, niet-verifieerbare claim in de CTA: 'binnen 15 minuten volledig opgezet'. Dit is een concrete tijdsbelofte die niet uit de overige content blijkt.
  EVIDENCE: ""ervaar hoe eenvoudig het is om binnen 15 minuten volledig opgezet te zijn""

### seo/innosend-en-woocommerce-samen-gebruiken.md
- (high) Het hele integratie-hoofdstuk beschrijft een niet-bestaande 'Innosend-plugin' voor WordPress die je via Plugins zou installeren en als verzendmethode onder WooCommerce > Verzenden selecteert. Dat is in tegenspraak met het eigen artikel (Innosend koppelt via Sh
  EVIDENCE: ""moet je eerst de Innosend-plugin installeren op je WordPress-website ... zoeken naar \"Innosend\". ... Klik op \"Verzenden\" en selecteer Innosend als verzendm"

### seo/qls-en-bol-samen-gebruiken.md
- (high) The bol logistics service is named incorrectly as 'Fulfillment by Bol (FBB)'. bol's own service was 'Logistiek via bol (LVB)' and is now 'Verzenden via bol (VVB)'. 'Fulfillment by Bol / FBB' echoes Amazon's FBA branding and is not a real bol product name. The 
  EVIDENCE: "l20: "een geavanceerde logistieke dienst genaamd \"Fulfillment by Bol\" (FBB). Met FBB kun je je voorraad opslaan in het magazijn van bol"; l64: "Maak gebruik v"

### seo/verkopen-via-bol-com.md
- (high) Hardcoded over-specific volume claims ('meer dan 110.000 bestellingen en 22.000 producten'). These exact numbers appear in multiple SEO files and date from the article's writing; they are unverifiable and likely stale. Human must confirm or replace with a curr
  EVIDENCE: "l44: "wij hebben al meer dan 110.000 bestellingen en 22.000 producten probleemloos verwerkt""

### seo/verkopen-via-bol-zonder-voorraad.md
- (high) Same over-specific, unverifiable volume claim as verkopen-via-bol-com.md ('meer dan 110.000 bestellingen verwerkt en meer dan 22.000 producten'). Stale/unverifiable stat; human must verify.
  EVIDENCE: "l88: "Met meer dan 110.000 bestellingen verwerkt en meer dan 22.000 producten in ons systeem""

### seo/voorraadbeheer-met-excel-een-complete-gids.md
- (high) Two unverifiable specific claims in the closing CTA: 'duizenden tevreden gebruikers die al meer dan 110.000 bestellingen hebben verwerkt' and 'binnen 15 minuten volledig opgezet te zijn'. The order count is the same stale stat as elsewhere; the 15-minute setup
  EVIDENCE: "l81: "duizenden tevreden gebruikers die al meer dan 110.000 bestellingen hebben verwerkt" and "binnen 15 minuten volledig opgezet te zijn""

### seo/sendcloud-en-shopify-samen-gebruiken.md
- (high) Specific, version-sensitive carrier-count claim 'meer dan 25 vervoerders'. sendy-en-woocommerce uses no number, and sendcloud-en-woocommerce states 'meer dan 35 vervoerders' for the same Sendcloud platform. Two different carrier counts for the same provider ac
  EVIDENCE: "l13: "de keuze uit meer dan 25 vervoerders""

### seo/sendcloud-en-woocommerce-samen-gebruiken.md
- (high) Carrier-count claim 'meer dan 35 vervoerders' contradicts sendcloud-en-shopify-samen-gebruiken.md which says 'meer dan 25 vervoerders' for the same Sendcloud platform. Unverifiable and internally inconsistent. Human must verify.
  EVIDENCE: "l18: "Sendcloud werkt samen met meer dan 35 vervoerders""

### seo/producten-verkopen-via-bol.md
- (high) Vague volume claim 'er zijn al duizenden producten en bestellingen via ons systeem verwerkt' conflicts with the much larger, more specific '110.000 bestellingen / 22.000 producten' claimed in verkopen-via-bol-com.md and verkopen-via-bol-zonder-voorraad.md. Inc
  EVIDENCE: "l63: "er zijn al duizenden producten en bestellingen via ons systeem verwerkt""

### seo/sendy-en-bol-samen-gebruiken.md
- (high) Claims Sendy supports 'realtime tracking' and integrates 'met verschillende e-commerce platforms, waaronder Shopify, WooCommerce en Magento'. Within ShopLinkr, Sendy is a verzendplatform/label tool reached via ShopLinkr; the named direct multi-platform integra
  EVIDENCE: "l12 "biedt Sendy realtime tracking"; l16 "integratie met verschillende e-commerce platforms, waaronder Shopify, WooCommerce en Magento""

### seo/sendy-en-woocommerce-samen-gebruiken.md
- (high) Describes a 'Sendy WooCommerce Plugin' and Sendy being installed 'op je server' with an 'API-sleutel van Sendy' configured in WooCommerce. In the ShopLinkr context Sendy is connected via ShopLinkr, not a self-hosted server plugin; this reads like content about
  EVIDENCE: "l23 "de instructies volgen om het op je server te installeren"; l57 "de Sendy WooCommerce Plugin installeren en activeren ... de API-sleutel van Sendy""

### seo/sendcloud-en-bol-samen-gebruiken.md
- (high) The integration steps describe configuring the bol-Sendcloud link inside Sendcloud's own UI ('Meld je aan bij je Sendcloud-account en navigeer naar "ShopLinkr"', 'Ga naar je bol-verkopersaccount en schakel de Sendcloud-integratie in'). This contradicts the res
  EVIDENCE: "l90 "Meld je aan bij je Sendcloud-account en navigeer naar \"ShopLinkr\""; l99 "Ga naar je bol-verkopersaccount en schakel de Sendcloud-integratie in""

### support/account/abonnement/de-gratis-proefperiode.md
- (high) Concrete duur van de proefperiode (14 dagen) is een verifieerbaar feit dat consistent moet zijn met de werkelijke productinstelling en met andere artikelen. een-abonnement-starten.md noemt eveneens '14 dagen' (consistent), maar dit getal moet door een mens gev
  EVIDENCE: "regel 16: "De proefperiode duurt 14 dagen." (ook in een-abonnement-starten.md regel 14: "de eerste 14 dagen geheel gratis")"

### support/aan-de-slag/voorbereiding/beginnen-met-shoplinkr.md
- (high) Over-specifieke claim over synchronisatieduur ('tot ongeveer 30 minuten') is een verifieerbare bewering die per kanaal/productaantal sterk kan verschillen. Moet door een mens worden gecontroleerd; niet als vaststaand feit aannemen.
  EVIDENCE: "regel 15: "Dit proces kan tot ongeveer 30 minuten duren, afhankelijk van je aantal producten en het type verkoopkanaal.""

### support/integraties/autoprint/auto-print-instellen.md
- (high) Hardcoded prijs voor de PrintNode/AutoPrint optie in support-content. Prijzen kunnen wijzigen en zijn niet verifieerbaar vanuit deze taak; pricing hoort niet vastgepind in een artikel maar verwijst idealiter naar de prijzenpagina.
  EVIDENCE: "PrintNode is een extra optie binnen ShopLinkr en kost 25 euro per maand."
- (high) Over-specifieke, niet-verifieerbare ROI/marketingclaim in support-content. Het stelt als zekerheid dat de investering bij 20 bestellingen per dag wordt terugverdiend; dat is een onbewijsbare belofte.
  EVIDENCE: "Met 20 bestellingen per dag verdien je deze investering in tijdsbesparing zeker terug."

### blogs-en/manage-products-in-one-place.md
- (high) Over-specific, unverifiable order-volume claim used as a marketing stat. Cannot be verified from the codebase; needs human confirmation before publishing as a hard number.
  EVIDENCE: "Join the webshops that already process more than 110,000 orders through ShopLinkr."

### blogs-en/what-is-an-ean-code.md
- (high) EN (international) article instructs readers to register with the 'Dutch branch' of GS1. For an English-locale audience this is a geographically incorrect/over-specific assumption (GS1 has a national branch per country, not the Dutch one for international read
  EVIDENCE: "Register your company with the Dutch branch in order to receive codes."

### seo-en/how-to-connect-dpd-to-bol.md
- (high) DPD founding year contradicts the other two DPD articles. This file says DPD was founded in 1977, while how-to-connect-dpd-to-shopify.md and how-to-connect-dpd-to-woocommerce.md both say 1976 (the woocommerce file even adds 'in Aschaffenburg, Germany'). At mos
  EVIDENCE: "DPD was founded in 1977 and has grown into a leading parcel delivery company."
- (high) Names a specific bol.com customer event, the 'Bulk 10-day event', as something bol.com regularly runs. This appears to be a fabricated or mistranslated event name (it conflates bol's seller-side 'Bulk'/bulkbestellingen concept with a consumer discount campaign
  EVIDENCE: "Bol also regularly runs special sales campaigns and events such as the Bulk 10-day event, where customers can take advantage of big discounts on a variety of pr"

### seo-en/how-to-connect-dpd-to-shopify.md
- (high) Over-specific, unverifiable DPD headcount/fleet figures that directly contradict the woocommerce article. This file claims 68,000 employees and 32,000 vehicles; how-to-connect-dpd-to-woocommerce.md claims 46,000 employees and 42,000 vehicles. The numbers canno
  EVIDENCE: "With more than 68,000 employees and a fleet of 32,000 vehicles, DPD is able to deliver millions of parcels per day."

### seo-en/how-to-connect-dpd-to-woocommerce.md
- (high) Over-specific, unverifiable DPD headcount/fleet figures that contradict the shopify article (46,000 employees / 42,000 vehicles here vs 68,000 / 32,000 in how-to-connect-dpd-to-shopify.md).
  EVIDENCE: "With more than 46,000 employees and 42,000 vehicles, DPD delivers millions of parcels every day, making them one of the largest players in the logistics sector."

### seo-en/how-to-connect-postnl-to-shopify.md vs how-to-connect-postnl-to-woocommerce.md
- (high) The two PostNL articles give contradictory founding dates for PostNL. The Shopify article says PostNL has a 'long history dating back to the 19th century'; the WooCommerce article says 'the founding of the company in 1799' (18th century). Both cannot be correc
  EVIDENCE: "postnl-to-shopify.md line 14: 'PostNL has a long history dating back to the 19th century.' | postnl-to-woocommerce.md line 15: 'PostNL has a long history that g"

### seo-en/how-to-connect-postnl-to-shopify.md
- (high) The step-by-step guide describes installing an official 'PostNL app' from the Shopify App Store and selecting 'PostNL' as a carrier in the Shopify admin shipping settings. This contradicts the canonical ShopLinkr model (used in the QLS and Sendy articles) wher
  EVIDENCE: "lines 29-32: 'Installing the PostNL app ... Go to the Shopify App Store and search for the PostNL app. Click 'Install' ...' and 'Select 'PostNL' as the carrier'"

### seo-en/how-to-connect-myparcel-to-shopify.md
- (high) The article describes tracking orders and printing labels via a native 'MyParcel app' inside Shopify (a 'Print shipping labels' button 'in the MyParcel app'), which contradicts the article's own step that the connection runs through ShopLinkr (line 29). Descri
  EVIDENCE: "line 53: 'Then click the "Print shipping labels" button in the MyParcel app.' and line 51: 'With the MyParcel app you can easily track ...' vs line 29: 'connect"
- (high) Over-specific verifiable claims about MyParcel that are unverifiable in-context: founded in 2009 and ships 'internationally to more than 220 countries worldwide'. These precise stats/dates are the kind of fabricated/over-specific claims that should be human-ve
  EVIDENCE: "line 13: 'a Dutch company that was founded in 2009' | line 19: 'ship internationally to more than 220 countries worldwide.'"

### seo-en/how-to-connect-myparcel-to-woocommerce.md
- (high) Claim that 'with MyParcel you have direct access to affordable shipping rates from various carriers' is a pricing/feature claim presented as fact and links it as such; combined with the article never mentioning ShopLinkr in the actual connection steps, the des
  EVIDENCE: "line 16: 'with MyParcel you have direct access to <a ...>affordable shipping rates</a> from various carriers'; steps section (lines 23-24) only mentions ShopLin"

### seo-en/how-to-connect-postnl-to-woocommerce.md
- (high) The guide instructs the reader to install a 'PostNL for WooCommerce' plugin from the WordPress Plugin Directory and set up the PostNL API directly in WooCommerce. This describes a direct-plugin workflow that contradicts the ShopLinkr connection model used else
  EVIDENCE: "line 30: 'search for the "PostNL for WooCommerce" plugin. Install and activate the plugin' | lines 33-34: 'set up the PostNL API ... create an API key'"

### seo-en/how-to-connect-sendcloud-to-shopify.md
- (high) Describes integrating via 'Sendcloud's app for Shopify' from the Shopify App Store, a direct-app workflow that conflicts with the ShopLinkr-mediated connection the site sells (Sendcloud is offered as an integration through ShopLinkr per the linked /integration
  EVIDENCE: "line 36: 'you need to use Sendcloud's app for Shopify. Go to the Shopify App Store and search for the Sendcloud app. Install the app in your Shopify account'"

### seo-en/how-to-connect-myparcel-to-bol.md
- (high) Hard statistics presented as fact in the closing CTA: '+110,000 processed orders and +22,000 products in our system'. These specific numbers recur across the whole set and are exactly the kind of stat that must be human-verified rather than asserted; flagged p
  EVIDENCE: "line 42: 'We are proud of our +110,000 processed orders and +22,000 products in our system'"

### seo-en/how-to-connect-sendy-to-bol.md
- (high) Describes Sendy features that conflict with the rest of the set's definition of Sendy. Other Sendy articles (sendy-to-shopify, sendy-to-woocommerce) define Sendy as carrier/shipping software. This article claims Sendy enables 'automated email campaigns', 'pers
  EVIDENCE: "line 25: 'set up automated email campaigns ... send personalized emails based on purchase history' | line 27: 'optimize marketing strategies ... improved ROI on"

### seo-en/using-innosend-and-bol-together.md
- (high) States as fact a direct partnership/integration between Bol and Innosend ("Bol ... has integrated Innosend into its shipping process", "the partnership between Innosend and Bol"). The actual product connects these channels via ShopLinkr, not a native Bol-Innos
  EVIDENCE: "Bol, one of the largest online shopping platforms in the Netherlands, has integrated Innosend into its shipping process. This partnership has led to plenty of b"

### global (all 15 files, CTA paragraph)
- (high) Quantified marketing claims repeated in the closing CTA: "more than 110,000 orders", "more than 22,000 products", "thousands of satisfied users", and "fully set up within 15 minutes". These are over-specific, time-sensitive stats not surfaced anywhere in the l
  EVIDENCE: "Join the thousands of satisfied users who have already processed more than 110,000 orders ... experience how easy it is to be fully set up within 15 minutes."

### seo-en/using-sendcloud-and-bol-together.md
- (high) The integration procedure is fabricated and inverts the ShopLinkr <-> Sendcloud relationship. Step 1 tells the user to log in to their Sendcloud account and navigate to a "ShopLinkr" menu inside Sendcloud, and the final step tells them to enable a "Sendcloud i
  EVIDENCE: "L91: 'Log in to your Sendcloud account and navigate to "ShopLinkr".' L100: 'Go to your Bol seller account and enable the Sendcloud integration.' L32: 'Connect y"

### seo-en/using-sendy-and-woocommerce-together.md
- (high) ShopLinkr is wrongly described as "a feature of Sendy". This inverts the product relationship (ShopLinkr is the platform that connects to Sendy, not a feature inside Sendy) and is also inconsistent with the rest of the site's framing.
  EVIDENCE: "L45: 'you can connect carriers and sales channels to ShopLinkr, a feature of Sendy.'"
- (high) Describes Sendy as self-hosted software you 'install on your server', plus a dedicated 'Sendy WooCommerce Plugin' and direct 'Sendy API key' integration. This contradicts the SaaS framing in the same article (log in to your Sendy dashboard; orders flow via Sho
  EVIDENCE: "L24: 'go to the Sendy website and follow the instructions to install it on your server.' L58: 'you need to install and activate the Sendy WooCommerce Plugin ..."

### seo-en/using-sendcloud-and-shopify-together.md
- (high) Over-specific, unverifiable carrier count for Sendcloud that also directly contradicts the sibling article. This file says 'more than 25 carriers' while using-sendcloud-and-woocommerce-together.md says 'more than 35 carriers'. At least one is wrong and both ar
  EVIDENCE: "L14: 'Another major benefit is the choice of more than 25 carriers.'"

### seo-en/using-sendcloud-and-woocommerce-together.md
- (high) Over-specific, unverifiable Sendcloud carrier count that contradicts using-sendcloud-and-shopify-together.md ('more than 25 carriers'). The two articles cite different figures for the same product.
  EVIDENCE: "L19: 'Sendcloud works together with more than 35 carriers, including PostNL, DHL and UPS.'"

### seo-en/using-postnl-and-bol-together.md
- (high) The article asserts a direct corporate partnership between PostNL and Bol and makes over-specific operational claims about it as fact (e.g. PostNL physically collecting parcels at Bol's distribution center, joint future roadmap and 'long-term vision'). This is
  EVIDENCE: "L20: 'PostNL then collects the parcel at Bol's distribution center and takes care of the further handling and delivery.' L9: 'PostNL and Bol work closely togeth"

### support-en/inventory-management/products/unlimited-stock.md
- (high) Specific fallback stock number sent to channels that do not support "no stock management." This is an over-specific, unverifiable claim that should be confirmed against actual product behavior before publishing.
  EVIDENCE: ""ShopLinkr automatically sends a stock level of 1000 so the product is not marked as sold out.""

### support-en/order-processing/orders/merging-orders.md
- (high) The EN file says 'A merge may contain at most 1 Bol LVB order' but the NL twin (bestellingen-samenvoegen.md:23) says '1 Bol VVB-bestelling'. LVB (Logistiek via bol) and VVB (Verkoop via bol) are two different bol.com programs, so the EN translation references 
  EVIDENCE: "A merge may contain at most 1 Bol LVB order"

### src/components/pages/HomePage.astro
- (high) The homepage SoftwareApplication JSON-LD carries a hardcoded aggregateRating (ratingValue 4.9, ratingCount 47). This emits a rich-result review snippet to Google. If these numbers are not a true aggregate of real, verifiable reviews (e.g. the Trustpilot profil
  EVIDENCE: "aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', bestRating: '5', ratingCount: '47' }"

### seo/hoe-koppel-ik-dpd-met-bol.md (and the whole 'hoe-koppel-ik' set)
- (high) The 'how to connect' step-by-step is factually wrong about where the coupling happens, which both misleads users and undercuts topical authority for the exact query the page targets. The page gives steps 'Log in op je Bol-account / Navigeer naar de instellinge
  EVIDENCE: "hoe-koppel-ik-dpd-met-bol.md: 'Het koppelingsproces ... 1. Log in op je Bol-account. 2. Navigeer naar de instellingen voor verzending. 3. Selecteer DPD als je g"

### /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/src/data/faqs.ts
- (high) Specific, unverifiable support response-time claim ('binnen 2 uur tijdens kantooruren'). Appears in prijzen and contact answers. Over-specific SLA-style numbers should be human-verified, not assumed.
  EVIDENCE: "key prijzen line 314 "...een reactietijd van doorgaans binnen 2 uur tijdens kantooruren."; key contact line 324 "...reageren we doorgaans binnen 2 uur.""
- (high) Hard-coded WhatsApp/phone number and office hours. These are factual contact details that must be verified as current; a wrong number is a broken support channel.
  EVIDENCE: "key contact line 328: "...op +31 6 49 78 12 12, maandag tot en met vrijdag van 08:30 tot 17:00." (EN twin line 328 identical number)"
- (high) Concrete feature/limit claims that should be human-verified: 'vijf rollen' with named default roles, '6-cijferige code', named authenticator apps (Google/Microsoft/Authy/1Password), '90 dagen' pickfrequentie, 'vier vaste rapporten' named, 'gratis trial van 14 
  EVIDENCE: "gebruikers line 250 'vijf rollen: Beheerder...Inkoop'; line 262 '6-cijferige code'; rapporten line 202 'vier vaste rapporten...'; rapporten line 210 'afgelopen "
- (medium) Named integration list (channels + carriers) is exhaustive and specific. Lists like this drift quickly; if a named integration is removed or renamed, the FAQ becomes inaccurate. Same list duplicated in EN line 302.
  EVIDENCE: "key prijzen line 302: "Bol, Shopify, WooCommerce, Lightspeed, Kaufland en koppelingen met PostNL, DPD, GLS, MyParcel, Sendcloud, Sendy, QLS, ParcelPro en Innose"

### seo/innosend-en-bol-samen-gebruiken.md
- (medium) De inleiding presenteert 'bol' als een verzendtool naast Innosend ('Twee van deze populaire tools zijn Innosend en bol' / 'verzendtools'). bol is een verkoopkanaal/marktplaats, geen verzendtool; dit is feitelijk onnauwkeurig en kan lezers misleiden.
  EVIDENCE: ""Twee van deze populaire tools zijn Innosend en bol." en eerder "tal van verzendtools beschikbaar""
- (medium) Verzonnen/over-specifieke roadmap-claim: het artikel voorspelt concrete toekomstige features ('geautomatiseerde retourenafhandeling en voorkeursvervoerders') als verwachte ontwikkelingen. Niet-verifieerbare belofte over toekomstige functionaliteit.
  EVIDENCE: ""nieuwe functionaliteiten toevoegen, zoals geautomatiseerde retourenafhandeling en voorkeursvervoerders""

### seo/innosend-en-shopify-samen-gebruiken.md
- (medium) Onverifieerbare/over-specifieke claim: Innosend zou 'intelligente algoritmen' gebruiken om adresgegevens te analyseren en automatisch in te vullen. Dit is een uitgesproken functieclaim die niet elders wordt onderbouwd en mogelijk verzonnen is.
  EVIDENCE: ""Het platform maakt gebruik van intelligente algoritmen om adresgegevens te analyseren en automatisch in te vullen.""

### seo/myparcel-en-bol-samen-gebruiken.md
- (medium) Over-specifieke, niet-verifieerbare productroadmap/feature-claims: het artikel beschrijft voorraadsynchronisatie tussen MyParcel en bol als bestaande functie ('Je kunt je voorraad synchroniseren tussen MyParcel en bol') en noemt 'recente updates' zoals 'verbet
  EVIDENCE: ""Je kunt je voorraad synchroniseren tussen MyParcel en bol" / "Enkele recente updates zijn onder andere verbeterde voorraadsynchronisatie en nieuwe verzendoptie"

### support/account/facturatie-en-prijzen/een-abonnement-starten.md
- (medium) Concrete tijdsclaim 'binnen 2 minuten geregeld' is een marketing-/verifieerbare bewering. Borderline; laat een mens beoordelen of dit klopt en gewenst is.
  EVIDENCE: "regel 12: "Een abonnement starten is erg eenvoudig en is binnen 2 minuten geregeld!""

### seo-en/how-to-connect-sendy-to-shopify.md
- (medium) Carrier list inconsistency for Sendy across articles. Sendy-to-shopify and sendy-to-woocommerce list Sendy carriers as 'PostNL, DHL and DPD', while the Sendcloud articles list 'PostNL, DHL and UPS'. Not contradictory per se (different products), but the specif
  EVIDENCE: "sendy-to-shopify.md line 12: 'carriers such as PostNL, DHL and DPD'"


### Appendix C — Alle 319 bevindingen per categorie
(meta-description-lengtes staan onder `seo-content` en `seo-technical`)

### a11y (37)
- [high] c/seo-en/how-to-connect-dpd-to-bol.md:9 — Duplicate <h1> on the rendered page. The article's frontmatter title is already rendered as the page <h1> by ArticleLayout (src/layouts/ArticleLayout.astro line 63), but 
- [high] c/seo-en/how-to-connect-dpd-to-shopify.md:9 — Duplicate <h1> on the rendered page (in-body <h1> in addition to the frontmatter title rendered as <h1> by ArticleLayout).
- [high] c/seo-en/how-to-connect-dpd-to-woocommerce.md:9 — Duplicate <h1> on the rendered page (in-body <h1> in addition to the frontmatter title rendered as <h1> by ArticleLayout).
- [high] c/seo-en/how-to-connect-innosend-to-bol.md:9 — Duplicate <h1> on the rendered page (in-body <h1> in addition to the frontmatter title rendered as <h1> by ArticleLayout).
- [high] c/seo-en/how-to-connect-innosend-to-shopify.md:9 — Duplicate <h1> on the rendered page (in-body <h1> in addition to the frontmatter title rendered as <h1> by ArticleLayout).
- [high] c/seo-en/how-to-connect-innosend-to-woocommerce.md:9 — Duplicate <h1> on the rendered page (in-body <h1> in addition to the frontmatter title rendered as <h1> by ArticleLayout).
- [medium] c/seo/hoe-koppel-ik-sendy-met-bol.md:8 — De body bevat een eigen <h1> die de pagina-H1 dupliceert. De frontmatter title wordt al als H1 gerenderd door ArticleLayout (heading={page.data.title}). Hierdoor staan er
- [medium] c/seo/hoe-koppel-ik-sendy-met-shopify.md:8 — De body bevat een eigen <h1> die de pagina-H1 (gerenderd uit de frontmatter title) dupliceert, waardoor er twee H1's op de pagina staan.
- [medium] c/seo/hoe-koppel-ik-sendy-met-woocommerce.md:8 — De body bevat een eigen <h1> die de pagina-H1 (gerenderd uit de frontmatter title) dupliceert, waardoor er twee H1's op de pagina staan.
- [medium] c/support-en/order-processing/orders/create-reshipments.md:34 — Content/screenshot image has an empty alt attribute, so screen-reader users get no description of the illustration.
- [medium] c/support-en/order-processing/orders/mark-order-as-high-priority.md:14 — Content/screenshot image has an empty alt attribute, so the high-priority visual indicator it illustrates is not described for screen-reader users.
- [medium] c/support-en/order-processing/orders/postpone-an-order.md:14 — Content/screenshot image has an empty alt attribute, leaving screen-reader users without a description of the postpone feature it illustrates.
- [medium] c/support-en/order-processing/pick-lists/working-with-pick-lists.md:55 — Content image has an empty alt attribute. Screenshots illustrating the pick/scan flow are meaningful content images and should have descriptive alt text for accessibility
- [medium] c/support-en/order-processing/pick-lists/working-with-pick-lists.md:101 — Content image has an empty alt attribute. This screenshot illustrating bin-based processing is a meaningful content image and should have descriptive alt text.
- [medium] components/layout/Header.astro:153-184 — Desktop nav dropdown trigger ("Over") is a <button> that opens its submenu purely via CSS group-hover / group-focus-within, but carries a static aria-expanded that is nev
- [medium] components/layout/Header.astro:191-228 — Desktop mega-menu trigger ("Functionaliteiten") is an <a> that also reveals a flyout panel via group-hover/group-focus-within, but has no aria-haspopup and no aria-expand
- [low] c/blogs/producten-beheren-op-een-plek.md:lines 10, 12 — Heading hierarchy starts at h3 with no preceding h2 in the body. The article jumps from the page h1 (title) straight to h3, skipping the h2 level, unlike the other blogs 
- [low] c/support/account/facturatie-en-prijzen/alles-wat-je-moet-weten-over-het-abonnement.md:16 — Zwakke, niet-beschrijvende link-tekst: alleen het woord 'deze' is de link, en de linktekst zegt niets over de bestemming (een functieverzoek indienen). Slecht voor toegan
- [low] c/support/account/facturatie-en-prijzen/het-pay-as-you-go-model.md:13 — Zwakke link-tekst 'Hier' verwijst naar de prijzencalculator. Niet-beschrijvende ankertekst is slecht voor toegankelijkheid en SEO.
- [low] c/support/aan-de-slag/voorbereiding/beginnen-met-shoplinkr.md:15, 17 — Twee keer wordt 'deze pagina' als ankertekst gebruikt voor verschillende bestemmingen (webshops-en-marketplaces en vervoerders). Niet-beschrijvende ankertekst; bovendien 
- [low] c/support/integraties/api/api-overzicht.md:21 — Niet-beschrijvende linktekst 'hier'. Voor toegankelijkheid en SEO is generieke linktekst zoals 'hier' ongewenst; de linktekst moet de bestemming beschrijven. De documenta
- [low] c/support/integraties/vervoerders/dpd-koppelen.md:19 — Content-afbeelding met leeg alt-attribuut. Screenshots in support-artikelen horen een beschrijvend alt te hebben voor toegankelijkheid en SEO.
- [low] c/support/integraties/vervoerders/innosend-koppelen.md:21, 27, 33, 39, 45, 51, 57 — Alle screenshots in dit artikel hebben een leeg alt-attribuut (7 afbeeldingen). Content-afbeeldingen horen een beschrijvend alt te hebben.
- [low] c/support/integraties/vervoerders/myparcel-koppelen.md:21, 27, 33 — Alle screenshots in dit artikel hebben een leeg alt-attribuut. Content-afbeeldingen horen een beschrijvend alt te hebben voor toegankelijkheid en SEO.
- [low] c/support/orderverwerking/bestellingen/backorders.md:14 — Body section headings start at <h3>, skipping the <h2> level. The page template renders the frontmatter title as the <h1>, so the document goes h1 -> h3 with no h2, a ski
- [low] c/support/orderverwerking/bestellingen/bestelling-annuleren.md:13 — Body section headings start at <h3>, skipping <h2>. With the title rendered as <h1>, the document jumps h1 -> h3. Inconsistent with the integraties articles that use <h2>
- [low] c/support/orderverwerking/bestellingen/bestelling-markeren-als-hoge-prioriteit.md:14 — Body section headings start at <h3>, skipping <h2> (title is the h1). Document jumps h1 -> h3. Inconsistent with the integraties articles that use <h2>.
- [low] c/support/orderverwerking/bestellingen/bestelling-uitstellen.md:23 — Body section headings start at <h3>, skipping <h2> (title is the h1). Document jumps h1 -> h3. Inconsistent with the integraties articles that use <h2>.
- [low] c/support/orderverwerking/bestellingen/bestellingen-batches.md:13 — Body section headings start at <h3>, skipping <h2> (title is the h1). Document jumps h1 -> h3. Inconsistent with the integraties articles that use <h2>.
- [low] c/support/orderverwerking/bestellingen/bestellingen-overzicht.md:13 — Body section headings start at <h3>, skipping <h2> (title is the h1). Document jumps h1 -> h3. Inconsistent with the integraties articles that use <h2>.
- [low] c/blogs-en/bol-stock-synchronization.md:frontmatter — Missing imageAlt in frontmatter. 8 of the 12 EN blog files define imageAlt; this one does not, leaving the hero image without descriptive alt text (a11y/SEO gap and an in
- [low] c/blogs-en/connect-qls-to-shoplinkr.md:frontmatter — Missing imageAlt in frontmatter while the sibling integration blogs (Bol, MyParcel, Sendcloud, Sendy, Shopify, WooCommerce, DPD) all define imageAlt. Hero image has no al
- [low] c/blogs-en/how-to-connect-bol-com-to-your-webshop.md:frontmatter — Missing imageAlt in frontmatter; hero image (shared with connect-bol-to-shoplinkr.md, which does have imageAlt) has no alt text here.
- [low] c/blogs-en/inventory-management.md:frontmatter — Missing imageAlt in frontmatter; hero image has no descriptive alt text, unlike the majority of the EN blog set.
- [low] c/support-en/integrations/carriers/connect-dpd.md:20 — Content image has an empty alt attribute, so screen-reader and SEO context for the step screenshot is missing. Same empty-alt pattern appears throughout the carrier-conne
- [low] c/support-en/integrations (all screenshots, support-en wide):e.g. connect-parcelpro.md:22 — Every screenshot in the support content uses an empty alt attribute (alt=""), treating all 57 support images as decorative. For step-by-step instructional screenshots, de
- [low] components/ThemeToggle.astro:45-51 — The desktop ThemeToggle dropdown trigger declares aria-haspopup="true" aria-expanded="false" but the value is hardcoded and never updated when the CSS group-hover/group-f

### ai-readiness (6)
- [high] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/middleware.ts:8-10, 61-86 — The markdown-for-agents middleware only runs on server-rendered (prerender:false) routes, exactly as its own comment states ('Pages must be server-rendered (prerender: fa
- [medium] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/public/llms.txt:32-35 — The 59 SEO landing pages now live at ROOT URLs (confirmed: src/content/seo/ has 59 NL files served via [slug].astro, src/content/seo-en/ has 59 EN) and are the strongest 
- [tip] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/public/robots.txt:1-39 — robots.txt is in good shape for AI readiness: it Allows the major AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBo
- [tip] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/pages/support/[slug].astro:81 — Support articles emit Schema.org TechArticle (good and valid for machine extraction). However the support content is overwhelmingly step-by-step instructions ('Ga naar In
- [tip] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/layouts/BaseLayout.astro:37-71 — The entity definition for ShopLinkr is strong: Organization schema (name, url, logo, description, email, telephone, NL address, sameAs to LinkedIn/Instagram/Trustpilot) p
- [tip] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/public/.well-known/api-catalog:1-21 — The api-catalog and the vercel.json Link header (rel=describedby for llms.txt + rel=api-catalog) are correctly set up and the anchor/service-desc/service-doc URLs match l

### brand (43)
- [high] c/seo/hoe-koppel-ik-sendcloud-met-shopify.md:2 — Titel bevat merknamen in kleine letters. De title wordt 1-op-1 als <title> en als H1 op de pagina gerenderd (SeoArticlePage -> ArticleLayout heading), dus dit is zichtbaa
- [high] c/seo/hoe-koppel-ik-sendy-met-bol.md:2 — Titel bevat de productnaam 'sendy' in kleine letters. De title wordt als <title> en H1 gerenderd, dus zichtbaar. 'sendy' hoort 'Sendy' te zijn (bol mag wel klein blijven)
- [high] c/seo/hoe-koppel-ik-sendy-met-shopify.md:2 — Titel bevat merknamen in kleine letters. De title wordt als <title> en H1 gerenderd, dus zichtbaar. 'sendy' en 'shopify' horen 'Sendy' en 'Shopify' te zijn.
- [medium] c/seo/dpd-en-bol-samen-gebruiken.md:8, 22, 24, 26, 28, 30, 32, 34, 36, 38, 39 — Brand-casing inconsistency for 'bol'. Per the site brand standard, 'bol' is lowercase mid-sentence and only capitalized at the very start of a sentence. This article capi
- [medium] c/seo/hoe-koppel-ik-dpd-met-bol.md:8, 17, 18, 20, 22, 23, 24, 25, 27, 46, 55, 59, 65, 68, 70, 72, 74, 75, 76, 77, 78, 79, 80 — Brand-casing inconsistency for 'bol'. 'Bol' is capitalized ~33 times mid-sentence ('koppelen met Bol', 'het koppelen van DPD aan Bol', 'klantenservice van DPD of Bol'), a
- [medium] c/seo/hoe-koppel-ik-sendy-met-bol.md:11, 15, 17 — In de body wordt 'Bol' herhaaldelijk met hoofdletter midden in de zin geschreven, terwijl de huisstijl bol bewust met kleine letter schrijft (alleen aan het begin van een
- [medium] c/seo/sendy-en-bol-samen-gebruiken.md:frontmatter + body lines 8,17,18,19,20,21,22,23,25,26,28,29,30,31,32,34,35 — This entire article treats the retailer name as the proper noun 'Bol' (capital B) 33 times, almost all of them mid-sentence. The site standard is deliberately lowercase '
- [medium] c/seo/qls-en-shopify-samen-gebruiken.md:2 — Frontmatter title lowercases the brand 'QLS' as 'Qls'. QLS is consistently uppercase in the body and is a proper brand acronym. The sibling title 'Sendcloud en Shopify sa
- [medium] c/seo/qls-en-woocommerce-samen-gebruiken.md:2 — Frontmatter title lowercases both brand names: 'Qls' (should be QLS) and 'woocommerce' (should be WooCommerce). The body uses 'QLS' and 'WooCommerce' correctly, and the s
- [medium] c/seo/sendy-en-woocommerce-samen-gebruiken.md:2 — Frontmatter title lowercases the brand 'WooCommerce' as 'woocommerce'. Body uses 'WooCommerce' correctly.
- [medium] c/seo-en/selling-products-on-bol.md:9, 13, 35, 39, 41, 44, 46, 64 (body prose) — Pervasive mid-sentence capitalization of "Bol"/"Bol.com" in body prose, contradicting the site's deliberate lowercase "bol"/"bol.com" retailer-brand convention (which sib
- [medium] c/seo-en/using-dpd-and-bol-together.md:23, 25, 27, 29, 31, 33, 35, 37, 39, 40 (body prose) — Body prose consistently capitalizes "Bol" mid-sentence (33 occurrences total), contradicting the deliberate lowercase "bol" convention used elsewhere on the site. Heading
- [medium] c/support-en/order-processing/orders/orders-overview.md:79 — Mid-sentence the retailer brand is capitalized as 'Bol', but the site convention is lowercase 'bol' mid-sentence (capital only at sentence start). The NL twin (bestelling
- [medium] i18n/locales/en.ts (pages.bolInventory.description) + en/bol-inventory.astro page copy:1992 — The EN bol page uses capital "Bol" mid-sentence repeatedly, including inside the meta description (which renders in the SERP snippet). Per the brand rule, the bol.com bra
- [medium] i18n/locales/nl.ts:45 — heroOrder.ttToBol capitalizes 'Bol' mid-phrase ('Track & trace naar Bol'), while the EN twin (en.ts line 43) uses lowercase 'to bol'. Per the brand rule, 'bol' must be lo
- [low] c/blogs/bol-com-koppelen-aan-shoplinkr.md:line 2 — Title begins with lowercase 'bol' in sentence-start (title-start) position. Per the brand rule lowercase bol is correct mid-sentence but capital 'Bol' applies at the very
- [low] c/blogs/bol-com-voorraad-synchronisatie.md:line 2 — Title begins with lowercase 'bol' in sentence-start (title-start) position, same title-start capitalization question as bol-com-koppelen-aan-shoplinkr.md.
- [low] c/seo/qls-en-bol-samen-gebruiken.md:15 — Capital 'Bol' used mid-sentence in the H2 heading and intro, inconsistent with the rest of the file which uses lowercase 'bol'. 'Bol' here is not at the start of a senten
- [low] c/seo/qls-en-bol-samen-gebruiken.md:2 — Frontmatter title lowercases the brand acronym 'QLS' as 'Qls'. QLS is uppercase throughout the body.
- [low] c/seo/sendy-en-shopify-samen-gebruiken.md:2 — Frontmatter title lowercases the brand 'Shopify' as 'shopify'. Body uses 'Shopify' correctly throughout.
- [low] c/seo/voorraadbeheer-met-excel-een-complete-gids.md:2 — Frontmatter title lowercases 'excel'. Excel is a proper product name and is capitalized everywhere in the body ('Excel').
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/c/support/orderverwerking/bestellingen/bestellingen-samenvoegen.md:23 — Retailer brand 'bol' is capitalized mid-sentence. The rest of the support corpus deliberately writes 'bol' lowercase mid-sentence (e.g. 'voor bol.', 'van bol.', 'bijvoorb
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/c/support/orderverwerking/bestellingen/bestellingen-samenvoegen.md:90 — Retailer brand 'bol' is capitalized mid-sentence ('en Bol'). Shopify keeps its capital correctly, but 'bol' should be lowercase mid-sentence per the convention used every
- [low] c/blogs-en/bol-stock-synchronization.md:3, 11, 12, 15, 21, 24, 27, 28, 29 — The retailer brand 'bol' is deliberately lowercase mid-sentence (the NL twin blogs/bol-com-voorraad-synchronisatie.md uses lowercase 'bol' everywhere mid-sentence: 'bol w
- [low] c/blogs-en/how-to-connect-bol-com-to-your-webshop.md:31 — Inconsistent product/brand reference: the body mixes 'bol store' (lowercase, line 31) and 'bol.com store' (line 50) and 'bol.com webshop' (frontmatter/body). Lowercase 'b
- [low] c/blogs-en/the-importance-of-good-inventory-management-for-your-webshop.md:12 — Mid-sentence retailer brand 'Bol' is capitalized. Per the brand rule, 'bol'/'bol.com' is deliberately lowercase mid-sentence; capital 'Bol' is only correct at the very st
- [low] c/seo-en/selling-on-bol.md:9, 11, 13, 19, 34-37, 39, 41, 44-46, 50, 58, 63, 64 (body prose) — Mixed casing: file is mostly correct lowercase "bol.com" (32 occurrences) but contains ~30 mid-sentence "Bol.com" with a capital B (e.g. "By joining Bol.com", "a seller o
- [low] c/support-en/getting-started/introduction/what-is-shoplinkr.md:19 — The bol.com link text is capitalized "Bol" mid-sentence. The retailer brand is deliberately lowercase "bol" except at the very start of a sentence. Here it sits mid-sente
- [low] c/support-en/integrations/webshops-and-marketplaces/connect-bol.md:21 — "Bol" is capitalized mid-sentence. Per the site brand rule, the bol brand is deliberately lowercase mid-sentence and capital "Bol" is only correct at the very start of a 
- [low] c/support-en/integrations/webshops-and-marketplaces/connect-bol.md:36 — "Bol" capitalized mid-sentence; should be lowercase per the deliberate-lowercase bol rule. NL twin uses "het bol account" (lowercase).
- [low] c/support-en/integrations/webshops-and-marketplaces/connect-bol.md:3 — Summary capitalizes "Bol" mid-phrase; the brand is deliberately lowercase. NL twin summary uses "je bol account" (lowercase).
- [low] c/support-en/order-processing/orders/merging-orders.md:24 — Mid-phrase brand capitalized as 'Bol' where the lowercase-bol convention applies (not at sentence start). Same brand is written lowercase 'bol' in cancel-an-order.md with
- [low] c/support-en/order-processing/orders/merging-orders.md:91 — Mid-sentence brand capitalized as 'Bol' where lowercase 'bol' is the convention mid-sentence. The NL twin matches this casing ('Shopify en Bol'), so the deviation exists 
- [low] c/seo/verkopen-via-bol-com.md and similar (formal 'uw' in informal NL copy):verkopen-via-bol-com.md:17 — Some older SEO articles slip into formal 'u/uw' inside otherwise informal je/jij copy, which breaks the brand tone and reads inconsistently. This is a content-quality sig
- [low] i18n/locales/nl.ts:987, 1005 — featureCarriers uses capital 'Bol' mid-sentence in subheading ('Of een bestelling nu via Bol...') and mockupTrackNote ('T&T direct terug naar Bol...'). The EN twin (en.ts
- [low] i18n/locales/nl.ts:2246, 2229, 2244, 2284, 2017 (and EN twins) — Several SEO landing pages (inventoryWebshop, inventorySystem, inventoryManagement, inventorySoftware, efficientWebshop rows) write 'Bol' with a capital B mid-sentence in 
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/data/faqs-en.ts:25 — British spelling 'colours' on an EN page; American English requires 'colors'.
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/data/faqs-en.ts:34 — British spellings 'metres' and 'metre' on an EN page; American English uses 'meters' / 'meter'.
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/data/faqs-en.ts:34 — British 'litres' on an EN page; American English uses 'liters'.
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/data/faqs-en.ts:78, 90, 288 — British spelling 'recognises' / 'recognisable' on an EN page; American English requires 'recognizes' / 'recognizable'.
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/data/faqs.ts:214 — Brand 'Bol' is capitalized mid-sentence. Per the ShopLinkr convention, bol/bol.com is deliberately lowercase mid-sentence; capital Bol is only correct at the very start o
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/data/faqs.ts:56 — Brand 'Bol' is capitalized mid-sentence (this one is borderline: it follows a question mark so it starts a new sentence/clause; flagging for human review since the channe
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/data/faqs-en.ts:56, 214 — Brand 'Bol' is capitalized mid-sentence (EN twin of the NL Bol-casing issue). Mid-sentence the channel name should be lowercase 'bol' per convention.

### bug (2)
- [critical] c/seo-en/how-to-connect-qls-to-shopify.md:70-71 — The file body ends with leaked tool-call markup instead of valid content. After the final </p>, the raw lines </content> and </invoke> are present. These are not valid HT
- [medium] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/middleware.ts:62 (and 90); guard at top of onRequest (line 61-62) — CONFIRMED build-warning root cause. onRequest reads context.request.headers (and context.request.method) unconditionally at the very top of the handler. Because output:'s

### consistency (67)
- [medium] c/blogs/product-tags.md:lines 5-6 — Wrong/placeholder hero image: this Product Tags article reuses the image AND imageAlt of the 'inkomende-leveringen-registreren' article. The image path points to the inko
- [medium] c/seo/hoe-koppel-ik-dpd-met-bol.md:2 — Title lowercases the brand acronym 'dpd'. DPD is an initialism and is written 'DPD' everywhere in the body of this article and in the titles of the sibling articles (dpd-
- [medium] c/seo/hoe-koppel-ik-postnl-met-bol.md:45 — Internal link anchor text does not match its destination: the link points to a WooCommerce<->Bol integration page but the visible/contextual text is about linking 'PostNL
- [medium] c/seo/hoe-koppel-ik-postnl-met-shopify.md:39 — Internal link destination mismatches its anchor text and topic: in a PostNL/Shopify article a link about 'productgegevens correct worden overgedragen' points to a WooComm
- [medium] c/seo/hoe-voorraad-bijhouden-in-excel-tips-en-tricks.md:3, 8, 10-51 — Dit artikel is volledig in de formele u/uw-vorm geschreven, terwijl de ShopLinkr-huisstijl informeel is (je/jij/jouw) en alle andere artikelen in deze set consequent 'je/
- [medium] c/support/aan-de-slag/introductie/zoeken-in-shoplinkr.md:3, 12, 22-24 — De summary en de intro-alinea sommen vier doorzoekbare onderdelen op (producten, bestellingen, retouren en leveringen), maar de lijst eronder bevat een vijfde: Batches. L
- [medium] c/blogs-en/bol-stock-synchronization.md:10, 12, 27 — Heading-structure drift from the NL twin. The NL twin (blogs/bol-com-voorraad-synchronisatie.md) uses real <h2> headings for each section ('Wat is bol.com voorraad synchr
- [medium] c/blogs-en/inventory-management.md:10, 12, 24, 36, 38 — Heading-level drift from the NL twin. The NL twin (blogs/voorraadmanagement.md) uses <h2> for all five section headings, but this EN file uses <h3>. Since the page title 
- [medium] c/blogs-en/how-advanced-inventory-systems-make-the-difference.md:11, 13, 15, 27, 29 — Heading-level drift from the NL twin. The NL twin (blogs/hoe-geavanceerde-voorraadsystemen-het-verschil-maken.md) uses <h2> for all section headings; this EN file uses <h
- [medium] c/seo-en/how-to-connect-sendy-to-bol.md:12 — Inconsistent definition of Sendy within the same content set. This article calls Sendy 'an e-commerce fulfillment platform that helps businesses manage shipments, invento
- [medium] c/support-en/integrations/carriers/connect-myparcel.md:40 — Term mismatch within the article: step 3 tells the user to "Copy the API key", but step 5 says "Enter the Public key you copied in step 3". Nothing in the EN text explain
- [medium] c/support-en/inventory-management/products/import-and-export-products.md:summary (line 3) + intro (line 13) vs section (line 15) + step (line 25) — The article contradicts itself about what the import does. The summary says "Import products in bulk via CSV" and the intro says "add products in bulk or download your pr
- [medium] c/support-en/order-processing/orders/create-reshipments.md:38 — Status-name inconsistency for the same prerequisite. This file says a reshipment can only be created 'from an order with the status: Processed', but orders-overview.md (l
- [medium] i18n/locales/en.ts:1990-2004 — pages.bolInventory capitalizes 'Bol' throughout almost every mid-sentence occurrence (Bol sellers, Bol account, sale on Bol, Shipping via Bol, Fulfillment by Bol), but th
- [low] c/blogs/hoe-geavanceerde-voorraadsystemen-het-verschil-maken.md:lines 2, 10, 12, 14, 26, 28 — Title and all body headings use English-style Title Case (every word capitalized), which is inconsistent with the sentence-case Dutch headings used in every other blog (e
- [low] c/blogs/hoe-koppel-je-bol-com-met-jouw-webshop.md:lines 5-6 — Reuses the bol-com-koppelen hero image (shared with bol-com-koppelen-aan-shoplinkr.md) and has no imageAlt at all, so the image renders without alt text (accessibility/SE
- [low] c/blogs/het-belang-van-goed-voorraadbeheer-voor-jouw-webshop.md:line 3 — Weak excerpt: very short, has no closing punctuation, and is generic compared to the other blogs' descriptive excerpts. Reads like a placeholder.
- [low] c/blogs/bol-com-voorraad-synchronisatie.md:lines 9-10, 8 vs 14-28 — Inconsistent brand spelling within the same article: it mixes 'bol.com' and 'bol' for the same retailer, sometimes in the same sentence/heading (e.g. heading 'Wat is bol.
- [low] c/blogs/locatiebeheer.md:lines 21, 24 — Mixed heading/label casing inside body bold labels: most use sentence case but several use Title Case ('Altijd Up-to-date', 'Voorraad waarde inzichtelijk', 'De Handige Fu
- [low] c/blogs/voorraadmanagement.md:9, 11, 23, 35, 37 — Headings wrap their text in redundant <strong> inside <h2> (e.g. <h2><strong>...</strong></h2>). Headings are already bold by default, so this double-bolds and is inconsi
- [low] c/blogs/voorraadsystemen.md:9, 11, 23, 35, 48 — Same redundant <strong> inside every <h2> heading as voorraadmanagement.md; headings are already bold.
- [low] c/blogs/shopify-koppelen-aan-shoplinkr.md:18 — Inconsistent spelling of realtime across the blog corpus: this file and the Webwinkel article use closed 'realtime', while voorraadsystemen.md and voorraadmanagement.md u
- [low] c/seo/alles-wat-je-moet-weten-over-voorraadbeheer-in-excel.md:2 — Title lowercases 'excel'. Excel is a Microsoft product name (proper noun) and is capitalized 'Excel' 22 times in this article's body (only 3 stray lowercase). Sibling tit
- [low] c/seo/effectief-voorraadbeheer-met-excel.md:2 — Title lowercases 'excel'. The body uses 'Excel' 38 times; the lowercase title is inconsistent with the body and with the well-formed sibling title 'Effectief voorraadbehe
- [low] c/seo/gratis-voorraadbeheer-excel-template-download-nu.md:2 — Title lowercases 'excel'. The body consistently writes 'Excel' (e.g. 'Excel template', 'Microsoft Excel'). Lowercase 'excel' in the title is inconsistent.
- [low] c/seo/gratis-voorraadbeheer-in-excel-zo-doe-je-dat.md:2 — Title lowercases 'excel'. The body uses 'Excel' throughout; lowercase 'excel' in the title is inconsistent with the body and sibling titles.
- [low] global (frontmatter title casing across 14 of 15 files):frontmatter line 2 — The frontmatter title (which renders as the page H1, the <title> tag and the JSON-LD headline) lowercases third-party brand names in almost every file (dpd, shopify, wooc
- [low] c/seo/hoe-koppel-ik-qls-met-bol.md:54 and 57 — Two internal links are root-relative while every other internal link across these articles uses an absolute https://shoplinkr.com/... URL. They resolve correctly (served 
- [low] c/seo/hoe-koppel-ik-innosend-met-shopify.md:16 — Internal link anchor text is about Innosend/Shopify shipping, but the href points to a generic Bol<->webshop blog post, so the link is off-topic for this Innosend/Shopify
- [low] c/seo/hoe-koppel-ik-myparcel-met-woocommerce.md:16 — Internal link anchor about 'automatische orderverwerking' (MyParcel/WooCommerce topic) points to a generic Bol<->webshop blog post, off-topic for this article (templated 
- [low] c/seo/hoe-koppel-ik-sendcloud-met-shopify.md:2 — Titel-casing is inconsistent binnen deze set: de WooCommerce-varianten schrijven merknamen correct ('Hoe koppel ik Sendcloud met WooCommerce?', 'Hoe koppel ik Sendy met W
- [low] c/seo/hoe-voorraad-bijhouden-in-excel-tips-en-tricks.md:3 — De excerpt/summary is een enkele generieke zin die het artikel niet samenvat (geen vermelding van Excel-tips, voorraadbeheer-aanpak of doelgroep). Zwakke meta description
- [low] c/seo/qls-en-bol-samen-gebruiken.md:20, 64 — The same service name is capitalized two different ways within one article: 'Fulfillment by Bol' (line 20) versus 'Fulfillment by bol' (line 64).
- [low] c/seo/sendcloud-en-bol-samen-gebruiken.md:52, 65 — The bol fulfilment service is referred to as 'bol Fulfilment' here, while the related qls-en-bol article calls it 'Fulfillment by Bol (FBB)' and producten-verkopen-via-bo
- [low] c/seo/producten-verkopen-via-bol.md:3 — The excerpt is a truncated, mid-thought sentence with no closing punctuation/question mark; it ends 'klantenbestand van bol.' which reads as cut off (the body's full sent
- [low] c/seo/producten-verkopen-via-bol.md:2 — Two SEO articles cover nearly identical bol-selling onboarding content with overlapping titles, risking keyword cannibalization: 'Producten verkopen via bol' (this file, 
- [low] c/seo/sendy-en-shopify-samen-gebruiken.md:15 — Inconsistent hyphenation of the same term within one article: 'realtime' (one word) vs 'real-time'. Pick one form.
- [low] c/seo/sendy-en-woocommerce-samen-gebruiken.md:70 — The conclusion is rendered as a plain bold-less paragraph 'Conclusie:' on its own line followed by a paragraph, instead of an H2 heading like the other articles use ('<h2
- [low] c/support/account/facturatie-en-prijzen/een-abonnement-starten.md:4, 12 — Lichte redundantie/herhaling: summary en eerste zin van de body zeggen vrijwel hetzelfde ('eenvoudig en zo geregeld' vs 'erg eenvoudig en is binnen 2 minuten geregeld'). 
- [low] c/support/aan-de-slag/voorbereiding/bedrijfsinstellingen.md:50 — Genderspecifieke verwijzing 'hij' voor de magazijnmedewerker breekt met de neutrale je/jij-toon van de rest van de content en is niet inclusief.
- [low] c/support/account/facturatie-en-prijzen/alles-wat-je-moet-weten-over-het-abonnement.md:2, 4 — Titel ('Informatie over het abonnement') en summary ('Alles wat je moet weten over het abonnement bij ShopLinkr') en slug (alles-wat-je-moet-weten-over-het-abonnement) lo
- [low] c/support/account/toegang-en-beveiliging/inloggen-met-qr-code.md:34 — Terminologie-inconsistentie: het artikel heet 'Inloggen met QR-code' en gebruikt overal de feature-naam 'QR-login', maar bij de inlogstap wordt de gebruiker gevraagd te k
- [low] c/support/integraties/vervoerders/myparcel-koppelen.md:33 — De screenshot bij de stap 'Verbind vervoerder' verwijst naar een afbeelding uit de dpd-koppelen map (gedeelde generieke 'Verbind vervoerder' screenshot, ook gebruikt in d
- [low] c/support/integraties/vervoerders/sendcloud-koppelen.md:12 — Unlike the sibling carrier articles (parcelpro, qls, sendy), this article omits the standard intro sentence 'Volg de onderstaande stappen om Sendcloud te koppelen met Sho
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/c/support/orderverwerking/picklijsten/filters-opslaan-op-picklijsten.md:38 — Numeral 'one' written without accent where the meaning is the count 'only once'. The corpus uses accented 'één' for the numeral (e.g. single-bestellingen.md 'slechts één 
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/c/support/orderverwerking/bestellingen/bestellingen-samenvoegen.md:93 — Numeral 'one' written without accent where it means the count 'only one order left'. Same document uses 'één' for the numeral elsewhere (line 12 'tot één pakket'). 'één' 
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/c/support/voorraadbeheer/producten/producten-overzicht.md:2 — Title is written as two words 'Producten overzicht' while the body consistently uses the closed compound 'productoverzicht' (and the slug is producten-overzicht). Dutch s
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/c/support/voorraadbeheer/voorraad/voorraad-notificaties.md:31 — Navigation step uses two words 'Voorraad notificaties' while the article title and intro use the closed compound 'Voorraadnotificaties' one word. If this mirrors the lite
- [low] c/blogs-en (global):titles — Title-case inconsistency across the blog set. Most titles use sentence case ('Connect Bol to ShopLinkr', 'Connecting QLS to ShopLinkr', 'Connecting Sendcloud to ShopLinkr
- [low] c/blogs-en/product-tags.md:5 — The product-tags article reuses the exact same hero image (and folder) as the incoming-deliveries article, with imageAlt 'ShopLinkr logo'. The image path points to the 'i
- [low] c/seo-en (DPD/Innosend in-body H1s):9 — The in-body H1s use inconsistent over-capitalized title case ('How Do I Connect DPD To Bol?', capitalizing 'Do', 'To') while the corresponding frontmatter title uses norm
- [low] c/seo-en (multiple files):various — Inconsistent linking style for the inventory Excel template: some files use a relative href (/en/inventory-excel-template) while others use the absolute https://shoplinkr
- [low] c/seo-en/how-to-connect-myparcel-to-bol.md:27,38 — The MyParcel-to-Bol article never mentions that the connection is made through ShopLinkr in its step section, unlike the QLS and Sendy articles which clearly state the Sh
- [low] c/seo-en/how-to-connect-sendcloud-to-bol.md:9,33-54 — The Sendcloud/Bol article describes a direct Sendcloud-to-Bol connection (add Bol.com as a sales channel inside Sendcloud, enter Bol API key) and never positions it as go
- [low] c/seo-en/using-dpd-and-shopify-together.md:2 (frontmatter title) — Title capitalizes "Together" while 18 of 21 sibling "Using ... together" titles use lowercase "together". Inconsistent title casing.
- [low] c/seo-en/using-dpd-and-woocommerce-together.md:2 (frontmatter title) — Title capitalizes "Together" while the corpus convention is lowercase "together".
- [low] c/support-en/account/billing-and-pricing/subscription-information.md:14 — The product feature is named "Pay as you Go" everywhere else (the dedicated article title "The \"Pay as you Go\" model", in view-invoices.md, in what-is-shoplinkr.md, and
- [low] c/support-en/integrations/carriers/connect-myparcel.md:34 — The screenshot at the "Connect carrier" step in this MyParcel guide reuses the DPD image path instead of a MyParcel-specific image. This matches the NL twin (which also r
- [low] c/support-en/integrations/carriers/connect-myparcel.md:2 — Title verb form is inconsistent with sibling carrier articles in the same subcategory. This file uses the imperative "Connect MyParcel" while connect-dpd.md and connect-i
- [low] c/support-en/integrations/carriers/connect-sendcloud.md:54 — This is the only carrier-connection file missing the standard closing bold line that every other carrier (QLS, Sendy, ParcelPro, DPD, Innosend, MyParcel) ends with. The a
- [low] c/support-en/integrations/webshops-and-marketplaces/connect-shopify.md:52 — Closing line uses "From this moment on" while the sibling marketplace files (connect-bol, connect-kaufland, connect-woocommerce) all use "From this point on". Minor wordi
- [low] c/support-en/reports-and-insights/reports/reports-overview.md:17-19 — The reports overview refers to the never-sold-products report as "Never sold products" (heading, body text, and link label), but that article's own canonical title is hyp
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/public/llms-full.txt:3, 42, 347 — llms-full.txt lists Lightspeed as a supported sales channel (lines 42 and 347: 'Bol, Shopify, WooCommerce, Lightspeed, Kaufland'), but llms.txt does not mention Lightspee
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/data/faqs.ts:68, 136 — Carrier-support answer differs in scope between two FAQ keys. The 'bestellingen' carrier answer says 'ShopLinkr ondersteunt onder andere PostNL, DPD en GLS' (limited list
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/data/supportCategories.ts:40-49 — Two account subcategories overlap and risk confusing the taxonomy: 'Facturatie & Prijzen' (summary 'abonnement, facturen en het Pay as you Go model') and 'Abonnement' (su
- [tip] c/blogs/het-belang-van-goed-voorraadbeheer-voor-jouw-webshop.md:line 16, 34 — Article ends by promising a 'volgende hoofdstuk' about software and then delivers it within the same article, but there is no closing CTA / trial link unlike the other fe
- [tip] global:na — NL/EN twin layout parity is structurally guaranteed and clean: every NL route (src/pages/<x>.astro) and its EN twin (src/pages/en/<y>.astro) import the exact same shared 

### darkmode (1)
- [medium] components/pages/FeatureCarriersPage.astro:235 — Logo-backing tile ring is missing its dark counterpart. The ring uses `ring-chalk-dark` (near-white #e8e8e8) with no `dark:ring-flint`, so in dark mode the logo tile gets

### deadcode (1)
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/package.json:package.json dependencies block; imports at middleware.ts:2-5 — Undeclared direct dependencies. src/middleware.ts imports 'unified', 'rehype-parse' and 'remark-stringify' (lines 2-5), but package.json only declares 'rehype-remark'. Th

### factual (66)
- [high] c/blogs/wat-is-een-ean-code.md:11 — Over-specific date claim that EAN was renamed to International Article Number 'sinds 2009'. The EAN/IAN renaming and the 2009 year are an unverifiable, very specific fact
- [high] c/blogs/wat-is-verzenden-via-bol-(vvb)-precies.md:17 — Specific shipping-option claim that bol.com offers 'same-day delivery' as a VVB verzendoptie. This is an over-specific, unverifiable claim about a third party's service t
- [high] c/seo/hoe-koppel-ik-dpd-met-bol.md:16 — Unverifiable / likely fabricated third-party claim. The article asserts bol.com offers a subscription service 'Bol.com Select' and runs an event called the 'Bulk 10-daags
- [high] global:CTA paragraph (last <p>) of ~11 of the 15 files — Recurring unverifiable marketing statistics in the closing CTA across most audited articles: 'al meer dan 110.000 bestellingen hebben verwerkt', 'beheer meer dan 22.000 p
- [high] c/seo/bol-lvb-voorraad-switch.md:10 — Risk of describing a feature/behavior that may not match reality. The article presents the 'bol LVB voorraad switch' as a function to 'direct schakelen tussen de lokale v
- [high] c/seo/hoe-koppel-ik-dpd-met-shopify.md:13 — Over-specific, unverifiable third-party statistics about DPD presented as fact (employee count, fleet size, founding year). Numbers like these change over time and are no
- [high] c/seo/hoe-koppel-ik-dpd-met-woocommerce.md:14 — Over-specific, unverifiable third-party statistics about DPD presented as fact (founding year/place, employee count, fleet size).
- [high] c/seo/hoe-koppel-ik-myparcel-met-shopify.md:12 and 18 — Over-specific, unverifiable third-party claims about MyParcel presented as fact (founding year, international reach to a precise country count).
- [high] c/seo/hoe-koppel-ik-postnl-met-shopify.md:13 — Over-specific, unverifiable third-party claim about PostNL's history presented as fact. Combined with the woocommerce twin this is also internally inconsistent: here Post
- [high] c/seo/hoe-koppel-ik-postnl-met-woocommerce.md:14 — Over-specific, unverifiable third-party founding-year claim for PostNL, and it contradicts the PostNL/Shopify article (which dates the origin to the 19th century).
- [high] c/seo/hoe-koppel-ik-postnl-met-woocommerce.md:17 — Over-specific, unverifiable third-party claim about WooCommerce launch year and originator presented as fact.
- [high] global (all 15 ShopLinkr CTA paragraphs):closing CTA paragraph (last <p>) — Specific marketing statistics about ShopLinkr usage repeated in every article's closing CTA. These are concrete, unverifiable numbers; if outdated or unsubstantiated they
- [high] global (alle 15 artikelen, in de afsluitende CTA-alinea):sendcloud-shopify:53; sendcloud-woocommerce:80; sendy-bol:58; sendy-shopify:131; sendy-woocommerce:70; innosend-*; myparcel-*; postnl-* — Elke CTA bevat zeer specifieke, niet-verifieerbare cijfers: 'meer dan 110.000 bestellingen verwerkt' en 'meer dan 22.000 producten in ons systeem'. Dit zijn over-specifie
- [high] c/seo/hoe-voorraad-bijhouden-in-excel-tips-en-tricks.md:51 — Over-specifieke, niet-verifieerbare claim in de CTA: 'binnen 15 minuten volledig opgezet'. Dit is een concrete tijdsbelofte die niet uit de overige content blijkt.
- [high] c/seo/innosend-en-woocommerce-samen-gebruiken.md:38-40 — Het hele integratie-hoofdstuk beschrijft een niet-bestaande 'Innosend-plugin' voor WordPress die je via Plugins zou installeren en als verzendmethode onder WooCommerce > 
- [high] c/seo/qls-en-bol-samen-gebruiken.md:20, 64 — The bol logistics service is named incorrectly as 'Fulfillment by Bol (FBB)'. bol's own service was 'Logistiek via bol (LVB)' and is now 'Verzenden via bol (VVB)'. 'Fulfi
- [high] c/seo/verkopen-via-bol-com.md:44 — Hardcoded over-specific volume claims ('meer dan 110.000 bestellingen en 22.000 producten'). These exact numbers appear in multiple SEO files and date from the article's 
- [high] c/seo/verkopen-via-bol-zonder-voorraad.md:88 — Same over-specific, unverifiable volume claim as verkopen-via-bol-com.md ('meer dan 110.000 bestellingen verwerkt en meer dan 22.000 producten'). Stale/unverifiable stat;
- [high] c/seo/voorraadbeheer-met-excel-een-complete-gids.md:81 — Two unverifiable specific claims in the closing CTA: 'duizenden tevreden gebruikers die al meer dan 110.000 bestellingen hebben verwerkt' and 'binnen 15 minuten volledig 
- [high] c/seo/sendcloud-en-shopify-samen-gebruiken.md:13 — Specific, version-sensitive carrier-count claim 'meer dan 25 vervoerders'. sendy-en-woocommerce uses no number, and sendcloud-en-woocommerce states 'meer dan 35 vervoerde
- [high] c/seo/sendcloud-en-woocommerce-samen-gebruiken.md:18 — Carrier-count claim 'meer dan 35 vervoerders' contradicts sendcloud-en-shopify-samen-gebruiken.md which says 'meer dan 25 vervoerders' for the same Sendcloud platform. Un
- [high] c/seo/producten-verkopen-via-bol.md:63 — Vague volume claim 'er zijn al duizenden producten en bestellingen via ons systeem verwerkt' conflicts with the much larger, more specific '110.000 bestellingen / 22.000 
- [high] c/seo/sendy-en-bol-samen-gebruiken.md:12, 16 — Claims Sendy supports 'realtime tracking' and integrates 'met verschillende e-commerce platforms, waaronder Shopify, WooCommerce en Magento'. Within ShopLinkr, Sendy is a
- [high] c/seo/sendy-en-woocommerce-samen-gebruiken.md:23, 57 — Describes a 'Sendy WooCommerce Plugin' and Sendy being installed 'op je server' with an 'API-sleutel van Sendy' configured in WooCommerce. In the ShopLinkr context Sendy 
- [high] c/seo/sendcloud-en-bol-samen-gebruiken.md:90, 99 — The integration steps describe configuring the bol-Sendcloud link inside Sendcloud's own UI ('Meld je aan bij je Sendcloud-account en navigeer naar "ShopLinkr"', 'Ga naar
- [high] c/support/account/abonnement/de-gratis-proefperiode.md:16 — Concrete duur van de proefperiode (14 dagen) is een verifieerbaar feit dat consistent moet zijn met de werkelijke productinstelling en met andere artikelen. een-abonnemen
- [high] c/support/aan-de-slag/voorbereiding/beginnen-met-shoplinkr.md:15 — Over-specifieke claim over synchronisatieduur ('tot ongeveer 30 minuten') is een verifieerbare bewering die per kanaal/productaantal sterk kan verschillen. Moet door een 
- [high] c/support/integraties/autoprint/auto-print-instellen.md:14 — Hardcoded prijs voor de PrintNode/AutoPrint optie in support-content. Prijzen kunnen wijzigen en zijn niet verifieerbaar vanuit deze taak; pricing hoort niet vastgepind i
- [high] c/support/integraties/autoprint/auto-print-instellen.md:14 — Over-specifieke, niet-verifieerbare ROI/marketingclaim in support-content. Het stelt als zekerheid dat de investering bij 20 bestellingen per dag wordt terugverdiend; dat
- [high] c/blogs-en/manage-products-in-one-place.md:15 — Over-specific, unverifiable order-volume claim used as a marketing stat. Cannot be verified from the codebase; needs human confirmation before publishing as a hard number
- [high] c/blogs-en/what-is-an-ean-code.md:46 — EN (international) article instructs readers to register with the 'Dutch branch' of GS1. For an English-locale audience this is a geographically incorrect/over-specific a
- [high] c/seo-en/how-to-connect-dpd-to-bol.md:14 — DPD founding year contradicts the other two DPD articles. This file says DPD was founded in 1977, while how-to-connect-dpd-to-shopify.md and how-to-connect-dpd-to-woocomm
- [high] c/seo-en/how-to-connect-dpd-to-shopify.md:15 — Over-specific, unverifiable DPD headcount/fleet figures that directly contradict the woocommerce article. This file claims 68,000 employees and 32,000 vehicles; how-to-co
- [high] c/seo-en/how-to-connect-dpd-to-woocommerce.md:16 — Over-specific, unverifiable DPD headcount/fleet figures that contradict the shopify article (46,000 employees / 42,000 vehicles here vs 68,000 / 32,000 in how-to-connect-
- [high] c/seo-en/how-to-connect-dpd-to-bol.md:18 — Names a specific bol.com customer event, the 'Bulk 10-day event', as something bol.com regularly runs. This appears to be a fabricated or mistranslated event name (it con
- [high] c/seo-en/how-to-connect-postnl-to-shopify.md vs how-to-connect-postnl-to-woocommerce.md:14 / 15 — The two PostNL articles give contradictory founding dates for PostNL. The Shopify article says PostNL has a 'long history dating back to the 19th century'; the WooCommerc
- [high] c/seo-en/how-to-connect-postnl-to-shopify.md:29-34 — The step-by-step guide describes installing an official 'PostNL app' from the Shopify App Store and selecting 'PostNL' as a carrier in the Shopify admin shipping settings
- [high] c/seo-en/how-to-connect-myparcel-to-shopify.md:51-53 — The article describes tracking orders and printing labels via a native 'MyParcel app' inside Shopify (a 'Print shipping labels' button 'in the MyParcel app'), which contr
- [high] c/seo-en/how-to-connect-myparcel-to-shopify.md:13 / 19 — Over-specific verifiable claims about MyParcel that are unverifiable in-context: founded in 2009 and ships 'internationally to more than 220 countries worldwide'. These p
- [high] c/seo-en/how-to-connect-myparcel-to-woocommerce.md:16 — Claim that 'with MyParcel you have direct access to affordable shipping rates from various carriers' is a pricing/feature claim presented as fact and links it as such; co
- [high] c/seo-en/how-to-connect-postnl-to-woocommerce.md:30-34 — The guide instructs the reader to install a 'PostNL for WooCommerce' plugin from the WordPress Plugin Directory and set up the PostNL API directly in WooCommerce. This de
- [high] c/seo-en/how-to-connect-sendcloud-to-shopify.md:36 — Describes integrating via 'Sendcloud's app for Shopify' from the Shopify App Store, a direct-app workflow that conflicts with the ShopLinkr-mediated connection the site s
- [high] c/seo-en/how-to-connect-myparcel-to-bol.md:42 — Hard statistics presented as fact in the closing CTA: '+110,000 processed orders and +22,000 products in our system'. These specific numbers recur across the whole set an
- [high] c/seo-en/how-to-connect-sendy-to-bol.md:25-27 — Describes Sendy features that conflict with the rest of the set's definition of Sendy. Other Sendy articles (sendy-to-shopify, sendy-to-woocommerce) define Sendy as carri
- [high] c/seo-en/using-innosend-and-bol-together.md:21 — States as fact a direct partnership/integration between Bol and Innosend ("Bol ... has integrated Innosend into its shipping process", "the partnership between Innosend a
- [high] global (all 15 files, CTA paragraph):e.g. how-to-track-inventory-in-excel-tips-and-tricks.md:52, selling-on-bol-without-inventory.md:89, the-ultimate-guide-to-warehouse-software.md:60 — Quantified marketing claims repeated in the closing CTA: "more than 110,000 orders", "more than 22,000 products", "thousands of satisfied users", and "fully set up within
- [high] c/seo-en/using-sendcloud-and-bol-together.md:L32, L88-104 — The integration procedure is fabricated and inverts the ShopLinkr <-> Sendcloud relationship. Step 1 tells the user to log in to their Sendcloud account and navigate to a
- [high] c/seo-en/using-sendy-and-woocommerce-together.md:L45 — ShopLinkr is wrongly described as "a feature of Sendy". This inverts the product relationship (ShopLinkr is the platform that connects to Sendy, not a feature inside Send
- [high] c/seo-en/using-sendy-and-woocommerce-together.md:L24, L58 — Describes Sendy as self-hosted software you 'install on your server', plus a dedicated 'Sendy WooCommerce Plugin' and direct 'Sendy API key' integration. This contradicts
- [high] c/seo-en/using-sendcloud-and-shopify-together.md:L14 — Over-specific, unverifiable carrier count for Sendcloud that also directly contradicts the sibling article. This file says 'more than 25 carriers' while using-sendcloud-a
- [high] c/seo-en/using-sendcloud-and-woocommerce-together.md:L19 — Over-specific, unverifiable Sendcloud carrier count that contradicts using-sendcloud-and-shopify-together.md ('more than 25 carriers'). The two articles cite different fi
- [high] c/seo-en/using-postnl-and-bol-together.md:L9, L20, L37-42 — The article asserts a direct corporate partnership between PostNL and Bol and makes over-specific operational claims about it as fact (e.g. PostNL physically collecting p
- [high] c/support-en/inventory-management/products/unlimited-stock.md:line 30 — Specific fallback stock number sent to channels that do not support "no stock management." This is an over-specific, unverifiable claim that should be confirmed against a
- [high] c/support-en/order-processing/orders/merging-orders.md:24 — The EN file says 'A merge may contain at most 1 Bol LVB order' but the NL twin (bestellingen-samenvoegen.md:23) says '1 Bol VVB-bestelling'. LVB (Logistiek via bol) and V
- [high] components/pages/HomePage.astro:35-40 — The homepage SoftwareApplication JSON-LD carries a hardcoded aggregateRating (ratingValue 4.9, ratingCount 47). This emits a rich-result review snippet to Google. If thes
- [high] c/seo/hoe-koppel-ik-dpd-met-bol.md (and the whole 'hoe-koppel-ik' set):hoe-koppel-ik-dpd-met-bol.md (Het koppelingsproces section) — The 'how to connect' step-by-step is factually wrong about where the coupling happens, which both misleads users and undercuts topical authority for the exact query the p
- [high] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/data/faqs.ts:314, 324 — Specific, unverifiable support response-time claim ('binnen 2 uur tijdens kantooruren'). Appears in prijzen and contact answers. Over-specific SLA-style numbers should be
- [high] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/data/faqs.ts:328 — Hard-coded WhatsApp/phone number and office hours. These are factual contact details that must be verified as current; a wrong number is a broken support channel.
- [high] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/data/faqs.ts:202, 210, 250, 262, 306 — Concrete feature/limit claims that should be human-verified: 'vijf rollen' with named default roles, '6-cijferige code', named authenticator apps (Google/Microsoft/Authy/
- [medium] c/seo/innosend-en-bol-samen-gebruiken.md:8 — De inleiding presenteert 'bol' als een verzendtool naast Innosend ('Twee van deze populaire tools zijn Innosend en bol' / 'verzendtools'). bol is een verkoopkanaal/marktp
- [medium] c/seo/innosend-en-shopify-samen-gebruiken.md:13 — Onverifieerbare/over-specifieke claim: Innosend zou 'intelligente algoritmen' gebruiken om adresgegevens te analyseren en automatisch in te vullen. Dit is een uitgesproke
- [medium] c/seo/myparcel-en-bol-samen-gebruiken.md:13, 52 — Over-specifieke, niet-verifieerbare productroadmap/feature-claims: het artikel beschrijft voorraadsynchronisatie tussen MyParcel en bol als bestaande functie ('Je kunt je
- [medium] c/seo/innosend-en-bol-samen-gebruiken.md:75 — Verzonnen/over-specifieke roadmap-claim: het artikel voorspelt concrete toekomstige features ('geautomatiseerde retourenafhandeling en voorkeursvervoerders') als verwacht
- [medium] c/support/account/facturatie-en-prijzen/een-abonnement-starten.md:12 — Concrete tijdsclaim 'binnen 2 minuten geregeld' is een marketing-/verifieerbare bewering. Borderline; laat een mens beoordelen of dit klopt en gewenst is.
- [medium] c/seo-en/how-to-connect-sendy-to-shopify.md:12 — Carrier list inconsistency for Sendy across articles. Sendy-to-shopify and sendy-to-woocommerce list Sendy carriers as 'PostNL, DHL and DPD', while the Sendcloud articles
- [medium] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/data/faqs.ts:302 — Named integration list (channels + carriers) is exhaustive and specific. Lists like this drift quickly; if a named integration is removed or renamed, the FAQ becomes inac

### grammar (27)
- [medium] c/seo/gratis-voorraadbeheer-in-excel-zo-doe-je-dat.md:38 — Missing article. 'Je kunt bijvoorbeeld kolom toevoegen' is ungrammatical; the indefinite article 'een' is missing before 'kolom'.
- [medium] c/seo/eenvoudig-voorraadbeheer-in-excel-tips-en-tricks.md:69 — Adjective inflection error with a het-word. 'werkblad' is a het-word, so after the indefinite article 'een' the adjective takes no -e: it should be 'een apart werkblad', 
- [medium] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/c/support/orderverwerking/picklijsten/filters-opslaan-op-picklijsten.md:38 — Relative-pronoun gender disagreement. This file consistently treats 'filter' as a de-word ('Geef de filter een herkenbare naam', line 25), so the relative pronoun referri
- [low] c/blogs/hoe-geavanceerde-voorraadsystemen-het-verschil-maken.md:line 40 — Missing space/typo: 'praktijk ervaring' is written as two words but reads as a compound that is normally closed in Dutch ('praktijkervaring'). Same for the surrounding st
- [low] c/blogs/het-belang-van-goed-voorraadbeheer-voor-jouw-webshop.md:line 13 — Grammatically incomplete phrase: 'loop je het risico misgelopen verkoop' is missing words/agreement; it should be 'loop je het risico op misgelopen verkoop' or 'loop je h
- [low] c/blogs/inkomende-leveringen-registreren.md:lines 17, 19 — Inconsistent compounding: 'magazijn werk' and 'binnen komt' are written open where the closed compound is standard Dutch ('magazijnwerk', 'binnenkomt'). Note line 17 alre
- [low] c/blogs/locatiebeheer.md:line 27 — Stray space before closing strong tag leaves a trailing space inside the bold label, and 'Voorraad waarde' should be a closed compound 'Voorraadwaarde'.
- [low] c/blogs/sendy-koppelen-aan-shoplinkr.md:9 — Spatiefout: 'verzend workflow' is incorrectly split. The Dutch compound should be one word.
- [low] c/blogs/voorraadmanagement.md:8 — Spatiefout: 'voorraadbeheer systeem' is incorrectly split. The Dutch compound should be one word.
- [low] c/blogs/waarom-is-voorraadbeheer-belangrijk-tips-en-voordelen.md:9, 26, 37, 40, 48, 56 — Recurring spatiefout: 'voorraadbeheer systeem' is split into two words five times in this article. The Dutch compound should be one word (voorraadbeheersysteem).
- [low] c/blogs/wat-is-verzenden-via-bol-(vvb)-precies.md:51 — Two spatiefouten in one sentence: 'voorraad beheer' and 'verkoop kanalen' are incorrectly split Dutch compounds.
- [low] c/blogs/voorraadmanagement.md:11, 23, 35 — English-style Title Case applied to Dutch headings (random mid-sentence capitalization of nouns). Dutch uses sentence case; only the first word and proper nouns are capit
- [low] c/blogs/wat-is-verzenden-via-bol-(vvb)-precies.md:11, 14, 17, 20, 23, 38 — English-style Title Case in the list-item labels and section headings throughout (Dutch should use sentence case).
- [low] c/seo/hoe-koppel-ik-innosend-met-bol.md:15 — Grammar/agreement: 'een populaire e-commerceplatform' uses the article 'een' with adjective inflection 'populaire' while 'platform' is a het-word, so it should be 'een po
- [low] c/seo/hoe-koppel-ik-innosend-met-woocommerce.md:11 — Het/de agreement slip: 'platform' is a het-word, so 'een populaire e-commerce platform' should read 'een populair e-commerceplatform'. (Also note 'e-commerce platform' is
- [low] c/seo/verkopen-via-bol-com.md:17 — Formal 'uw' used in an H2 heading, breaking the informal je/jij/jouw tone used everywhere else in the article (the very next line uses 'je productaanbod').
- [low] c/seo/verkopen-via-bol-com.md:20, 24 — Numeral '1' used as the word 'één' in running text ('alles in 1 systeem'), twice. Elsewhere in the corpus the spelled-out 'één plek' / 'één centrale plek' is used. Reads 
- [low] c/support/aan-de-slag/voorbereiding/beginnen-met-shoplinkr.md:12, 15 — Ontbrekende komma's rond bijzin maken twee lange zinnen lastig leesbaar (bijzin 'Zodra je ... bent gestart' / 'Zodra je een verkoopkanaal hebt gekoppeld' niet afgesloten 
- [low] c/support/account/toegang-en-beveiliging/wachtwoord-wijzigen.md:43 — Nederlandse samenstelling 'reset link' is los geschreven; correct is aaneen of met koppelteken.
- [low] c/support/account/gebruikers-en-rollen/rollen-en-rechten-beheren.md:17, 48 — Nederlandse samenstelling 'Beheerder rol' is los geschreven (komt 2x voor). Een samenstelling van twee zelfstandige naamwoorden hoort aaneen of met koppelteken, zeker omd
- [low] c/support/integraties/vervoerders/sendy-koppelen.md:54 — Inconsistent article/quoting around the credential name. Step 6 reads 'Je krijgt nu je "Personal access token"' and the verify step reads 'Vul de "Personal access token" 
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/c/support/orderverwerking/bestellingen/bestellingen-samenvoegen.md:96 — Dangling/hanging hyphen compound error. 'product-' uses a weglatingsstreepje implying it elides to 'wijzigingen' (productwijzigingen), but the parallel term 'aantal wijzi
- [low] c/support/voorraadbeheer/inkoop/inkoopadvies.md:12 — 'teveel' is hier bijwoordelijk gebruikt ('te veel op de plank') en moet als twee woorden geschreven worden. Het aaneengeschreven 'teveel' is alleen het zelfstandig naamwo
- [low] c/support/voorraadbeheer/producten/fictieve-voorraad.md:145 — 'het fictieve voorraad aantal' is een onjuist gesplitste samenstelling en de zin is een komma-splitsing (twee hoofdzinnen aan elkaar geplakt met een komma).
- [low] c/support/voorraadbeheer/inkoop/inkoopadvies.md:188 — Reden-label 'Herbevoorrading nodig voor doel aantal dagen' leest stroef; 'voor doel aantal dagen' lijkt op een niet-ingevulde placeholder. Mogelijk een letterlijke UI-str
- [low] c/blogs-en/what-is-an-ean-code.md:19 — Awkward phrasing: a check digit does not itself 'calculate'. The clause attributes the calculation to the number rather than to a verification process.
- [low] c/seo-en/the-importance-of-effective-inventory-management.md:42 — British spelling in EN content; site standard is American English.

### i18n (2)
- [medium] components/pages/FeatureCarriersPage.astro:16 — This SHARED feature page hardcodes the NL `integrations` content collection regardless of locale, instead of using the locale-aware `collectionName('integrations', locale
- [low] i18n/locales/en.ts:global — Key parity and structure verified clean: extracted key skeletons are byte-identical (1751 key lines each, diff empty) and TypeScript types en as Dictionary, so the ~3-lin

### link (15)
- [high] c/seo/hoe-koppel-ik-dpd-met-bol.md:see related files — Broken internal link: points to a blog slug that does not exist. The actual blog file id is 'wat-is-verzenden-via-bol-(vvb)-precies' (with parentheses), and the blog rout
- [high] c/seo/bol-lvb-voorraad-switch.md:38 — Broken internal link. href targets '/blogs/wat-is-verzenden-via-bol-vvb-precies' but the actual blog route is '/blogs/wat-is-verzenden-via-bol-(vvb)-precies' (the file id
- [high] c/seo/dpd-en-bol-samen-gebruiken.md:18 — Broken internal link. href targets '/blogs/wat-is-verzenden-via-bol-vvb-precies' but the real blog route is '/blogs/wat-is-verzenden-via-bol-(vvb)-precies' (file id has l
- [high] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/public/llms.txt:44-45 — llms.txt advertises https://shoplinkr.com/privacy and https://shoplinkr.com/voorwaarden as real pages, but neither route exists. There is no src/pages/privacy*, no src/pa
- [medium] c/seo-en/how-to-connect-myparcel-to-shopify.md:32 — Link anchor text says 'connecting MyParcel to Shopify' but the href points to a 'connect-myparcel-to-shoplinkr' URL. The visible text does not match the link destination,
- [medium] c/seo-en/how-to-connect-qls-to-bol.md:63 — Internal links use root-relative hrefs ('/en/...') while every other internal link across this content set uses absolute 'https://shoplinkr.com/en/...'. Inconsistent link
- [medium] c/seo-en/how-to-connect-qls-to-woocommerce.md:35,38 — Same root-relative href inconsistency as the QLS-to-Bol article: '/en/...' links while the rest of the content set uses absolute shoplinkr.com URLs.
- [low] c/seo/hoe-voorraad-bijhouden-in-excel-tips-en-tricks.md:15 — De anchortekst 'Excel's flexibiliteit' linkt naar /voorraadbeheer-excel-template, een download/template-pagina die niet over 'flexibiliteit' gaat. De link is niet kapot, 
- [low] c/support/aan-de-slag/voorbereiding/plan-een-demo-in.md:16 — Externe link opent in een nieuw tabblad (target="_blank") maar mist rel="noopener noreferrer". Inconsistent met een-abonnement-starten.md, dat de rel wel zet, en het is e
- [low] c/support/account/facturatie-en-prijzen/alles-wat-je-moet-weten-over-het-abonnement.md:16 — Externe link opent in nieuw tabblad (target="_blank") zonder rel="noopener noreferrer". Inconsistent met de rel die elders in deze contentset wel gezet wordt.
- [low] c/support/rapportages-en-inzicht/rapporten/rapporten-overzicht.md:24 — In het rapporten-overzicht verwijst het kopje 'ABC-analyse' naar /support/abc-analyse. Dat is het algemene productartikel (voorraadbeheer/producten/abc-analyse.md), niet 
- [low] c/seo-en/how-to-connect-postnl-to-bol.md:46 — Anchor text/destination mismatch: a link about a 'stable internet connection' / connecting PostNL and Bol points to an integrations URL for connecting WooCommerce to Bol.
- [low] c/seo-en/how-to-connect-postnl-to-shopify.md:40 — Anchor text/destination mismatch: a link about 'product data is transferred correctly' between systems points to an integrations page for connecting WooCommerce to Shopif
- [low] c/support-en/account/billing-and-pricing/subscription-information.md:17 — An English support page sends users to the Dutch-locale Featurebase board (path ends in /nl). On an EN page this is a locale mismatch; English-speaking customers land on 
- [tip] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/data/externalLinks.ts:5-6 — All five external URLs return HTTP 200 (register, demoBooking, login, termsPdf, privacyPdf). No broken links. The terms/privacy PDF filenames hard-code the year ('2026');

### other (1)
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/c/support/orderverwerking/picklijsten/wat-zijn-picklijsten.md:53 — Unclear non-standard jargon. 'plust het handmatig' uses 'plussen' as a verb (to bump via the plus button); this is colloquial product-UI slang, is not standard Dutch, and

### seo-content (18)
- [high] components/pages/SeoArticlePage.astro + src/c/seo/*.md (all ~62 NL + ~62 EN articles):SeoArticlePage.astro (no related-links slot); [slug].astro:1-40 — Every SEO content article in src/content/seo and src/content/seo-en is an ORPHAN page. The seoPages/seoPagesEn collections are consumed only by src/pages/[slug].astro and
- [high] c/seo/dpd-en-bol-samen-gebruiken.md vs src/content/seo/hoe-koppel-ik-dpd-met-bol.md (and the full carrier x channel matrix):na — The carrier matrix is built twice with near-duplicate intent: a 'hoe-koppel-ik-<carrier>-met-<channel>' set AND a '<carrier>-en-<channel>-samen-gebruiken' set, for ~7 car
- [medium] c/blogs/woocommerce-koppelen-aan-shoplinkr.md:3 (compare shopify-koppelen-aan-shoplinkr.md line 3) — Duplicate excerpt/meta description. The WooCommerce excerpt is byte-identical to the Shopify article's excerpt except for the integration name, producing duplicate meta d
- [medium] c/seo-en/using-dpd-and-shopify-together.md:3 (frontmatter excerpt) — The excerpt is rendered as the page meta description (SeoArticlePage/BlogArticlePage description={...}). At 281 characters it far exceeds the ~155-160 char SERP limit and
- [medium] c/seo-en/using-myparcel-and-shopify-together.md:3 (frontmatter excerpt) — Excerpt used as meta description is 209 characters, over the ~155-160 char SERP limit and will be truncated.
- [medium] pages/voorraadbeheer-software.astro, voorraadbeheer-systeem.astro, voorraadbeheer.astro, voorraadbeheer-webshop.astro, simpel-voorraadbeheer.astro (+ EN twins):na — Five near-identical NL landing pages (and six EN: inventory-management-software, inventory-management-system, inventory-management, webshop-inventory-management, simple-i
- [medium] pages/[slug].astro:54-56 (and en/[slug].astro):[slug].astro:55 — Content-freshness signal is broken: the Article JSON-LD sets dateModified equal to datePublished for every SEO page, and the seoPages/blogs schema has no updatedAt/dateMo
- [medium] c/seo/*.md (57 of ~62 NL files) and src/content/seo-en/*.md:[slug].astro:60-78 — 57 of ~62 NL SEO articles contain Q&A-style sections (H2 'Veelgestelde vragen over...' + H3 questions like 'Hoe lang duurt het koppelingsproces?', 'Wat als de koppeling m
- [medium] c/seo/hoe-koppel-ik-*.md and *-samen-gebruiken.md (titles / H1):na — Inconsistent brand/product casing across the carrier-matrix titles, which are also the rendered H1s. The same products appear capitalized on some pages and lowercase on o
- [medium] c/seo/*.md (excerpt field, doubles as meta description):na — Many SEO articles have meta descriptions outside the optimal 120-160 char range. The frontmatter `excerpt` is passed straight to <meta name="description"> (via SeoArticle
- [low] c/seo/hoe-koppel-ik-dpd-met-woocommerce.md:10 and 12 — Two section sub-introductions are wrapped in <p> instead of heading tags, unlike every other article in the set where 'Een korte introductie tot <brand>' is an <h3>. This
- [low] c/seo-en/what-is-a-backorder.md:L3 — Excerpt / meta description is very thin (about 47 characters): a single fragment that gives a search snippet almost no information or keywords. Below the useful 120-160 c
- [low] c/seo-en/using-sendy-and-woocommerce-together.md:L3 — Excerpt / meta description is generic and thin (about 65 characters): it only restates the title with no value proposition or keywords for the search snippet.
- [low] c/seo/*.md frontmatter (publishedAt only) + image alt:ArticleLayout.astro:82 — SEO/blog content images have no descriptive alt text. The seoPages schema has an optional `imageAlt` but none of the SEO markdown files set it, so ArticleLayout renders a
- [tip] components/pages/InventorySoftwarePage.astro and the inventory landing cluster (H1 vs <title>):InventorySoftwarePage.astro:33-36 — On the inventory landing pages the <title> and H1 are essentially the same keyword string with no differentiation, and the H1 doesn't add long-tail variation. e.g. title 
- [tip] c/seo (internal links inside articles):na — Internal linking inside the SEO articles is uneven and skewed toward blogs, while related SEO landing pages get few or no inbound contextual links. The Excel cluster cros
- [tip] c/seo (thin pages needing depth):na — A cluster of SEO pages is genuinely thin (36-49 lines of mostly generic prose) and will struggle to rank or be seen as helpful-content. The shortest are the carrier-combi
- [tip] pages/[slug].astro:50 Article schema (author/publisher) :[slug].astro:50 — The Article JSON-LD on SEO pages uses Organization as author for every article and never references an article hub. Combined with the orphan-page issue, this gives weak E

### seo-technical (20)
- [high] c/seo/hoe-koppel-ik-innosend-met-woocommerce.md:8 — In-body <h1> creates a second H1 on the rendered page. ArticleLayout.astro already renders the frontmatter title as the page <h1> (line 63), so this body <h1> produces a 
- [high] c/seo/hoe-koppel-ik-myparcel-met-bol.md:8 — In-body <h1> creates a second H1 on the rendered page (the layout already renders the frontmatter title as <h1>), producing a duplicate top-level heading and near-duplica
- [high] c/seo/hoe-koppel-ik-myparcel-met-shopify.md:8 — In-body <h1> creates a second H1 on the rendered page (the layout already renders the frontmatter title as <h1>), producing a duplicate top-level heading.
- [high] c/seo/hoe-koppel-ik-myparcel-met-woocommerce.md:8 — In-body <h1> creates a second H1 on the rendered page (the layout already renders the frontmatter title as <h1>), producing a duplicate top-level heading.
- [high] c/seo/hoe-koppel-ik-postnl-met-bol.md:8 — In-body <h1> creates a second H1 on the rendered page (the layout already renders the frontmatter title as <h1>), producing a duplicate top-level heading.
- [high] c/seo/hoe-koppel-ik-postnl-met-shopify.md:8 — In-body <h1> creates a second H1 on the rendered page (the layout already renders the frontmatter title as <h1>), producing a duplicate top-level heading.
- [high] c/seo/hoe-koppel-ik-postnl-met-woocommerce.md:8 — In-body <h1> creates a second H1 on the rendered page (the layout already renders the frontmatter title as <h1>), producing a duplicate top-level heading.
- [high] c/seo/hoe-koppel-ik-qls-met-bol.md:8 — In-body <h1> creates a second H1 on the rendered page (the layout already renders the frontmatter title as <h1>), producing a duplicate top-level heading.
- [high] c/seo/hoe-koppel-ik-qls-met-shopify.md:8 — In-body <h1> creates a second H1 on the rendered page (the layout already renders the frontmatter title as <h1>), producing a duplicate top-level heading.
- [high] c/seo/hoe-koppel-ik-qls-met-woocommerce.md:8 — In-body <h1> creates a second H1 on the rendered page (the layout already renders the frontmatter title as <h1>), producing a duplicate top-level heading.
- [high] global (12 of 15 files: all except the 3 Sendcloud files):9 — The blog layout (ArticleLayout.astro line 63) already renders blog.data.title as the page <h1>. These body files ALSO open with an inline <h1>, producing TWO <h1> element
- [medium] components/seo/BaseHead.astro:60 — og:type is hardcoded to 'website' for every page, including blog posts ([slug]/blogs), SEO articles and support articles. Article-type pages should emit og:type='article'
- [medium] i18n/locales/nl.ts + en.ts (feature & landing page meta descriptions):featureLocations 1250 / featurePicklists 1390 / featureReports / featureReturns / featureRules / featureUsers / featureInventory / featurePurchasing / bolInventory / inventorySoftware / wooInventorySync — A large cluster of meta descriptions exceeds the ~155-160 char SERP limit and will be truncated. Worst offenders (NL): featureLocations 209, featurePicklists 197, feature
- [low] i18n/locales/nl.ts + en.ts (short meta descriptions):cookies / blogIndex / supportIndex — Several descriptions are well under the ~150-char target, wasting SERP real estate. EN cookies = 62 chars ('Which cookies we use, why we use them and how you manage them.
- [low] pages/404.astro + src/pages/en/404.astro (via src/components/seo/BaseHead.astro):404.astro:4 — The 404 page is prerendered and reachable at /404 and /en/404 but emits no <meta name="robots" content="noindex"> and BaseHead has no mechanism to set one. It is excluded
- [low] pages/prijzen.astro + en/pricing.astro (Product JSON-LD in PricingPage.astro):PricingPage.astro:37-56 — The pricing page emits a Product schema with an Offer that has priceCurrency and a UnitPriceSpecification but no price/lowPrice value. An Offer with no price is incomplet
- [tip] components/seo/BaseHead.astro:72-75 — Twitter card tags are present (card, title, description, image) but there is no twitter:site / twitter:creator handle. Minor: with a handle, X attributes the card to the 
- [tip] astro.config.mjs (sitemap serialize):48-76 — Sitemap priority/changefreq tiers are sensible: home 1.0/weekly, features/integrations/pricing 0.9/weekly, blogs/support 0.7/monthly, cookies 0.3/yearly, everything else 
- [tip] components/pages/IntegrationDetailPage.astro / integraties/[slug].astro:integraties/[slug].astro:28-33 — Integration detail pages use a generic '@type': 'WebPage' for their primary schema rather than a more specific type. Given they describe connecting an external app to Sho
- [tip] layouts/PageLayout.astro / FaqPage.astro and other PageLayout consumers:FaqPage.astro:21-37 — FAQPage JSON-LD is correctly present on the FAQ page and the pricing page, and the FAQ accordions are visible in the DOM, so structured data matches visible content (good

### spacing (9)
- [medium] components/pages/NotFoundPage.astro:37 — Full content section uses py-20 md:py-32 instead of the canonical py-24 md:py-32. This is inconsistent with the second section in the same file (line 70) which correctly 
- [medium] components/pages/FeaturesIndexPage.astro:169 — Section-header eyebrow uses mb-5 in a pillar section header (lg:col-span-5 text column directly preceding the section <h2>). The spacing canon for a section-header eyebro
- [low] components/pages/BlogIndexPage.astro:67 — The featured-article block is a text+visual 2-col split (image in lg:col-span-7, text in lg:col-span-5) but uses gap-8 lg:gap-12 as its gutter. The canon for a 2-col text
- [low] components/pages/ContactPage.astro:134, 157, 192, 101 — Card padding uses the off-tier value p-7 md:p-8. The card padding canon defines three tiers only: compact/list p-5 md:p-6, standard p-6 md:p-7, large/hero p-8 md:p-10. p-
- [low] components/pages/TeamPage.astro:323 — Card uses off-tier padding p-8 md:p-12. The largest defined card tier is p-8 md:p-10. The md:p-12 step is not on the canonical scale. Same off-tier value appears in Integ
- [low] components/pages/TeamPage.astro:301 — Card uses off-tier padding p-6 md:p-8 (between the standard p-6 md:p-7 and large p-8 md:p-10 tiers). Same off-tier value appears in Features.astro:189 (the dark feature c
- [low] components/pages/TeamPage.astro:345 — The demo CTA section header uses eyebrow mb-3 and intro mt-3 (instead of the section-header canon mb-4 / mt-6). It is a horizontal card-style CTA (eyebrow + h2 + body in 
- [low] components/sections/CtaBanner.astro:17, 22 — The centered CTA header block uses eyebrow mb-5 and intro mt-7 rather than the section-header canon mb-4 / mt-6. NotFoundPage.astro:40,45 mirrors the exact same mb-5 / mt
- [low] components/pages/ContactPage.astro:92 — The under-hero channel-cards row uses pt-4 pb-12 md:pb-16. The canon for an under-hero intro row is pb-only (pb-12 md:pb-16). The extra pt-4 adds asymmetric top padding d

### typo (4)
- [low] c/support/rapportages-en-inzicht/rapporten/nooit-verkochte-producten.md:60 — Dubbel woord 'als als'. De correlatieve constructie loopt niet: 'zowel als individueel product als als onderdeel' bevat een herhaald 'als'.
- [low] c/support/voorraadbeheer/locaties/tips-voor-locatienummers.md:12 — Dubbel woord 'het het'.
- [low] c/support/voorraadbeheer/producten/een-bundel-aanmaken.md:154 — Onjuist gesplitste samenstelling 'bundel voorraad' (moet aaneen). Elders in hetzelfde artikel wordt correct 'voorraad van de bundel' gebruikt; de losse vorm 'bundel voorr
- [low] /Users/jobjenniskens/PhpstormProjects/ShopLinkr/code/ShopLinkr-Website/c/support/voorraadbeheer/producten/producten-overzicht.md:73 — Open compound 'Bulk acties' should be one word in Dutch ('Bulkacties'). The rest of the doc uses closed compounds (productoverzicht, productenpagina, verpakkingstype).
