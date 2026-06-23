export const meta = {
  name: 'shoplinkr-site-audit',
  description: 'Exhaustive ShopLinkr marketing-site audit: content typos/brand/facts + code/design/SEO/AI dimensions, structured findings',
  phases: [
    { title: 'Audit', detail: '24 content-batch finders + 12 code/SEO/AI dimension finders' },
  ],
};

// ---------------------------------------------------------------------------
// Shared standards. Findings MUST be judged against these so conformant code is
// not reported as a problem, and so fixes match the site's established canon.
// ---------------------------------------------------------------------------
const STANDARDS = `SHOPLINKR SITE STANDARDS (judge every finding against these; do NOT report conformant code as a problem):

BRAND / WRITING:
- Brand is EXACTLY "ShopLinkr" (capital S, capital L, lowercase rest). Flag any other casing: Shoplinkr, shoplinkr, SHOPLINKR, ShopLinker, Shoplinker, Shop Linkr.
- "bol" / "bol.com" is DELIBERATELY lowercase mid-sentence (Dutch retailer brand). Do NOT flag lowercase bol/bol.com. Capital "Bol" is only correct at the very start of a sentence.
- NO emdash (the long dash) ANYWHERE in copy. Flag every one. Fix = comma, period, or rewrite. A short en-dash inside a numeric range is acceptable.
- NL copy tone: informal (je / jij / jou / jouw / jouw bedrijf). Flag formal u / uw where the surrounding tone is informal.
- EN copy: AMERICAN English everywhere (optimize, organize, color, center, analyze, behavior, license-as-verb, fulfillment, canceled, catalog). Flag British spellings: optimise, organise, colour, centre, analyse, behaviour, licence-as-verb, fulfilment, cancelled, catalogue, -ise stems. KEEP these -ise/-ce words (do NOT "fix" them): surprise, exercise, franchise, enterprise, merchandise, advertise, comprise, rise, promise, precise, concise, practice(noun), advice, service, price, choice, voice, notice, office, device, invoice, niche.
- NEVER invent features, UI, statistics, or pricing. Mark anything that looks fabricated / over-specific / unverifiable as category "factual" severity "high" autofixable=false (the human verifies, do not auto-change).

SPACING (Tailwind canon; conformant = OK, do NOT flag these as wrong):
- Full content <section> = py-24 md:py-32. Under-hero intro row (pb only) = pb-12 md:pb-16. Bento/feature-card grid = py-12 md:py-16. Thin band (trustbar / bordered rows) = py-14 md:py-16. CtaBanner = py-24 md:py-32. Footer = pt-20 pb-10. Shared hero = pt-16 md:pt-24 pb-12 md:pb-16 (homepage Hero keeps pt-12 pb-20 md:pt-16 md:pb-28 by design).
- Section header block: eyebrow above h2 = mb-4; intro <p> after h2 = mt-6; header wrapper before grid = mb-12 md:mb-16. 2-col split (text+visual) gutter = gap-12 lg:gap-16.
- Card padding tiers: compact/list p-5 md:p-6; standard p-6 md:p-7; large/hero/testimonial p-8 md:p-10.
- Containers: container-prose (text), container-wide (grids), both px-6.
- An NL route (src/pages/<nl>) and its EN twin (src/pages/en/<en>) and shared page components must be BYTE-IDENTICAL on layout/spacing/structure classes; only human text differs. Flag any layout-class drift between twins.

DARK MODE (class-based .dark; conformant tokens = OK):
- surfaces: card = dark:bg-charcoal; subtle section = dark:bg-graphite; chip = dark:bg-flint. text: primary = dark:text-paper; muted = dark:text-gravel (text-gravel / text-paper stay as-is). borders/rings/divides ALWAYS = dark:border-flint / dark:ring-flint / dark:divide-flint. hover brighten one step = dark:hover:ring-steel / dark:hover:border-steel. warm tint = dark:bg-sunstone/5 (opacity variants /10), warm ring = dark:ring-sunstone/30.
- Brand + status colors (sunstone accent text, green/red/blue, integration brand hex, logos, images, data-series chart colors) NEVER invert. Logo-backing tiles + the cookie primary button stay deliberately light.
- FLAG: a light surface (bg-paper / bg-chalk* / bg-charcoal-as-accent / bg-white / bg-[#lighthex]) with NO dark: variant; dark:text-white; raw text-black/text-white/bg-black/bg-white; arbitrary dark:*-[#hex] where a token exists; a border/ring/divide using graphite or charcoal instead of flint.

MOBILE (390px is the priority viewport, ~80% of traffic):
- Tap targets >= 44px (min-h-11 / min-h-[44px]) for any link or pill that acts as a button. No page-level horizontal overflow: wide tables/matrices get a local overflow-x-auto wrapper + min-w-[..]; multi-col grids/flex must stack (grid-cols-1 sm:grid-cols-2 / flex-wrap). Content-first stacking order on mobile. 36px ring icon-buttons (footer socials h-9 w-9, hamburger) are accepted, do NOT flag.
- FLAG: fixed pixel widths/heights on layout containers that can overflow 390px; multi-col grids that never stack; genuinely tiny tap targets on real buttons. Decorative micro-text (text-[9px]..text-[11px]) inside dashboard/order MOCKUPS is by-design, do NOT flag.

i18n / SEO:
- Locale derives from the URL; shared components read Astro.currentLocale + useTranslations(locale). FLAG: locale === 'en' ? x : y ternaries (the robust pattern is the src/i18n/localeData.ts registry); hardcoded NL hrefs or Dutch labels inside SHARED components (must use localizeHref / localizedPath / the dict); NL number/price formatting (1.000, EUR 50,00 with comma) on EN pages; non-reciprocal or missing hreflang; canonical that is not self-referential; more than one <h1> or skipped heading levels; content images without descriptive alt; missing or wrong-length meta description.

OUTPUT RULES:
- Report ONLY real, verified issues. Quote exact evidence (the offending text or class string). Put the file path in "area" and a line number/hint where possible.
- severity: critical = broken build / wrong fact / broken page; high = user-visible bug, broken link, SEO-blocking, fabricated claim; medium = inconsistency, spacing/darkmode/a11y defect; low = minor copy/polish; tip = SEO/AI improvement suggestion (not a defect).
- autofixable=true ONLY for unambiguous deterministic fixes (a typo, an emdash, a spelling, a spacing class, a dark token, an alt attribute, a meta tag). false for content rewrites, factual-risk, and anything needing a human judgment/design call.`;

const FINDINGS_SCHEMA = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          area: { type: 'string', description: 'file path, component, or "global"' },
          line: { type: 'string', description: 'line number or anchor, if known' },
          category: {
            type: 'string',
            enum: ['typo', 'grammar', 'brand', 'emdash', 'factual', 'consistency', 'spacing', 'responsive', 'darkmode', 'a11y', 'bug', 'deadcode', 'i18n', 'seo-technical', 'seo-content', 'ai-readiness', 'link', 'other'],
          },
          severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low', 'tip'] },
          locale: { type: 'string', enum: ['nl', 'en', 'both', 'na'] },
          description: { type: 'string' },
          evidence: { type: 'string', description: 'exact offending text / class / line' },
          suggestion: { type: 'string', description: 'concrete fix' },
          autofixable: { type: 'boolean' },
        },
        required: ['area', 'category', 'severity', 'description', 'evidence', 'suggestion', 'autofixable'],
      },
    },
  },
  required: ['findings'],
};

// ---------------------------------------------------------------------------
// Content batches: deterministic file slices (agent re-derives the exact list
// with find|sort|awk so there is no overlap or gap).
// ---------------------------------------------------------------------------
const contentGroups = [
  { dir: 'src/content/blogs', lang: 'nl', ranges: [[1, 12], [13, 23]] },
  { dir: 'src/content/seo', lang: 'nl', ranges: [[1, 15], [16, 30], [31, 45], [46, 59]] },
  { dir: 'src/content/support', lang: 'nl', ranges: [[1, 14], [15, 28], [29, 42], [43, 56], [57, 70], [71, 81]] },
  { dir: 'src/content/blogs-en', lang: 'en', ranges: [[1, 12], [13, 23]] },
  { dir: 'src/content/seo-en', lang: 'en', ranges: [[1, 15], [16, 30], [31, 45], [46, 59]] },
  { dir: 'src/content/support-en', lang: 'en', ranges: [[1, 14], [15, 28], [29, 42], [43, 56], [57, 70], [71, 81]] },
];

function contentPrompt(dir, lang, s, e) {
  return `${STANDARDS}

TASK: Audit ShopLinkr marketing-site CONTENT (.md) files. Locale = ${lang.toUpperCase()}.
Get your EXACT file list (deterministic, run it):
  find ${dir} -name '*.md' | sort | awk 'NR>=${s} && NR<=${e}'
Read EVERY listed file IN FULL (frontmatter + body). For each file, find every real issue:
- spelling / typos / grammar / punctuation / double words / missing words
- brand-casing violations (must be exactly "ShopLinkr"; do NOT flag lowercase bol/bol.com)
- emdash anywhere
- factual-risk: invented features, fabricated numbers or stats, guessed pricing, over-specific or unverifiable claims (category=factual, severity=high, autofixable=false)
- broken or relative internal links, broken markdown, malformed/duplicate frontmatter, weak/duplicate title or excerpt/summary, heading-hierarchy problems
${lang === 'en'
  ? '- British spellings -> American (respect the keep-list). Flag any leftover Dutch words/sentences in EN content.'
  : '- formal u/uw where the informal je/jij tone fits.'}
Quote exact evidence and give the file path in "area" plus a line hint. Only REAL issues. Return findings via the structured tool.`;
}

// ---------------------------------------------------------------------------
// Code / design / SEO / AI dimension finders.
// ---------------------------------------------------------------------------
const dims = [
  {
    label: 'dim:spacing',
    prompt: `${STANDARDS}

TASK: Audit SPACING / PADDING / LAYOUT consistency across ALL .astro files in src/pages, src/components, src/layouts.
Use Grep + Read. Flag against the SPACING canon: sections not py-24 md:py-32 where a full content section is intended; header wrappers not mb-12 md:mb-16; eyebrow not mb-4; intro <p> not mt-6; card paddings off the p-5/6 - p-6/7 - p-8/10 tiers; 2-col split gutters not gap-12 lg:gap-16; obviously inconsistent/asymmetric margins or gaps.
CRITICAL also: compare each NL route file (src/pages/<x>.astro) with its EN twin (src/pages/en/<y>.astro) and shared page components - flag any LAYOUT/SPACING/STRUCTURE class drift between twins (they must be byte-identical except human text). Cite file + exact class.`,
  },
  {
    label: 'dim:darkmode',
    prompt: `${STANDARDS}

TASK: Audit DARK MODE coverage across ALL .astro and .vue files (src/components, src/pages, src/layouts, src/components/islands).
Use Grep for: bg-paper / bg-chalk / bg-chalk-light / bg-chalk-dark / bg-white / bg-charcoal / bg-[#hex] / text-charcoal / border-chalk / ring-chalk / divide-chalk and check each has the correct dark: counterpart per the contract. Flag: a light surface with NO dark: variant; dark:text-white; raw text-black/white or bg-black/white; arbitrary dark:*-[#hex] where a token exists; a border/ring/divide using dark:*-graphite or dark:*-charcoal instead of flint; missing dark hover brighten. Do NOT flag brand/status/logo/mockup-illustration colors. Cite file + class.`,
  },
  {
    label: 'dim:responsive',
    prompt: `${STANDARDS}

TASK: Audit RESPONSIVE / MOBILE (390px) across ALL .astro and .vue files.
Use Grep + Read. Flag: fixed pixel widths/heights (w-[..px], min-w-[..px], h-[..px]) on layout containers that can overflow 390px without an overflow-x-auto scroll wrapper; multi-column grids/flex (grid-cols-2/3/4, flex with many items) that never collapse to a single column on mobile; real link/pill BUTTONS with tap area < 44px (no min-h-11 / py>=2.5); tables/matrices without a scroll wrapper. Do NOT flag accepted 36px ring icon-buttons or decorative mockup micro-text. Cite file + class.`,
  },
  {
    label: 'dim:a11y',
    prompt: `${STANDARDS}

TASK: Audit ACCESSIBILITY across src/pages, src/components, src/layouts, src/components/islands (.astro + .vue).
Flag: <img> with missing or empty alt on meaningful images (decorative may use alt=""); more than one <h1> or zero <h1> per page; skipped heading levels (h2 -> h4); form <input>/<select>/<textarea> without an associated <label> or aria-label; icon-only <a>/<button> without aria-label or sr-only text; links with non-descriptive text ("klik hier", "lees meer" with no context); missing lang attribute; aria-* misuse; interactive elements not keyboard-reachable; meaning conveyed by color alone. Cite file + element.`,
  },
  {
    label: 'dim:bugs',
    prompt: `${STANDARDS}

TASK: Audit BUGS / DEAD CODE across src (.astro, .ts, .vue, .mjs, middleware.ts, astro.config.mjs, content.config.ts).
Find: broken/incorrect imports, references to undefined variables, unused imports/vars, unreachable/dead code, leftover console.log/debugger, TODO/FIXME/XXX/HACK, placeholder text (lorem ipsum, "tekst hier", dummy), commented-out code blocks left in, obviously wrong logic, duplicate element id attributes, off-by-one or wrong conditionals.
KNOWN ISSUE to confirm + locate precisely: src/middleware.ts onRequest reads context.request.headers during prerender of the prerendered [slug].astro pages, producing the build WARN "Astro.request.headers was used ... not available on prerendered pages". Confirm and propose the guard (e.g. context.isPrerendered early-return). Cite file + line.`,
  },
  {
    label: 'dim:i18n',
    prompt: `${STANDARDS}

TASK: Audit i18n ROBUSTNESS across src.
Use Grep. Flag: any "locale === 'en' ?" / "locale === 'nl' ?" / "=== 'en'" ternary selecting data/labels/paths (the robust pattern is the src/i18n/localeData.ts registry); hardcoded NL hrefs (href="/prijzen" etc.) or Dutch literal labels inside SHARED components (src/components/pages, src/components/sections, src/components/layout) that render for both locales without localizeHref/localizedPath/dict; NL number/price formatting on EN output; getCollection calls that hardcode the NL collection regardless of locale; missing/incorrect alternates (hreflang) on dynamic routes; breadcrumb Home pointing to / instead of /en on EN pages. Cite file + line.`,
  },
  {
    label: 'dim:seo-technical',
    prompt: `${STANDARDS}

TASK: Audit TECHNICAL SEO. Read src/components/seo/BaseHead.astro, src/layouts/BaseLayout.astro, src/layouts/PageLayout.astro, src/layouts/ArticleLayout.astro, src/utils/seo.ts, astro.config.mjs, and how pages set title/description (mostly from the dict t.pages.*.meta and from content frontmatter).
Check: every page has a unique <title> (ideally <=60 chars, with the ShopLinkr brand) and a unique meta description (~150-160 chars); canonical is self-referential; OG + twitter tags complete and image present; exactly one <h1> per page; JSON-LD is valid and appropriate (Organization + WebSite global; Article + BreadcrumbList on [slug] pages; is there FAQPage schema anywhere FAQs are shown? is there SoftwareApplication/Product schema for the product? Breadcrumb visible vs only JSON-LD); sitemap priorities/changefreq in astro.config make sense for the new root-level SEO pages; robots/sitemap wiring. Look hard for DUPLICATE or MISSING titles/descriptions and missing structured-data opportunities. Use Grep across the dict for repeated meta strings. Cite specifics.`,
  },
  {
    label: 'dim:seo-content',
    prompt: `${STANDARDS}

TASK: Provide SEO CONTENT strategy findings + tips (most will be severity "tip", category "seo-content").
Inspect the page inventory (src/pages, src/content/seo, src/content/blogs) and the dict copy. Identify: thin/short pages that need more depth; keyword-targeting gaps or weak/duplicate H1s vs title; internal-linking opportunities (orphan pages with no inbound contextual links, SEO landing pages not linked from anywhere, missing contextual links between related feature/integration/seo pages); pages with Q&A content that should expose FAQPage schema; weak or missing meta descriptions on the root SEO landing pages; title/description optimization patterns; content-freshness signals (dateModified); image filename/alt keyword use. Be concrete and actionable with examples. Cite pages.`,
  },
  {
    label: 'dim:ai-readiness',
    prompt: `${STANDARDS}

TASK: Audit AI / LLM READINESS (so ChatGPT, Claude, Perplexity, Google AI cite the site accurately).
Read public/llms.txt, public/llms-full.txt, public/robots.txt, public/.well-known/api-catalog, src/middleware.ts, src/components/seo/JsonLd.astro, src/layouts/BaseLayout.astro.
Verify: EVERY URL linked in llms.txt and llms-full.txt actually resolves (cross-check against src/pages, src/content slugs, routes.ts, redirects.mjs) - flag dead or outdated links and note that the 59 SEO pages now live at ROOT urls (are they represented? are any old /blogs/<seo> references stale?); llms.txt product description still accurate; robots.txt allows the major AI crawlers + Content-Signal; the markdown-for-agents middleware still works AND the prerender header bug above; FAQPage/HowTo/Article structured data present for machine extraction; semantic HTML landmarks (main/nav/article/section/header/footer) present; ShopLinkr is defined crisply as an entity (what it is, who it is for) in a machine-readable way; concrete tips to improve AI answer inclusion. Cite specifics.`,
  },
  {
    label: 'dim:links',
    prompt: `${STANDARDS}

TASK: INTERNAL LINK INTEGRITY (highest-value, falsifiable). Build the set of VALID internal URLs, then find every broken internal link.
Steps: (1) Read src/i18n/routes.ts and enumerate all localized paths (nl + en). (2) List content slugs: blogs/seo filenames (root-served for seo, /blogs/<slug> for blogs, /en/<slug> + /en/blog/<slug>), support slugs + category/subcategory paths, integration slugs (/integraties/<slug>). (3) List actual page files in src/pages (and src/pages/en). (4) Read src/data/redirects.mjs for valid redirect SOURCES. (5) Grep ALL internal links: href="/..." and markdown ](/...) across src/content, src/components, src/pages, src/i18n, src/data. (6) For each internal link, decide if it resolves to a real page/route/redirect. Flag every link that does NOT resolve (category=link, severity=high) with the source file + the bad href. Also flag obvious anchor (#id) links to ids that do not exist on the target. Be precise; do not flag external https links.`,
  },
  {
    label: 'dim:dict',
    prompt: `${STANDARDS}

TASK: Deep-audit the UI dictionaries src/i18n/locales/nl.ts and src/i18n/locales/en.ts (each ~2300 lines; read in chunks, cover ALL of both).
Flag: spelling/typos/grammar in UI strings (both locales); emdash; brand-casing; NL formal-vs-informal slips; British spellings in en.ts (American required, respect keep-list); KEY PARITY mismatches (a key present in nl.ts but missing in en.ts or vice versa, or structurally divergent); duplicate/placeholder/empty values; suspicious factual claims (numbers, pricing, feature names) that may be fabricated; NL leftover text in en.ts or EN text in nl.ts. Cite the key path + line.`,
  },
  {
    label: 'dim:faqs-data',
    prompt: `${STANDARDS}

TASK: Audit data files src/data/faqs.ts, src/data/faqs-en.ts, src/data/supportCategories.ts, src/data/supportCategories-en.ts, src/data/externalLinks.ts.
Read each fully. Flag: typos/grammar; emdash; brand-casing; British spelling in the -en files (American required); NL/EN parity mismatches (question/category present in one locale but not the other); duplicate questions; factual-risk in answers (fabricated numbers/pricing/features); broken URLs in externalLinks.ts; weak or contradictory answers. Cite key/line.`,
  },
];

// ---------------------------------------------------------------------------
// Run all finders in parallel; aggregate findings tagged by source.
// ---------------------------------------------------------------------------
phase('Audit');

const contentTasks = [];
for (const g of contentGroups) {
  for (const [s, e] of g.ranges) {
    const label = `content:${g.dir.replace('src/content/', '')}:${s}-${e}`;
    contentTasks.push({ label, prompt: contentPrompt(g.dir, g.lang, s, e) });
  }
}

const allTasks = [
  ...contentTasks.map((t) => () =>
    agent(t.prompt, { label: t.label, phase: 'Audit', schema: FINDINGS_SCHEMA })
      .then((r) => ({ source: t.label, findings: (r && r.findings) || [] })),
  ),
  ...dims.map((d) => () =>
    agent(d.prompt, { label: d.label, phase: 'Audit', schema: FINDINGS_SCHEMA })
      .then((r) => ({ source: d.label, findings: (r && r.findings) || [] })),
  ),
];

const results = (await parallel(allTasks)).filter(Boolean);

const findings = [];
for (const r of results) {
  for (const f of r.findings) findings.push({ source: r.source, ...f });
}

const bySeverity = {};
const byCategory = {};
for (const f of findings) {
  bySeverity[f.severity] = (bySeverity[f.severity] || 0) + 1;
  byCategory[f.category] = (byCategory[f.category] || 0) + 1;
}

log(`Audit complete: ${findings.length} findings across ${results.length} finders`);

return { total: findings.length, bySeverity, byCategory, findings };
