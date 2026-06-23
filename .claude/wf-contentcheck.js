export const meta = {
  name: 'shoplinkr-content-check',
  description: 'Content-quality audit of the remaining content: blogs, support articles, integrations - per-page verdict + issues',
  phases: [{ title: 'Check', detail: 'batched assessor agents read every page and rate it' }],
};

const STANDARDS = `STANDARDS to judge against:
- Brand is exactly "ShopLinkr". "bol"/"bol.com" lowercase except at the very start of a sentence. NO emdash. NL informal je/jij/jouw; EN American spelling.
- Describe only REAL ShopLinkr features; flag anything that looks invented/unverifiable (specific stats like "1 miljoen"/"1 million", invented third-party program names, founding years, parcel volumes, guessed pricing).
- Good content = tight, non-repetitive, genuinely useful, well-structured (clear headings, logical flow), correct, consistent terminology.`;

const SCHEMA = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          file: { type: 'string' },
          locale: { type: 'string', enum: ['nl', 'en'] },
          words: { type: 'integer' },
          verdict: { type: 'string', enum: ['rewrite', 'improve', 'fine'] },
          issues: { type: 'array', items: { type: 'string' } },
          note: { type: 'string' },
        },
        required: ['file', 'locale', 'verdict', 'issues', 'note'],
      },
    },
  },
  required: ['findings'],
};

const batches = [
  { dir: 'src/content/blogs', lang: 'nl', type: 'blog', ranges: [[1, 12], [13, 23]] },
  { dir: 'src/content/blogs-en', lang: 'en', type: 'blog', ranges: [[1, 12], [13, 23]] },
  { dir: 'src/content/support', lang: 'nl', type: 'support', ranges: [[1, 14], [15, 28], [29, 42], [43, 56], [57, 70], [71, 81]] },
  { dir: 'src/content/support-en', lang: 'en', type: 'support', ranges: [[1, 14], [15, 28], [29, 42], [43, 56], [57, 70], [71, 81]] },
  { dir: 'src/content/integrations', lang: 'nl', type: 'integration', ranges: [[1, 20]] },
  { dir: 'src/content/integrations-en', lang: 'en', type: 'integration', ranges: [[1, 20]] },
];

function buildPrompt(b, s, e) {
  const ext = b.type === 'integration' ? 'json' : 'md';
  const typeHint = b.type === 'support'
    ? 'These are SUPPORT / help docs (how-to). Judge: is it clear, accurate-sounding, well-structured documentation? Flag bloat/repetition, errors, inconsistency, broken/relative links, fabricated specifics, and weak summaries.'
    : b.type === 'blog'
      ? 'These are BLOG articles (same vintage as the old SEO pages: possibly bloated, repetitive, AI-filler, with fabricated stats). Judge length, repetition, usefulness, structure, and fabrication.'
      : 'These are INTEGRATION definitions (json: name, slug, summary, tagline, about, faqs). Judge the name/summary/tagline/about/faqs copy for accuracy, consistency, brand casing, errors and fabrication.';
  return `${STANDARDS}

TASK: Content-quality audit. Locale = ${b.lang.toUpperCase()}. ${typeHint}

Get your EXACT file list (deterministic):
  find ${b.dir} -name '*.${ext}' | sort | awk 'NR>=${s} && NR<=${e}'
Read EVERY listed file IN FULL. For each, return a finding with:
- file (full path), locale (${b.lang}), words (approx body word count, 0 for json), verdict, issues[], note.
- verdict: "rewrite" = bloated/very repetitive/filler/largely fabricated, needs a full rewrite; "improve" = mostly fine but has specific fixable issues; "fine" = good as-is.
- issues[]: short, concrete (e.g. "repeats the same benefit 4x", "claims '1 miljoen bestellingen'", "formal 'u' in places", "weak excerpt", "relative internal link", "emdash present"). Empty if fine.
- note: one line summarizing the page's state.
Be honest and specific. Do not rewrite anything now - this is assessment only.`;
}

phase('Check');
const tasks = [];
for (const b of batches) {
  for (const [s, e] of b.ranges) {
    tasks.push({ label: `${b.type}:${b.dir.replace('src/content/', '')}:${s}-${e}`, prompt: buildPrompt(b, s, e) });
  }
}
log(`Auditing content across ${tasks.length} batches`);
const results = (await parallel(tasks.map((t) => () =>
  agent(t.prompt, { label: t.label, phase: 'Check', schema: SCHEMA }).then((r) => (r && r.findings) || []),
))).filter(Boolean);

const findings = results.flat();
const byVerdict = {};
for (const f of findings) byVerdict[f.verdict] = (byVerdict[f.verdict] || 0) + 1;
log(`Done: ${findings.length} pages assessed. ${JSON.stringify(byVerdict)}`);
return { total: findings.length, byVerdict, findings };
