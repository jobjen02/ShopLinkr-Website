export const meta = {
  name: 'shoplinkr-blog-rewrite',
  description: 'Tighten/rewrite the 18 blog pairs that need work: cut filler/repetition, fix flagged issues, real features only, zero fabrication',
  phases: [{ title: 'Rewrite', detail: 'one agent per NL+EN blog pair' }],
};

const TASKS = [
 {
  "nl": "src/content/blogs/bol-com-voorraad-synchronisatie.md",
  "en": "src/content/blogs-en/bol-stock-synchronization.md",
  "nlVerdict": "rewrite",
  "enVerdict": "improve",
  "nlIssues": [
   "generic SEO filler, no concrete ShopLinkr feature described and no CTA/link to product",
   "keyword-stuffed: 'bol voorraad synchronisatie' / 'bol.com voorraad synchronisatie' repeated ~9x",
   "inconsistent brand casing: uses 'bol.com' and 'bol' interchangeably across the body",
   "premise is shaky: framed around running 'meerdere bol winkels', a narrow/unusual case",
   "vague future-of-e-commerce padding ('verwachte groei van de e-commercemarkt') with no substance",
   "repeats the same 'voorkom oververkoop / bespaar tijd / betere klantervaring' points in both list and closing"
  ],
  "enIssues": [
   "Repeats the keyword phrase 'bol stock synchronization' ~9x, reads keyword-stuffed",
   "Generic filler: 'with the e-commerce market expected to grow' has no source and adds nothing",
   "No link to ShopLinkr product/support or CTA, unlike sibling posts",
   "Closing two paragraphs restate the same 'efficiency, cost, customer experience' benefit twice"
  ]
 },
 {
  "nl": "src/content/blogs/myparcel-koppelen-aan-shoplinkr.md",
  "en": "src/content/blogs-en/connect-myparcel-to-shoplinkr.md",
  "nlVerdict": "improve",
  "enVerdict": "improve",
  "nlIssues": [
   "repeats 'naadloze integratie / bespaar kostbare tijd / met een klik verzendlabels' across the intro and all three sections",
   "filler closers 'naar een hoger niveau tilt' and meta phrase 'In deze blogpost ontdek je hoe...'",
   "CTA is vague ('Neem contact met ons op of meld je aan voor een gratis proefperiode') with no register link, unlike the bol/inkomende-leveringen posts"
  ],
  "enIssues": [
   "Repeats 'one click / save time / track & trace automatically' across all three body sections",
   "Filler section 'Simple integration and ease of use' says little beyond 'it's easy'",
   "Closing CTA cliche 'takes your e-commerce activities to the next level' (shared boilerplate across carrier posts)"
  ]
 },
 {
  "nl": "src/content/blogs/qls-koppelen-aan-shoplinkr.md",
  "en": "src/content/blogs-en/connect-qls-to-shoplinkr.md",
  "nlVerdict": "improve",
  "enVerdict": "improve",
  "nlIssues": [
   "repeats 'een klik verzendlabels / bespaar tijd / minimaliseer fouten / verbeterde klantervaring' across intro and sections",
   "filler meta phrasing 'In deze blogpost ontdek je hoe...' and 'naar een hoger niveau tilt'",
   "vague CTA with no register link ('Neem dan nu contact met ons op of meld je aan voor een gratis proefperiode')",
   "near-duplicate structure/wording of the MyParcel post (carrier-post template not differentiated)"
  ],
  "enIssues": [
   "Uses 'bol.com' in body text where standard is 'bol' (twice)",
   "Repeats 'one click / save time / reduce errors' boilerplate shared with MyParcel/Sendcloud/Sendy posts",
   "Closing CTA cliche 'takes your e-commerce activities to the next level'"
  ]
 },
 {
  "nl": "src/content/blogs/sendcloud-koppelen-aan-shoplinkr.md",
  "en": "src/content/blogs-en/connect-sendcloud-to-shoplinkr.md",
  "nlVerdict": "rewrite",
  "enVerdict": "improve",
  "nlIssues": [
   "2023 AI-filler template: 'naadloze integratie', 'naar een hoger niveau tilt'",
   "thin: only 2 real content sections, rest is intro + CTA fluff",
   "soft CTA 'Neem contact met ons op of meld je aan' instead of hard register link",
   "does not match the newer, concrete Shopify post template",
   "no voorraad-sync section while sibling Shopify post has one"
  ],
  "enIssues": [
   "Only two real body sections padded with repetition of 'one click / save time / automatic track & trace'",
   "Intro and conclusion both restate the same time-saving promise",
   "Double CTA cliche: 'takes your e-commerce activities to a higher level' plus 'Simplify your shipping management with ShopLinkr and Sendcloud!'"
  ]
 },
 {
  "nl": "src/content/blogs/sendy-koppelen-aan-shoplinkr.md",
  "en": "src/content/blogs-en/connect-sendy-to-shoplinkr.md",
  "nlVerdict": "rewrite",
  "enVerdict": "improve",
  "nlIssues": [
   "same 2023 filler template ('naadloze integratie', 'naar een hoger niveau tilt')",
   "padding sections: 'Hoe werkt het?' just says 'volg de handleiding', adds nothing",
   "'Flexibiliteit en gemak' makes vague claims about Sendy services/verzekeringen/retourlabels that read as filler",
   "soft contact CTA instead of hard register link",
   "does not match newer Shopify post style"
  ],
  "enIssues": [
   "Uses 'bol.com' in body where standard is 'bol'",
   "Repeats the 'one click / save time / track & trace automatic' benefit across multiple sections",
   "Claims 'insurance and return labels' via Sendy, verify these are actually supported features",
   "Closing CTA cliche 'takes your e-commerce activities to the next level'"
  ]
 },
 {
  "nl": "src/content/blogs/woocommerce-koppelen-aan-shoplinkr.md",
  "en": "src/content/blogs-en/connect-woocommerce-to-shoplinkr.md",
  "nlVerdict": "rewrite",
  "enVerdict": "improve",
  "nlIssues": [
   "same 2023 filler template ('integratie ... fluitje van een cent', 'naar een hoger niveau tilt')",
   "repetitive: 'bespaart tijd en moeite' / 'risico op fouten vermindert' restated across multiple sections",
   "calls it the 'nieuwste'/'nieuwe' integratie (dated 2023, no longer new)",
   "soft contact CTA instead of hard register link",
   "does not match the tighter, concrete Shopify post template"
  ],
  "enIssues": [
   "Each section opens with near-identical 'with a single click / saves time / reduces errors' phrasing",
   "'has never been this easy' / 'never been this easy' style cliche repeated",
   "Closing CTA cliche 'takes your e-commerce activities to the next level'",
   "Mild keyword repetition of 'ShopLinkr's WooCommerce integration'"
  ]
 },
 {
  "nl": "src/content/blogs/dpd-koppelen-aan-shoplinkr.md",
  "en": "src/content/blogs-en/connecting-dpd-to-shoplinkr.md",
  "nlVerdict": "improve",
  "enVerdict": "fine",
  "nlIssues": [
   "five near-identical 'verzenden wordt makkelijker / minder gedoe' sections that say the same thing (Geen gedoe meer, Labels in een handomdraai, Alles-in-een vrijwel identiek)",
   "no closing CTA or trial link, unlike the sibling carrier posts (MyParcel/QLS), so it ends abruptly",
   "slightly hypey filler ('nog nooit zo makkelijk geweest', 'razendsnel')"
  ],
  "enIssues": []
 },
 {
  "nl": "src/content/blogs/hoe-geavanceerde-voorraadsystemen-het-verschil-maken.md",
  "en": "src/content/blogs-en/how-advanced-inventory-systems-make-the-difference.md",
  "nlVerdict": "rewrite",
  "enVerdict": "rewrite",
  "nlIssues": [
   "generic listicle filler ('Wat zijn voorraadsystemen', 'Toekomstige trends', 'Tips voor het kiezen') with almost no ShopLinkr-specific content",
   "unverifiable/hype tech claims: 'AI en machine learning', 'IoT-apparaten zoals RFID-tags' presented as relevant, none of which ShopLinkr does",
   "inconsistent capitalisation in list items (English-style Title Case: 'Verminderen van Overstock en Tekorten', 'Real-time Data-Analyse')",
   "weak vague CTA 'Neem contact met ons op' instead of the standard trial/register link",
   "self-promo paragraph is buried and generic ('Wij houden niet van onnodige functies')"
  ],
  "enIssues": [
   "Generic AI essay about 'inventory systems' in general, barely about ShopLinkr until one paragraph near the end",
   "Vague unsourced claims: AI/ML 'accurate predictions', IoT/RFID, 'future looks promising' filler",
   "Title-case headings ('What Are Inventory Systems?') inconsistent with sentence-case used in product posts",
   "Tips section ('Compare Features and Prices', 'Consider Scalability') is filler that could steer readers to competitors",
   "Thin CTA tacked on at the very end"
  ]
 },
 {
  "nl": "src/content/blogs/hoe-koppel-je-bol-com-met-jouw-webshop.md",
  "en": "src/content/blogs-en/how-to-connect-bol-com-to-your-webshop.md",
  "nlVerdict": "improve",
  "enVerdict": "improve",
  "nlIssues": [
   "English-style Title Case in headings/title: 'Hoe Koppel Je bol.com met Jouw Webshop', 'Belang van Integratie'",
   "abrupt ending: stops after two 'klik hier' link paragraphs with no real conclusion or trial CTA",
   "structure is a bit raw (bold-paragraph pseudo-headings instead of real H2s; mixes voorbereiding stappen with vague consult questions)",
   "minor: GS1/EAN claim 'verplicht vanuit bol' is plausible but worth verifying"
  ],
  "enIssues": [
   "Uses 'bol.com' throughout body where standard is 'bol' (many instances)",
   "Title-case heading inconsistency and bold-pseudo-headings instead of real h2/h3",
   "Reuses the same image and translationKey base as connect-bol-to-shoplinkr (potential overlap/duplication of the bol topic)",
   "Two near-identical 'How do I connect my X store to ShopLinkr? We've written an extensive article...' blocks at the end"
  ]
 },
 {
  "nl": "src/content/blogs/voorraadmanagement.md",
  "en": "src/content/blogs-en/inventory-management.md",
  "nlVerdict": "improve",
  "enVerdict": "improve",
  "nlIssues": [
   "generic SEO content with weak ShopLinkr tie-in",
   "inconsistent Title-Case in list labels ('Cashflow Verbetering','Regelmatige Voorraadcontroles','Gebruik Technologie')",
   "'De toekomst van voorraadmanagement' AI-section is vague filler",
   "no CTA / internal links to product pages",
   "overlaps heavily with voorraadsystemen.md and waarom-is-voorraadbeheer.md"
  ],
  "enIssues": [
   "Generic 'what is / why / best practices / future' essay, only lightly tied to ShopLinkr",
   "Vague future claim: systems 'automatically place orders, predict seasonal demand and even manage returns' presented generically, verify ShopLinkr actually does these",
   "Title-case headings inconsistent with product posts; odd quoted heading '\"Best Practices\"'",
   "No CTA or link to ShopLinkr product/support"
  ]
 },
 {
  "nl": "src/content/blogs/voorraadsystemen.md",
  "en": "src/content/blogs-en/inventory-systems.md",
  "nlVerdict": "improve",
  "enVerdict": "improve",
  "nlIssues": [
   "generic SEO filler, heavy topic overlap with voorraadmanagement.md",
   "inconsistent Title-Case labels ('Periodieke Systemen','Type Producten','Bedrijfsgrootte')",
   "formal/impersonal 'men' ('moet men rekening houden met')",
   "weak excerpt is a bare title-like phrase, not a hook",
   "ShopLinkr only name-dropped, no internal links or real CTA"
  ],
  "enIssues": [
   "Generic AI-filler intro ('In the e-commerce era...') and clichéd conclusion ('no longer a luxury but a necessity')",
   "Title-case headings inconsistent with sentence-case used in newer articles",
   "Empty <br><br> spacers inside list items (lines 23-25, 39-41) are leftover layout cruft",
   "Weak excerpt nearly duplicates the H1",
   "ShopLinkr only mentioned in passing; no real CTA link (just '14 days' text, no register link)"
  ]
 },
 {
  "nl": "src/content/blogs/locatiebeheer.md",
  "en": "src/content/blogs-en/location-management.md",
  "nlVerdict": "improve",
  "enVerdict": "fine",
  "nlIssues": [
   "inconsistent Title Case in inline headings: 'De Handige Functies van Locatiebeheer', 'Altijd Up-to-date', 'Voorraadwaarde inzichtelijk'",
   "missing space after a bold label: 'Voorraadwaarde inzichtelijk:Je kunt...'",
   "uses bold-paragraph pseudo-headings instead of real H2/H3 (weaker structure than sibling feature posts)",
   "no trial/register CTA at the end, just trails off",
   "slightly dated framing ('We lanceren een handige nieuwe functie') for a 2024 post"
  ],
  "enIssues": []
 },
 {
  "nl": "src/content/blogs/product-tags.md",
  "en": "src/content/blogs-en/product-tags.md",
  "nlVerdict": "improve",
  "enVerdict": "improve",
  "nlIssues": [
   "repetitive: 'snel producten vinden / kostbare tijd besparen / georganiseerd blijven' restated in all three sections",
   "image is a placeholder reused from inkomende-leveringen (UnFE1JdBW063...png, alt 'ShopLinkr logo') instead of a tags screenshot",
   "vague CTA with no register link ('Meld je aan voor een gratis proefperiode')",
   "filler meta line 'Ontdek hoe deze krachtige tool je kan helpen'"
  ],
  "enIssues": [
   "Repeats the same 'tag, find faster, save time, stay organized' benefit across all three sections with little new info",
   "Image points to the wrong asset folder (inkomende-leveringen-registreren) despite imageAlt 'Product tags in ShopLinkr'",
   "CTA section has no actual link, just 'Sign up for a free trial period' text"
  ]
 },
 {
  "nl": "src/content/blogs/het-belang-van-goed-voorraadbeheer-voor-jouw-webshop.md",
  "en": "src/content/blogs-en/the-importance-of-good-inventory-management-for-your-webshop.md",
  "nlVerdict": "rewrite",
  "enVerdict": "rewrite",
  "nlIssues": [
   "heavily bloated and repetitive: the same three points (juiste product op juiste moment, balans te veel/te weinig voorraad, automatiseren met software) are restated across all three H2 sections",
   "classic AI filler phrasing: 'Laten we dieper ingaan', 'Efficiëntie is de naam van het spel', 'Dus waar wacht je nog op?', 'naar een hoger niveau tillen'",
   "no support/register link and a weak generic 'waarom zou je het niet proberen' close instead of a real CTA",
   "thin excerpt 'Voorraadbeheer is enorm belangrijk voor webshops'",
   "ShopLinkr only mentioned generically near the end; no concrete feature shown"
  ],
  "enIssues": [
   "Heavily repetitive: 'right product at the right moment', 'too much stock = storage costs / too little = missed sales', and 'automate with software' are each restated 3+ times across the three sections",
   "Reads like three stitched-together SEO chapters with overlapping content and self-referential filler ('In the next chapter, we'll dive deeper...')",
   "Multiple AI-filler rhetorical questions ('So what are you waiting for?', 'why not give it a try?')",
   "Bloated for the amount of actual information conveyed",
   "Vague closer offers no concrete next step or CTA link"
  ]
 },
 {
  "nl": "src/content/blogs/wat-is-een-ean-code.md",
  "en": "src/content/blogs-en/what-is-an-ean-code.md",
  "nlVerdict": "rewrite",
  "enVerdict": "improve",
  "nlIssues": [
   "bloated: two huge near-duplicate lists ('Waarom EAN-codes belangrijk zijn' 11 items + 'Waarom je ze niet zelf kunt verzinnen' 8 items) that overlap heavily (traceerbaarheid, retailer-eisen, analyses, compliance repeated in both)",
   "several points restated 3x across body and conclusion",
   "no ShopLinkr tie-in or internal links despite being the longest article",
   "'Amazon en eBay verplicht' / 'Amazon accepteert alleen officiele EAN' stated as fact without nuance (bordering on overclaim)"
  ],
  "enIssues": [
   "Two long bulleted lists ('Why EAN codes matter so much' = 10 items, 'Why you cannot make up codes yourself' = 8 items) are padded and overlap heavily (standardization, traceability, recalls, analytics, retailer requirements all appear in both)",
   "'Register your company with the Dutch branch' is an NL-localized assumption left untranslated for an EN audience",
   "Length is inflated by the redundant lists; could be tightened substantially",
   "No ShopLinkr CTA or internal link at all"
  ]
 },
 {
  "nl": "src/content/blogs/wat-is-het-verschil-tussen-een-ean-en-een-barcode.md",
  "en": "src/content/blogs-en/what-is-the-difference-between-an-ean-and-a-barcode.md",
  "nlVerdict": "improve",
  "enVerdict": "improve",
  "nlIssues": [
   "internal links use target=\"_blank\" (opens internal pages in new tab) on /functionaliteiten/* and /blogs/* links",
   "over-linking: 'producten' linked 4x to the same /functionaliteiten/producten page",
   "no informal je/jij voice; impersonal explainer tone",
   "no real ShopLinkr CTA"
  ],
  "enIssues": [
   "Title-case headings inconsistent with house style",
   "Internal links use target=\"_blank\" on same-site links (features/blog), which is poor UX for internal navigation",
   "'products' word linked to /en/features/products four separate times (over-linking the same anchor)",
   "Minor structural overlap with the standalone EAN article (repeats the 13-digit structure breakdown)"
  ]
 },
 {
  "nl": "src/content/blogs/waarom-is-voorraadbeheer-belangrijk-tips-en-voordelen.md",
  "en": "src/content/blogs-en/why-is-inventory-management-important-tips-and-benefits.md",
  "nlVerdict": "improve",
  "enVerdict": "improve",
  "nlIssues": [
   "repeats the same 4 benefits (kosten/overzicht/groei/tijd) in the list and then restates them all again in the closing paragraph",
   "generic SEO content, overlaps voorraadmanagement.md and voorraadsystemen.md",
   "Title-Case label inconsistency ('Kostenbesparing:' etc. with trailing colons)",
   "no internal links to functionaliteit pages"
  ],
  "enIssues": [
   "Closing paragraph restates the four numbered benefits verbatim, then the CTA paragraph repeats them again ('cuts costs, provides overview... saves time')",
   "Generic 'beginner or experienced entrepreneur, it always pays off' filler bookends",
   "Title says 'so important?' while slug/excerpt say 'tips and benefits' (minor title/excerpt drift)"
  ]
 },
 {
  "nl": "src/content/blogs/wat-is-verzenden-via-bol-(vvb)-precies.md",
  "en": "src/content/blogs-en/what-is-shipping-via-bol-vvb-exactly.md",
  "nlVerdict": "improve",
  "enVerdict": "improve",
  "nlIssues": [
   "unverified \"same-day delivery\" claim about bol shipping options - drop it",
   "spatiefouten earlier fixed but verify tight",
   "EN translationKey must be set to exactly \"wat-is-verzenden-via-bol-(vvb)-precies\" (with parentheses) to match the NL file id - it is currently mismatched, which breaks hreflang"
  ],
  "enIssues": [
   "unverified \"same-day delivery\" as a listed bol shipping option - drop it",
   "fix translationKey to \"wat-is-verzenden-via-bol-(vvb)-precies\" (with parentheses)"
  ]
 }
];

const SCHEMA = {
  type: 'object',
  properties: {
    nl: { type: 'string' }, en: { type: 'string' },
    nlWords: { type: 'integer' }, enWords: { type: 'integer' },
    summary: { type: 'string' },
  },
  required: ['nl', 'en', 'nlWords', 'enWords', 'summary'],
};

const FACTS = `WHAT SHOPLINKR DOES (your ONLY source of product facts - use these, invent nothing more):
- Central order processing from sales channels: bol, Shopify, WooCommerce, Kaufland and other marketplaces/webshops.
- Realtime inventory sync across all channels to prevent overselling; stock forecasting; fictional stock and unlimited stock options.
- Pick lists with a smart route through the warehouse, barcode scanning, bins, packing stations.
- One-click shipping labels for carriers (PostNL, DPD, MyParcel, Sendcloud, Sendy, QLS, Innosend and more) and AutoPrint; track & trace is sent back automatically to the sales channel.
- Returns processing, purchase advice per supplier, hierarchical warehouse locations, reports (revenue/margin per product, dead stock, stock value, ABC analysis), automation rules, product bundles and variants, EAN/variant grouping.
- pay-as-you-go pricing and a 14-day free trial. Register link: https://app.shoplinkr.com/auth/register`;

function buildPrompt(t) {
  return `You are improving a ShopLinkr BLOG article and its English twin. They are old (2023-2024) AI content. Make them genuinely good: tight, accurate, useful, in a natural informative blog voice. Keep what already works; fix what is flagged below.

FILES:
- NL: ${t.nl}
- EN: ${t.en}

ISSUES FLAGGED FOR THIS PAIR (fix every one):
NL (verdict ${t.nlVerdict}):
${(t.nlIssues || []).map((i) => '  - ' + i).join('\n') || '  - (general tighten)'}
EN (verdict ${t.enVerdict}):
${(t.enIssues || []).map((i) => '  - ' + i).join('\n') || '  - (general tighten)'}

INSTRUCTIONS:
- Read BOTH files in full. Preserve the frontmatter image, publishedAt and category, and the EN translationKey, UNLESS a flagged issue tells you to fix the translationKey (then set it to the exact value given).
- Tighten the body: remove repetition and filler, cut cliches ("naar een hoger niveau tillen", "naadloze integratie", "fluitje van een cent", "In deze blogpost ontdek je", "razendsnel", rhetorical "waar wacht je nog op"). Every paragraph must add new information. Target a tight blog length (~250-450 words); cut the bloated ones hard.
- Use REAL <h2>/<h3> headings (not bold-paragraph pseudo-headings), Dutch sentence case (only the first word and proper nouns capitalized). Body elements: <p>, <ul>/<ol>/<li>, <a href>, <strong>. NO <h1> (the title renders as the H1).
- Ground it in REAL ShopLinkr features (whitelist below). Add 1-2 contextual internal links to real pages (/functionaliteiten/voorraad, /functionaliteiten/picklijsten, /functionaliteiten/vervoerders, /functionaliteiten/bestellingen, /integraties, /gidsen, /support; EN: /en/features/*, /en/integrations, /en/guides, /en/support) and a proper closing CTA with the trial link <a href="https://app.shoplinkr.com/auth/register">...</a> and "14 dagen gratis" / "14 days free".
- Make internal same-site links NOT open in a new tab (remove target="_blank" on internal links). Do not over-link the same page repeatedly.
- Update the NL and EN excerpt + imageAlt to be tight and specific (excerpt 150-160 chars, also shown as the visible subheading). Keep the image path unchanged; only fix the imageAlt text.

HARD RULES (a violation = failure):
- NO invented or unverifiable facts, numbers, stats, third-party program names, or capabilities ShopLinkr does NOT have. STRICTLY FORBIDDEN: AI, machine learning, IoT, RFID, blockchain, "same-day delivery via bol", "Bulk 10-daagse", "Bol.com Select", order/product counts (110.000/22.000/1 miljoen/1 million), founding years, parcel volumes. If the old page claimed any of these, REMOVE them.
- Only describe REAL ShopLinkr capabilities (whitelist). About third parties, only generic safe statements. For EAN/barcode posts, do not overclaim (no "Amazon accepteert alleen officiele EAN"); keep requirements cautious and generic.
- NO emdash. "bol"/"bol.com": capital "Bol" only at the very start of a sentence, lowercase "bol" everywhere else; use "bol" consistently (write "bol.com" only when you specifically mean the website/domain). Brand is exactly "ShopLinkr".
- NL informal je/jij/jouw (never "u" or "men"). EN American spelling.

${FACTS}

Write BOTH files (Write or Edit). Return nl, en, nlWords, enWords, and a one-line summary.`;
}

phase('Rewrite');
log(`Rewriting ${TASKS.length} blog pairs`);
const results = (await parallel(TASKS.map((t) => () =>
  agent(buildPrompt(t), { label: 'blog:' + t.nl.replace('src/content/blogs/', '').replace('.md', ''), phase: 'Rewrite', schema: SCHEMA })
    .then((r) => r || { nl: t.nl, en: t.en, nlWords: 0, enWords: 0, summary: '(agent error)' }),
))).filter(Boolean);

let nlw = 0, enw = 0;
for (const r of results) { nlw += r.nlWords || 0; enw += r.enWords || 0; }
log(`Done: ${results.length} pairs. Avg new words NL ${Math.round(nlw / results.length)}, EN ${Math.round(enw / results.length)}`);
return { pairs: results.length, avgNlWords: Math.round(nlw / results.length), avgEnWords: Math.round(enw / results.length), results };
