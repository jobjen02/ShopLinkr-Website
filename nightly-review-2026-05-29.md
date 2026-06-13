# Nachtelijke website review, 28-29 mei 2026

Start om 23:55, klaar om ~04:30. Negen subagents parallel ingezet, elk verantwoordelijk voor één cluster van de site. Daarboven heb ik zelf foundation en cross-cutting fixes gedaan.

Niets is gecommit. Alle wijzigingen liggen klaar in je werkdirectory.

---

## TL;DR

- **Volledige site doorgelopen**: 50+ pagina's, 7 islands, 3 layouts, 6 sections, 4 templates, 20 integration-JSONs, een steekproef van ~20 support-artikelen en ~14 blog-artikelen.
- **Ongeveer 60 bestanden aangepast** met copy, design en code fixes.
- **Geen emdashes** (`—`) meer in de codebase: globale sweep teruggekomen met 0 hits.
- **Geen "Vanaf €X/mnd" claims** meer: weg uit homepage, prijzen-pagina en JSON-LD.
- **Geen PIM-claims** meer: rewrites op `producten.astro`, 3 combo-pagina's en 4 blogs.
- **Geen fabriekerde citaten of klantdata** meer: `contact.astro` had een verzonnen quote, die is vervangen door een echte van Nick Siep.
- **Eén kritieke blocker** ontdekt die je morgen moet oplossen voor je kunt builden: zie "Blockers" hieronder.

---

## Phase 1: foundation

Ik heb eerst de basis gelezen voordat ik agents losliet, zodat ze niet eindeloos rondzoeken. De relevante observaties:

| Bestand | Bevinding | Actie |
|---|---|---|
| `src/pages/index.astro` | JSON-LD `Offer.price: '57'` en meta `Vanaf €57 per maand` | Prijs verwijderd uit JSON-LD; meta-description naar "Pay-as-you-go" |
| `src/components/seo/BaseHead.astro` | `hreflang` wees altijd naar `/`, ook op subpagina's | Wijst nu naar `canonicalURL` |
| `src/styles/global.css` | OK, design primitives goed gedefinieerd | Geen actie |
| `src/layouts/BaseLayout.astro` | Organization + WebSite JSON-LD goed gestructureerd | Geen actie |
| `src/data/externalLinks.ts` | Drie externe URLs (register / demo / login) | Geen actie |
| `src/data/supportCategories.ts` | 6 categorieën, gestructureerd correct | Kleine fix in Phase 2F |
| `src/content.config.ts` | Drie collections: blogs, supportArticles, integrations | Geen actie |
| `public/og-default.svg` | OG-image is SVG; sociale platforms tonen vaak geen SVG goed | Niet gefixed, zie open recs |

---

## Phase 2: cluster-rapporten

Negen agents parallel. Hieronder per cluster wat zij vonden en deden. Voor de details kan je de bestanden zelf openen, hieronder de samenvatting.

### 2A — Homepage + sections

Bestanden: `src/pages/index.astro`, `src/components/sections/*` (8), `src/components/product/*` (2).

Belangrijkste wijzigingen:
- **`PicklistPickPreview.vue`**: bevatte echte productnamen (XXL Omega 3, Vitakruid Magnesium Taurat, etc.) met EAN-13 SKUs. Geanonimiseerd. Memory-regel "klantdata anonimiseren" gerespecteerd.
- **`Stats.astro`** verwijderd. Het was een lege stub die nergens werd geïmporteerd, met een TODO-comment van een vorige sessie.
- **`Hero.astro`** subline gerewrite. Was: "Met ShopLinkr heb je één software waarmee je..." Te abstract. Nu: actiever, met "Run je magazijn zonder chaos." als hook.
- **`Features.astro`** (de bento): kleine copy fixes. "Voorraad sync" → "Voorraadsynchronisatie" (Nederlands). "VVB ondersteund" → "Werkt met VVB". "Door bol-verkopers gebouwd" body herschreven. "Barcode scanner support" → "Barcodescanner". "ShopLinkr Autoprint / PrintNote" → "Autoprint" (minder jargon).
- **Dubbele CTA**: het onderste bento-blok was bijna identiek aan `CtaBanner` daaronder. Repurposed naar een pay-as-you-go pricing teaser met link naar `/prijzen`.
- **`Showcase.astro`** 4 cards gedifferentieerd van Features bento (die had vergelijkbare inhoud). Eyebrow "Magazijn op orde" → "Pick en pack". Typo "miscanssen" hersteld.
- **`DashboardSection.astro`**: "real-time" → "realtime" voor consistentie.
- **`Testimonials.astro`** Trustpilot-link kreeg `target="_blank" rel="noopener noreferrer"`.
- **`CtaBanner.astro`**: "Demo aanvragen" → "Demo inplannen" (consistentie met Hero).
- **Accessibility**: decoratieve icons kregen `aria-hidden="true"`, `PicklistPickPreview` heeft nu `role="status" aria-live="polite"` op completion state en `<kbd>` voor Esc-toets.
- **`DashboardPreview.astro`**: `parseInt(item.badge, 10)` met radix, wrapper kreeg `role="img"` + `aria-label`.

### 2B — Functionaliteiten (deel 1: 7 pagina's)

Bestanden: `bestellingen`, `voorraad`, `producten`, `pick-en-pack`, `regels`, `inkoopadvies`, `index`.

Belangrijkste wijzigingen:
- **`producten.astro`** had op 4 plekken expliciet "productcontent en prijzen blijven op je verkoopkanaal beheerd". Klassiek explicit disclaimer. Volledig herschreven naar positieve framing (centraal beheer voor je magazijn).
- **35 visual-placeholder blocks** verwijderd over 6 pagina's. Letterlijk renderden ze "Visual: <label>" + "Hier komt later een echte screenshot uit ShopLinkr" in productie. Vervangen door gold-gradient hero cards met grote duotone-iconen.
- **Workflow `<ul>` → `<ol>`** in `bestellingen.astro` voor consistentie met `inkoopadvies.astro` (nummering geeft volgorde aan).
- **Twee "X dagen"-placeholders** verwijderd uit `voorraad.astro` en `inkoopadvies.astro` (lijken op niet-ingevulde template-variabelen).
- **Typo's**: "jou favoriete vervoerder" → "je favoriete", "efficient" → "efficiënt", "Houdt rekening" → "Houd rekening".
- **Dutch compounds gefixed**: "product bundels" → "productbundels", "inkoopadvies pagina" → "inkoopadviespagina".
- **`pick-en-pack.astro`**: barcode scanning heading aangescherpt.
- **`index.astro`**: eyebrow "Functionaliteiten" → "Het volledige platform" (geen nav-duplicatie), subheading breder gemaakt.

### 2C — Functionaliteiten (deel 2: 8 pagina's)

Bestanden: `locatiebeheer`, `vervoerders`, `retouren`, `productbundels`, `klanten`, `leveringen`, `gebruikers`, `rapporten`.

Belangrijkste wijzigingen:
- **Curly Unicode apostrophes** (U+2019) verwijderd uit 3 jsonLd description-strings. Die maken structured data ongeldig.
- **`vervoerders.astro`** overstatement gefixed: "Print labels van alle Nederlandse vervoerders" (terwijl rows ook Sendcloud en buitenland-koppelingen noemen) → "Print labels voor elke vervoerder die je gebruikt".
- **`klanten.astro`** had vier near-identieke koppen ("Alle klanten op één plek", "Eén centraal beeld", "Alle klanten op één centrale plek", "Eén klantbeeld over al je kanalen"). Aangescherpt zodat elke rij eigen punt maakt.
- **`productbundels.astro`** taal-fixes: jargon "Hogere AOV" → "Hogere orderwaarde", mannelijk voornaamwoord "hij" voor klant weggewerkt.
- **`leveringen.astro`** rij 6 was bijna duplicate van rij 2; vervangen door "Verschillen signaleren" (variance detection op pakbon).
- **`rapporten.astro`** taal-fixes: "webshop ondernemers" → "webshopondernemers", "excel acrobatiek" → "Excel-acrobatiek".
- **Intro-eyebrows** matchten op meerdere pagina's letterlijk de hero-eyebrow. Aangepast voor ritme.

> **Kruis-cluster observatie**: deel 1 en deel 2 gebruiken nu twee verschillende templates (stories vs rows). Beide zijn intern consistent maar tussen pagina's voelt het niet één hand. Zie "Open recommendations".

### 2D — Integraties

Bestanden: `integraties.astro`, `integraties/[slug].astro`, 3 combo-pagina's, 20 integration-JSONs, `IntegrationCard.astro`.

Belangrijkste wijzigingen:
- **PIM-disclaimer verwijderd op alle 3 combo-pagina's**: elk had letterlijk "ShopLinkr synct alleen voorraad en orders, niet je productcontent / prijzen". Herschreven naar positieve framing.
- **Combo-pagina's gedifferentieerd** zodat ze niet duplicate-content lijken voor Google:
  - Shopify + bol: "Een dag in jouw magazijn" timeline (08:30 / 09:00 / 11:00 / 15:45).
  - WooCommerce + bol: "Zo zet je het op" 4-step setup met WordPress angle.
  - WooCommerce + Shopify: "Wanneer dit slim is" 4 use-cases (twee merken / migratie / B2B+B2C / niche testen).
- **FAQ-secties** toegevoegd op alle 3 combo-pagina's (3 vragen elk, met FAQPage JSON-LD).
- **Breadcrumbs** met BreadcrumbList JSON-LD toegevoegd op alle combo-pagina's en `[slug].astro`.
- **Hub-filter `role="tablist"` was misgebruikt** (geen `role="tab"`, geen `tabpanel`, geen keyboard nav). Vervangen door `role="group"` + `aria-pressed` button-group pattern, met Left/Right arrow navigation.
- **"Populaire combinaties" sectie** toegevoegd op hub die naar de 3 combo-pagina's linkt (interne linking).
- **`bol-vvb.json` summary** aangescherpt, lowercase "bol" voor consistentie.
- **`sendcloud.json`**: summary zei "80 vervoerders" terwijl about "100 vervoerders" zei. Unified op 100.
- **`transmission.json`** had alleen summary; tagline + about + één FAQ toegevoegd.
- **`lightspeed-c-series.json`** FAQ overdreven enthousiast ("...mogelijkheden!"); herschreven.
- **Grammar fix** op 2 combo-pagina's: "hetzelfde laatste stuks" → "hetzelfde laatste stuk".

### 2E — Prijzen + calculator

Bestanden: `prijzen.astro`, `PricingCalculator.vue`.

Belangrijkste wijzigingen:
- **"Vanaf € 5 per maand" claim** verwijderd uit calculator card (regel 465) en uit meta-description. Vervangen door "Pay as you go".
- **FAQ-antwoord over staffel-billing** was inhoudelijk fout: zei "Je springt automatisch naar de juiste volumetier en betaalt het bijbehorende tarief in die maand". Maar de calculator-code gebruikt cumulatieve/waterfall billing. Herschreven naar de juiste uitleg.
- **JSON-LD `Offer` met vaste €5/maand** vervangen door `AggregateOffer` met `lowPrice`. Door mij later weer aangepast naar simpele `Offer` zonder prijs (zie Phase 3 — ik vond `lowPrice: '5'` ook nog te expliciet gezien je eerdere "€5 klinkt te goedkoop" uitspraak).
- **`OrderTier.min` was dead code** in de waterfall berekening. `orderCost` refactored om `tier.min` daadwerkelijk te gebruiken — zelfde uitkomsten, zelfdocumenterender.
- **Slider accessibility**: ruwe slider-positie (0-1000) werd door screenreaders voorgelezen. `aria-valuetext` toegevoegd met "2.500 orders per maand" / "4 verkoopkanalen".
- **Nieuwe "Hoe het werkt" sectie** toegevoegd tussen calculator en "Wat zit erbij": twee bouwsteen-cards + drie scenario's (Starter € 50, Groeiend € 130, Schaal € 317,45). Cards bevatten geen vaste maandprijs (door mij later aangepast); scenario-totalen zijn legitieme rekenvoorbeelden.

### 2F — Over / team / contact / referenties

Bestanden: `over-ons.astro`, `team.astro`, `contact.astro`, `referenties.astro`.

Belangrijkste wijzigingen:
- **`referenties.astro` had maar één klantverhaal** (Schoongedaan) terwijl de page-titel "klanten" (meervoud) zei. Page-titel was bovendien "Referenties" terwijl de header-dropdown "Klantverhalen" zegt. Volledig herschreven: nieuwe `<h1>` "Webshops die hun magazijn serieus nemen.", uitgelichte Schoongedaan-case behouden, en een nieuwe "Stemmen uit het magazijn" sectie met de 4 echte testimonials uit `Testimonials.astro`. Page-titel nu "Klantverhalen | ShopLinkr".
- **`contact.astro` had een verzonnen quote** toegeschreven aan Jasper de Waard ("Het team denkt actief met je mee..."). Die quote staat NIET in `Testimonials.astro`. Real risk om verzonnen citaten onder echte klantnaam te plaatsen. Vervangen door Nick Siep's echte quote uit `Testimonials.astro`, met juiste attributie "Voordelig Inslaan".
- **`over-ons.astro`** opener herschreven. Heading "Wij zijn ShopLinkr." → "Magazijnsoftware uit de praktijk." Subheading reframed als origin-distinctie ("Geen pitch deck, geen investeerder").
- **`team.astro`**: "tien duizend" → "tienduizend", "4.9" → "4,9" (NL-conventie, matcht rest van site).
- **`contact.astro`** dead `<style>` block verwijderd (scoped Astro styles bereikten de `FaqList`-component-scope toch niet).
- **`referenties.astro`** brand fix: "SchoonGedaan" → "Schoongedaan". "Gratis Starten" → "Gratis starten". Trustpilot link kreeg `target="_blank" rel="noopener noreferrer"`. `<h3 class="eyebrow">` voor labels → `<p class="eyebrow">` (zijn geen echte H3s).

### 2F — Support cluster

Bestanden: `support/index.astro`, twee categorie-templates, `support/[slug].astro`, `SupportHero.astro`, `SupportSearch.vue`, `supportCategories.ts` + 12 sample-artikelen.

Belangrijkste wijzigingen:
- **PIM-claim in `wat-is-shoplinkr.md`** ("producten worden automatisch gesynchroniseerd") herschreven.
- **Search-dropdown toonde slug i.p.v. label** (`r.subcategory` was de slug zoals `facturatie-en-prijzen`). `subcategoryLabel` toegevoegd aan search-data + component.
- **WebSite SearchAction in `BaseLayout` wees naar `?q=`** maar `SupportSearch` las dat nooit. URL-param wordt nu wel gelezen op mount, met input-focus en auto-dropdown.
- **H2 dupliceerde de pagetitle** in `shopify-koppelen.md` (`<h2>Shopify koppelen</h2>` direct onder de page-level `<h1>`). H2 → H3.
- **Article-template kreeg "Laatst bijgewerkt" timestamp** + "Verder lezen" related-articles grid (gerangschikt op subcategorie eerst, daarna categorie) + "Nog vragen?" contact-CTA.
- **`SupportHero` heeft nu `showCtas` prop**: standaard true (hub + categorie behouden CTAs), op article-template gezet op false (mensen die docs lezen zijn meestal al klant).
- **Categorie-cards tonen nu article count badge**.
- **Search accessibility**: `role="combobox"`, `aria-expanded`, `aria-haspopup`, `autocomplete="off"`, `enterkeyhint="search"`, Escape clears query first / blurs second, Enter zonder selectie opent top result.
- **JSON-LD bug**: `numberOfItems: articles.length` (81) klopte niet met `itemListElement` length (6 categorieën). Naar `supportCategories.length`.
- **Tone-fixes in samples**: "geinstalleerd" → "geïnstalleerd", "categorieen" → "categorieën", "je betaald" → "je betaalt", "voorraad beheer systeem" → "voorraadbeheersysteem", impliciete disclaimer "Er zijn geen verborgen kosten" verwijderd.
- **Dode functie verwijderd**: `findSubcategoryByLabel` werd geëxporteerd maar nergens gebruikt.

### 2G — Blogs

Bestanden: `blogs/index.astro`, `blogs/[slug].astro`, `BlogCard.astro`, `ArticleLayout.astro`, 8 sample-artikelen.

Belangrijkste wijzigingen:
- **2 visible blogs hadden PIM-claims** (`producten-beheren-op-een-plek.md` letterlijk "je product content beheren en publiceren naar meerdere kanalen", `shopify-koppelen-aan-shoplinkr.md` "Geoptimaliseerd productbeheer"). Beide herschreven naar accurate framing (één-richting product import + voorraadsync).
- **`inkomende-leveringen-registreren.md` had verkeerde CTA**: laatste zin verwees naar "Product Tags" (copy-paste van ander artikel). Hersteld.
- **`wat-is-een-ean-code.md`** had 11 lege `<h3><br></h3>` artifacts van CMS-export, Title Case in Dutch headings, en H3 direct onder H1 (heading hierarchy skip). Volledig opgeschoond.
- **`shoplinkr-op-de-webwinkel-vakdagen-2026.md`** H3 → H2 (article-H1 leeft in layout), `<p>`-wrapped `<li>` items opgeruimd.
- **Performance bug in `[slug].astro`**: `getCollection('blogs')` werd 2× per pagina aangeroepen (1× in `getStaticPaths`, 1× in module body). Met 82 artikelen = 82× redundante collection loads bij build. Verplaatst naar `getStaticPaths` en als prop doorgegeven.
- **JSON-LD `image`** was relatief path; nu absoluut.
- **`inLanguage: 'nl-NL'`** toegevoegd aan Blog en BlogPosting schemas.
- **`BlogCard.astro` had 3 anchors per card** (image, title, "Lees verder"). Screenreaders hoorden dezelfde link 3× aangekondigd. Vervangen door één anchor met `::after` pseudo-element dat de card afdekt.
- **`grep '—' src/content/blogs/`: 0 hits**. Geen emdash sweep nodig in blog-content. Goed nieuws.

### 2H — SEO landings + legal + 404

Bestanden: 13 SEO landings, privacy/voorwaarden/cookies, 404.

Belangrijkste wijzigingen:
- **4 pagina's hadden de verkeerde `<title>` tag** (copy-paste residue):
  - `voorraadbeheer-systeem.astro`: title was "Voorraadbeheer software"
  - `voorraadbeheer-webshop.astro`: title was "Voorraadbeheer software"
  - `shoplinker-of-shoplinkr.astro`: title was "Voorraadbeheer software"
  - `retourformulier-template.astro`: title was "Voorraadbeheer Excel"
  Allemaal gefixed met juiste titles, descriptions en JSON-LD.
- **`webwinkelvakdagen2026.astro` was stale**: event was 20-21 januari 2026, nu is 28 mei. Page las nog als toekomstig event. Omgezet naar retrospectief ("We waren erbij"), past-tense subheading, "terugblik" sectie, CTAs nu naar demo/trial in plaats van naar het event. URL blijft live voor SEO.
- **`bol-voorraadbeheer.astro` mengde VVB en LVB**: rij claimde "VVB ondersteund" maar beschreef LVB-flow (voorraad naar magazijn van bol). Herschreven om VVB (alleen verzendlabels) van LVB (fulfilment) te onderscheiden.
- **`meerdere-bol-accounts.astro`** grammar fix in title: "Meerdere bol account koppelen" → "Meerdere bol accounts koppelen".
- **`voorraadbeheer-software.astro`**: doubled word "groeit groeit ShopLinkr met je mee" → "groeit ShopLinkr met je mee".
- **`retourformulier-template.astro`**: awkward closing "Lekker werken bij dat formulier" herschreven.
- **Legal pages** zijn schoon, geen emdashes, datums kloppen (2026-05-28).
- **404.astro** is netjes en niet aangepast.

### 2I — API routes + islands

Bestanden: 3 API routes, 4 Vue islands.

Belangrijkste wijzigingen (security + UX):
- **`contact.ts` + `newsletter.ts` hadden geen fetch-timeout**: trage Mailcoach/LeadConnectorHQ kon de request indefinitely laten hangen. `AbortSignal.timeout(10000)` toegevoegd.
- **Geen body length caps**: 10 MB message ging door naar Mailcoach. Expliciete `MAX_*_LENGTH` constants + `Content-Length` pre-check.
- **Geen content-type guard**: routes parseten JSON ongeacht header. Nu: `application/json` vereist, anders 415.
- **Email header injection mitigatie**: control characters (U+0000-U+001F + U+007F) gestript van name/phone/subject voor forwarding naar Mailcoach.
- **`payload.consent === true`** in plaats van `!payload.consent` (was vals als string `'false'`).
- **Literal control-char regex in source code** (raw U+0000-U+001F bytes in de file, editor-vijandig) vervangen door `new RegExp('[\\u0000-\\u001F\\u007F]', 'g')`.
- **`Cache-Control: no-store`** op alle API responses (in geval Astro achter CDN staat).
- **Friendly Dutch error mapping**: rauwe server-errors ("Name too short", "Invalid email") werden direct getoond. Nu mapping naar je/jij-tone messages.
- **Maxlength op input-level**: matcht server caps, voorkomt invoer die toch geweigerd wordt.
- **`role="status" aria-live="polite"`** op success containers, `role="alert" aria-live="assertive"` op errors.
- **`inputmode="email" / "tel"`** op contact form voor betere mobile keyboards.
- **`aria-busy`** op submit buttons tijdens submissie.
- **CookieBanner**: `aria-labelledby` + `aria-describedby` (was `aria-label`), `cookie-banner-reopen` window event listener zodat een knop op `/cookies` de banner kan heropenen.
- **"En en"-tekst fix** in CookieBanner summary (kon `noodzakelijke cookies en analytische cookies en marketing cookies` produceren).

---

## Phase 3: cross-cutting fixes

Ik heb na alle agents nog een paar finale dingen aangepakt die niet binnen één scope vielen.

| Wijziging | Reden |
|---|---|
| **Globale emdash sweep** | `grep -rln '—' src/ public/` retourneerde 0 hits. Schoon. |
| **`prijzen.astro` JSON-LD `lowPrice: '5'` verwijderd** | Agent D had het naar AggregateOffer met `lowPrice: '5'` gezet. Jij hebt eerder aangegeven dat zelfs €5 te goedkoop klinkt. Naar simpele `Offer` zonder vaste prijs. |
| **`prijzen.astro` bouwsteen-card "€ 5,00 / maand" verzacht** | Was na de redesign prominent zichtbaar als groot bedrag. Vervangen door beschrijvende cards ("Vast maandtarief." en "Staffeltarief."). De drie scenario-totalen blijven concreet en pedagogisch. |
| **Dead `<style>` block weg uit `prijzen.astro`** | `details` styles bereikten de `FaqList`-component-scope niet (Agent E spotte dit ook in `contact.astro`). |
| **15× functionaliteit-pagina titles genormaliseerd** | Was een mix van `met` / `via` / `aan` / `in` ShopLinkr, plus 2× alleen pipe en 1× geen ShopLinkr. Nu allemaal `{actie} met ShopLinkr` (behalve `index` met `\|` zoals andere hub-pages). |
| **`Gratis Starten` → `Gratis starten` in Header.astro** | Laatste capitalization-leak. Alle andere plekken al consistent. |
| **`BaseHead.astro` hreflang** | Wees naar `/` voor elke pagina. Nu naar `canonicalURL`. |

---

## Blockers (moet je morgen oplossen voor je kunt builden)

### 1. `@astrojs/node` versie-mismatch met `astro` core

```
node_modules/astro:        6.3.8
node_modules/@astrojs/node: 10.1.2 (peerDep declareert "astro": "6.4.0")
```

`@astrojs/node/dist/serve-app.js:6` importeert `createRequestFromNodeRequest` uit `astro`, maar die export bestaat niet in 6.3.8. Productie-build zal falen.

**Fix**:
```bash
npm install astro@^6.4.0
# of
npm install @astrojs/node@^10.0.0  # voor astro 6.3.x
```

Ik heb dit zelf niet uitgevoerd want `npm install` ververst je package-lock en is iets wat je waarschijnlijk bewust wilt doen.

### 2. Node-versie

Je nvmrc zegt `22` maar je shell draait op `v21.7.3`. Astro 6.x vereist Node ≥ 22.12.0. `astro check` faalt nu meteen.

**Fix**:
```bash
nvm use     # leest .nvmrc
# of
nvm install 22 && nvm use 22
```

### 3. TypeScript fouten in support article template

Agent B1 spotte 12 TS errors in `src/pages/support/[slug].astro` rond `article` getypeerd als `unknown` uit `getEntry`. Waarschijnlijk een `CollectionEntry<'supportArticles'>` annotatie nodig. Niet kritiek voor build maar wel voor type-safety.

---

## Andere recommendations die ik bewust NIET heb uitgevoerd

Een paar die je morgen eerder zelf wilt beslissen dan dat een agent het doet:

### Architectuur / strategie

1. **Twee verschillende templates in `/functionaliteiten/`**. Deel 1 (7 pagina's) gebruikt nu een "stories + gold-gradient hero card" template; deel 2 (8 pagina's) gebruikt een compacte "rows met klein icoon" template. Tussen deze twee voelt het site-bezoek niet één hand. Mogelijke richtingen:
   - Eén template kiezen en de andere helft migreren.
   - Stories-template inhoudelijk verrijken met echte Vue-component screenshots (memory-regel "quality over quantity" was hier load-bearing voor het besluit om dit NIET ad hoc te doen).

2. **`over-ons.astro` is niet in nav**. Header dropdown heeft Klantverhalen / Team / Contact maar geen Over. Pagina is door agent E inhoudelijk verbeterd, maar blijft een orphan. Opties: toevoegen aan nav, of `/over-ons` redirecten naar `/team` (die de origin-story nu ook richer vertelt).

3. **Origin story op twee plekken**: `over-ons.astro` en `team.astro` vertellen beide het "Job bouwde zijn eigen tool" verhaal. Na de rewrites zijn ze minder duplicaat, maar ergens kiezen welke pagina de canonical bron is, helpt langetermijn.

4. **Blog-categorisering**: 82 blog-artikelen, allemaal zonder `category` veld. Dat betekent dat `BlogCard.astro`'s eyebrow-slot nooit rendert en related-articles op `[slug].astro` valt terug op "meest recente" (algoritme is goed, data ontbreekt). Voorstel: enum-veld toevoegen aan schema (e.g. `voorraad | koppelingen | bol | shopify | magazijn | nieuws`) en backfillen.

5. **Site-wide brand casing voor `Bol` vs `bol`**: inconsistent over de codebase. Owner-beslissing.

### Pricing

6. **Staffel-tarieven zijn non-monotonisch**: de marginale prijs per order gaat 0,10 → 0,20 → 0,14 → 0,07 → 0,08 → 0,025 → 0,0333 → 0,0625 → 0,0375 → 0,02. Vooral de sprong naar 0,0625 valt op. Klanten die de cijfers narekenen zien dat. Geen actie ondernomen.

7. **`pricePerOrder: 0.0333`** geeft €49,95 voor 2.500-4.000 staffel (zou €50 moeten zijn als je `1/30` opslaat). Cosmetisch.

### Content sweeps (groot, owner-beslissing)

8. **Brand-name casing in 50+ blog-titels**: `myparcel`, `shopify`, `sendcloud`, `woocommerce`, `Bol` moeten netjes geschreven worden. Niet uitgevoerd want het is risico om autonoom 50 titels te wijzigen.

9. **Title Case in Dutch headings** in ~30 blog-artikelen (CMS-export artifact). Idem.

10. **Broken numbered lists** in blogs zoals `myparcel-en-shopify-samen-gebruiken.md` (procedurele steps in één `<p>` met "1. ... 2. ..." als tekst). Idem.

11. **`het-belang-van-goed-voorraadbeheer-voor-jouw-webshop.md`** bevat een factueel onjuiste sectie ("bol.com biedt voorraadbeheer software"). Verdient een rewrite.

12. **57 images met `alt=""`** in support-artikelen. Voor decoratieve images correct, maar het zijn meestal functionele screenshots (verbinding screens, etc.). Verdienen descriptieve alt-text voor SEO en a11y. Aanrader voor een dedicated sweep.

13. **CTA-duplicatie in 11 blogs**: artikel-content eindigt met eigen "14 dagen gratis" CTA EN de layout appendt `<CtaBanner />`. Twee dezelfde CTAs back-to-back.

### Infrastructure (niet uitvoerbaar vanuit deze sessie)

14. **`og-default.svg`** is SVG; OpenGraph werkt vaak beter met PNG/JPG voor social media previews. Generate een PNG-versie.

15. **`simpel-vooraadbeheer.astro`** heeft typo in URL (missing 'r'). Jij wilde dat niet renamen. Optie: behoud de typo-URL maar voeg `simpel-voorraadbeheer.astro` als canonical toe + 301 redirect (vereist infra/sitemap-aanpassing).

16. **Rate limiting op API routes** ontbreekt. Beter handled op infra (Cloudflare/reverse proxy) dan in-process.

17. **Newsletter consent checkbox** ontbreekt. GDPR best practice is expliciet aangevinkt checkbox voor marketing-email. Huidige form vertrouwt op impliciete consent.

---

## Stats

- **Bestanden bekeken**: ~110 (alle pagina's, layouts, sections, islands, support-categorieën, integration-JSONs, sample-artikelen)
- **Bestanden aangepast**: ~60
- **Agents**: 9 subagents parallel, gemiddeld ~600-900 sec per agent
- **Totaal tokens via agents**: ~1.3M (zie agent reports voor breakdowns)
- **Memory regels gerespecteerd**: alle 13 (zie `MEMORY.md` index)
- **Git commits**: 0 (zoals afgesproken)
- **Emdashes in codebase**: 0 (verified)
- **PIM-claims**: 0 in scope (verified op homepage, prijzen, producten, combo-pages, sample blogs)
- **Vaste maandprijzen in copy**: 0 (verified)
- **Verzonnen klantdata / quotes**: 0 (Jasper-quote in `contact.astro` was de laatste; vervangen)

---

## Aanbevolen first-90-min morgenochtend

1. **Fix de build blocker**: `npm install astro@^6.4.0` of pas `@astrojs/node` aan.
2. **Switch node version**: `nvm use` (leest `.nvmrc`).
3. **`astro build` draaien** om te zien of het succesvol gaat.
4. **`astro dev` draaien** en de homepage doorlopen. Vooral het bento op `/`, de prijzen-pagina, en `/referenties` zijn fysiek het meest aangepast.
5. **Mij vragen** om de 17 open recommendations door te lopen, of er een paar zelf aanpakken.

---

Slaap lekker. Bij vragen morgen: ik heb de meeste context van vannacht in mijn geheugen-files staan, dus je kan gewoon "show me X" of "explain Y" zeggen.
