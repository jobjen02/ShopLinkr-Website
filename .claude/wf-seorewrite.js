export const meta = {
  name: 'shoplinkr-seo-rewrite',
  description: 'Completely rewrite the 38 root SEO pages (+ EN twins): tight, accurate, useful, SEO-strong, zero fabrication',
  phases: [{ title: 'Rewrite', detail: 'one agent per NL+EN pair rewrites both from scratch' }],
};

const PAIRS = [
  { nl: 'src/content/seo/bol-lvb-voorraad-switch.md', en: 'src/content/seo-en/bol-lvb-stock-switch.md' },
  { nl: 'src/content/seo/eenvoudig-voorraadbeheer-in-excel-tips-en-tricks.md', en: 'src/content/seo-en/easy-inventory-management-in-excel-tips-and-tricks.md' },
  { nl: 'src/content/seo/effectief-voorraadbeheer-in-excel-tips-en-tricks.md', en: 'src/content/seo-en/effective-inventory-management-in-excel-tips-and-tricks.md' },
  { nl: 'src/content/seo/effectief-voorraadbeheer-met-excel.md', en: 'src/content/seo-en/effective-inventory-management-with-excel.md' },
  { nl: 'src/content/seo/alles-wat-je-moet-weten-over-back-ordering.md', en: 'src/content/seo-en/everything-you-need-to-know-about-back-ordering.md' },
  { nl: 'src/content/seo/alles-wat-je-moet-weten-over-voorraadbeheer-in-excel.md', en: 'src/content/seo-en/everything-you-need-to-know-about-inventory-management-in-excel.md' },
  { nl: 'src/content/seo/excel-voorraadbeheer-alles-wat-je-moet-weten.md', en: 'src/content/seo-en/excel-inventory-management-everything-you-need-to-know.md' },
  { nl: 'src/content/seo/gratis-voorraadbeheer-excel-template-download-nu.md', en: 'src/content/seo-en/free-inventory-management-excel-template-download-now.md' },
  { nl: 'src/content/seo/gratis-voorraadbeheer-in-excel-zo-doe-je-dat.md', en: 'src/content/seo-en/free-inventory-management-in-excel-heres-how.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-dpd-met-bol.md', en: 'src/content/seo-en/how-to-connect-dpd-to-bol.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-dpd-met-shopify.md', en: 'src/content/seo-en/how-to-connect-dpd-to-shopify.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-dpd-met-woocommerce.md', en: 'src/content/seo-en/how-to-connect-dpd-to-woocommerce.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-innosend-met-bol.md', en: 'src/content/seo-en/how-to-connect-innosend-to-bol.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-innosend-met-shopify.md', en: 'src/content/seo-en/how-to-connect-innosend-to-shopify.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-innosend-met-woocommerce.md', en: 'src/content/seo-en/how-to-connect-innosend-to-woocommerce.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-myparcel-met-bol.md', en: 'src/content/seo-en/how-to-connect-myparcel-to-bol.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-myparcel-met-shopify.md', en: 'src/content/seo-en/how-to-connect-myparcel-to-shopify.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-myparcel-met-woocommerce.md', en: 'src/content/seo-en/how-to-connect-myparcel-to-woocommerce.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-postnl-met-bol.md', en: 'src/content/seo-en/how-to-connect-postnl-to-bol.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-postnl-met-shopify.md', en: 'src/content/seo-en/how-to-connect-postnl-to-shopify.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-postnl-met-woocommerce.md', en: 'src/content/seo-en/how-to-connect-postnl-to-woocommerce.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-qls-met-bol.md', en: 'src/content/seo-en/how-to-connect-qls-to-bol.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-qls-met-shopify.md', en: 'src/content/seo-en/how-to-connect-qls-to-shopify.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-qls-met-woocommerce.md', en: 'src/content/seo-en/how-to-connect-qls-to-woocommerce.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-sendcloud-met-bol.md', en: 'src/content/seo-en/how-to-connect-sendcloud-to-bol.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-sendcloud-met-shopify.md', en: 'src/content/seo-en/how-to-connect-sendcloud-to-shopify.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-sendcloud-met-woocommerce.md', en: 'src/content/seo-en/how-to-connect-sendcloud-to-woocommerce.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-sendy-met-bol.md', en: 'src/content/seo-en/how-to-connect-sendy-to-bol.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-sendy-met-shopify.md', en: 'src/content/seo-en/how-to-connect-sendy-to-shopify.md' },
  { nl: 'src/content/seo/hoe-koppel-ik-sendy-met-woocommerce.md', en: 'src/content/seo-en/how-to-connect-sendy-to-woocommerce.md' },
  { nl: 'src/content/seo/hoe-voorraad-bijhouden-in-excel-tips-en-tricks.md', en: 'src/content/seo-en/how-to-track-inventory-in-excel-tips-and-tricks.md' },
  { nl: 'src/content/seo/voorraadbeheer-met-excel-een-complete-gids.md', en: 'src/content/seo-en/inventory-management-with-excel-a-complete-guide.md' },
  { nl: 'src/content/seo/verkopen-via-bol-zonder-voorraad.md', en: 'src/content/seo-en/selling-on-bol-without-inventory.md' },
  { nl: 'src/content/seo/verkopen-via-bol-com.md', en: 'src/content/seo-en/selling-on-bol.md' },
  { nl: 'src/content/seo/producten-verkopen-via-bol.md', en: 'src/content/seo-en/selling-products-on-bol.md' },
  { nl: 'src/content/seo/het-belang-van-effectief-voorraadbeheer.md', en: 'src/content/seo-en/the-importance-of-effective-inventory-management.md' },
  { nl: 'src/content/seo/de-ultieme-gids-voor-magazijnsoftware.md', en: 'src/content/seo-en/the-ultimate-guide-to-warehouse-software.md' },
  { nl: 'src/content/seo/wat-is-een-backorder.md', en: 'src/content/seo-en/what-is-a-backorder.md' },
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
- One-click shipping labels for carriers (PostNL, DPD, MyParcel, Sendcloud and more) and AutoPrint; track & trace is sent back automatically to the sales channel.
- Returns processing, purchase advice per supplier, hierarchical warehouse locations, reports (revenue/margin per product, dead stock, stock value, ABC analysis), automation rules, product bundles and variants.
- pay-as-you-go pricing and a 14-day free trial. Register link: https://app.shoplinkr.com/auth/register`;

function buildPrompt(nl, en) {
  return `You are rewriting a ShopLinkr SEO page and its English twin. Both were generated years ago by a weaker AI: bloated, very repetitive, pure SEO filler (~1300 words). Make them genuinely good: tight, accurate, useful, still SEO-strong.

FILES:
- NL: ${nl}
- EN twin: ${en}

STEP 1 - Read BOTH files in full. Note the frontmatter title (it renders as the page H1 and <title>) and its target keyword/intent; PRESERVE image, publishedAt, category, and the EN translationKey. Keep any genuinely useful substance; discard all repetition and filler.

STEP 2 - Rewrite the NL body COMPLETELY:
- ~400-600 words. Tight. ZERO repetition: every paragraph adds new information. Cut filler like "In dit artikel zullen we...", "Kortom...", restating the same point three times.
- HTML, the SAME element vocabulary as the current file: <p>, <h2>, <h3>, <ul>/<ol>/<li>, <a href>, <strong>. NO <h1> (the title is rendered as the H1 by the layout).
- Shape: one sharp intro <p> that answers the search intent immediately and contains the keyword naturally; then 2-4 focused <h2> sections, each genuinely useful (real steps via <ol>, concrete value); optionally a short "Veelgestelde vragen" <h2> with 2-3 <h3> question + <p> answer if it adds value; then a short closing <p> with a soft call to action (if a trial fits, link <a href="https://app.shoplinkr.com/auth/register">...</a> and you may mention "14 dagen gratis").
- Add 1-3 contextual internal links to REAL ShopLinkr pages (root-relative) where relevant: /functionaliteiten/vervoerders, /functionaliteiten/voorraad, /functionaliteiten/picklijsten, /functionaliteiten/bestellingen, /integraties, /gidsen, /support. ONLY pages you are confident exist. Never link an old "...-samen-gebruiken" page.

STEP 3 - Update NL frontmatter: title (keep the target keyword, fix wording and casing to Dutch sentence case); excerpt (a compelling meta description of 150-160 chars, also shown as the visible subheading); imageAlt (short, descriptive; do NOT change image). Keep publishedAt, image and category unchanged.

STEP 4 - Rewrite the EN twin (${en}) as the American-English version of the SAME improved article: mirror the structure and facts, in natural American English (not a literal translation). Update its title/excerpt/imageAlt the same way. KEEP its translationKey, publishedAt and image unchanged.

HARD RULES (a violation = failure):
- NEVER invent or add facts, numbers, statistics, prices, dates, or third-party program names. Do NOT use "110.000"/"22.000"/"1 miljoen" order or product counts, "Bulk 10-daagse", "Bol.com Select", invented bol/carrier service-tier names, founding years or parcel volumes. If the old page had such a claim, DROP it.
- Only describe REAL ShopLinkr capabilities (see below). About third parties, only generic safe statements ("bol is een groot Nederlands verkoopkanaal", "DPD is een pakketvervoerder", "Shopify is een webshopplatform").
- NO emdash anywhere. Use commas or periods.
- "bol"/"bol.com": capital "Bol" ONLY at the very start of a sentence; lowercase "bol" everywhere else. The brand is exactly "ShopLinkr".
- NL: informal je/jij/jouw. EN: American spelling (optimize, color, center, fulfillment, catalog, canceled).

${FACTS}

Write BOTH files (use Write or Edit). Return nl, en, nlWords (new NL body word count), enWords, and a one-line summary of how you improved them.`;
}

phase('Rewrite');
log(`Rewriting ${PAIRS.length} SEO page pairs (NL + EN)`);
const results = (await parallel(PAIRS.map((p) => () =>
  agent(buildPrompt(p.nl, p.en), { label: 'seo:' + p.nl.replace('src/content/seo/', '').replace('.md', ''), phase: 'Rewrite', schema: SCHEMA })
    .then((r) => r || { nl: p.nl, en: p.en, nlWords: 0, enWords: 0, summary: '(agent error)' }),
))).filter(Boolean);

let nlw = 0, enw = 0;
for (const r of results) { nlw += r.nlWords || 0; enw += r.enWords || 0; }
log(`Done: ${results.length} pairs. Avg new words NL ${Math.round(nlw / results.length)}, EN ${Math.round(enw / results.length)}`);
return { pairs: results.length, avgNlWords: Math.round(nlw / results.length), avgEnWords: Math.round(enw / results.length), results };
