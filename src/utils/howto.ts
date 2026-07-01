// Build a schema.org HowTo node from the ordered-list steps already visible in a
// connection guide's body. A valid HowTo requires the steps to be present on the
// page, and they are, so we derive the markup from that same content instead of
// duplicating it in frontmatter (markup can never drift from what the reader sees).
//
// This is GEO/LLM extraction only: Google dropped HowTo rich results in Aug 2023,
// so there is no SERP visual. A clean, machine-readable step sequence is what AI
// answer engines consume for "how do I connect X to Y" queries, which is the point.
//
// The bodies are inline HTML (the .md files contain literal <ol>/<li>), so a small
// tag-aware extraction is enough; no full HTML parser needed.

type StepInput = { text: string; image?: string };

/** Decode the handful of HTML entities that appear in the step content. */
function decodeEntities(s: string): string {
    return s
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&'); // last, so decoded text never re-decodes
}

/** Strip HTML tags, decode entities and collapse whitespace to clean step text. */
function toText(html: string): string {
    return decodeEntities(html.replace(/<[^>]+>/g, ''))
        .replace(/\s+/g, ' ')
        .trim();
}

/** Plain-text of every <li> inside one <ol>…</ol> block, in document order. */
function stepsFromOl(ol: string): string[] {
    return [...ol.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
        .map((m) => toText(m[1]))
        .filter(Boolean);
}

export type StepsMode = 'first-ol' | 'all-ol';

/**
 * Extract the connection steps from a body of inline HTML.
 * - 'first-ol'  (SEO guides): the first <ol> is the connect procedure; any later
 *   <ol> is a different task ("how to process an order") and is deliberately ignored.
 * - 'all-ol'    (support articles): one procedure split across several single-step
 *   <ol> blocks, so all of them together form the step list.
 */
export function extractSteps(body: string, mode: StepsMode): StepInput[] {
    const ols = [...body.matchAll(/<ol\b[^>]*>[\s\S]*?<\/ol>/gi)].map((m) => m[0]);
    if (ols.length === 0) return [];
    const chosen = mode === 'first-ol' ? ols.slice(0, 1) : ols;
    return chosen.flatMap((ol) => stepsFromOl(ol)).map((text) => ({ text }));
}

/**
 * A HowTo node, or null when fewer than 2 steps are found (never emit an empty or
 * one-step HowTo). Emitted as a separate node that points back at the page via
 * mainEntityOfPage, the same @id the article schema uses.
 */
export function howToSchema(opts: {
    name: string;
    description?: string;
    url: string;
    inLanguage: string;
    steps: StepInput[];
}): Record<string, unknown> | null {
    if (opts.steps.length < 2) return null;
    return {
        '@type': 'HowTo',
        name: opts.name,
        ...(opts.description && { description: opts.description }),
        inLanguage: opts.inLanguage,
        mainEntityOfPage: { '@id': opts.url },
        step: opts.steps.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            text: s.text,
            ...(s.image && { image: s.image }),
        })),
    };
}
