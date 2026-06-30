import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';

// Pure HTML/markdown conversion. No I/O, no routing. Shared by the markdown
// endpoint (document from a content entry) and the middleware (document scraped
// from a rendered page), so both produce byte-identical output for the same
// source. GFM is enabled so tables serialize instead of throwing.

// The content (a Framer export) authors each step as its own single-item
// <ol>, with an image between steps, and renumbers them in the browser via CSS
// counters that reset at each heading. Markdown has no such counter, so without
// this every step would serialize as "1.". This plugin mirrors the CSS: number
// ordered lists continuously within a section and restart at each heading.
function remarkContinuousOrderedLists() {
    return (tree: any) => {
        let counter = 0;
        for (const node of tree.children) {
            if (node.type === 'heading') {
                counter = 0;
            } else if (node.type === 'list' && node.ordered) {
                node.start = counter + 1;
                counter += node.children.length;
            }
        }
    };
}

const processor = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeRemark)
    .use(remarkGfm)
    .use(remarkContinuousOrderedLists)
    .use(remarkStringify, { bullet: '-', fences: true, emphasis: '_' });

const stripNonContent = (html: string): string =>
    html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<svg[\s\S]*?<\/svg>/gi, '')
        .replace(/<astro-island[\s\S]*?<\/astro-island>/gi, '')
        .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
        .replace(/<i\b[^>]*>[\s\S]*?<\/i>/gi, '')
        .replace(/<i\b[^>]*\/>/gi, '');

const decodeNamed = (s: string): string =>
    s
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#0?39;/g, "'")
        .replace(/&#x27;/gi, "'");

const decodeNumeric = (s: string): string =>
    s
        .replace(/&#x([0-9a-f]+);/gi, (_m, h) => {
            const n = parseInt(h, 16);
            return Number.isFinite(n) && n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : '';
        })
        .replace(/&#(\d+);/g, (_m, d) => {
            const n = parseInt(d, 10);
            return Number.isFinite(n) && n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : '';
        });

/** Convert an HTML fragment to clean markdown (without a document envelope). */
export async function htmlFragmentToMarkdown(html: string): Promise<string> {
    return decodeNumeric(String(await processor.process(stripNonContent(html))))
        .replace(/(\*\*|__)\s*\1/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

interface DocumentEnvelope {
    title: string;
    description?: string;
    markdown: string;
    sourceUrl: string;
}

/** Wrap converted markdown in the canonical `# title / > desc / --- Bron` envelope. */
export function wrapDocument({ title, description, markdown, sourceUrl }: DocumentEnvelope): string {
    const header = `# ${title}\n\n` + (description ? `> ${description}\n\n` : '');
    return `${header}${markdown}\n\n---\n\nBron: ${sourceUrl}\n`;
}

interface HtmlDocument {
    title: string;
    description?: string;
    bodyHtml: string;
    sourceUrl: string;
}

/** Build a full markdown document from an article's raw HTML body + metadata. */
export async function documentFromHtml({ title, description, bodyHtml, sourceUrl }: HtmlDocument): Promise<string> {
    return wrapDocument({ title, description, markdown: await htmlFragmentToMarkdown(bodyHtml), sourceUrl });
}

/** Build a markdown document by scraping a fully rendered HTML page (its <main>). */
export async function documentFromPage(html: string, sourceUrl: string): Promise<string> {
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    const body = mainMatch ? mainMatch[1] : html;
    const title = decodeNamed((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').trim());
    const description = decodeNamed(
        (html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] || '').trim(),
    );
    return wrapDocument({ title, description, markdown: await htmlFragmentToMarkdown(body), sourceUrl });
}

interface IntegrationData {
    name: string;
    summary: string;
    about?: string;
    faqs?: { q: string; a: string }[];
}

/** Build a markdown document for an integration from its structured JSON fields. */
export function integrationDocument(data: IntegrationData, sourceUrl: string, locale: 'nl' | 'en'): string {
    const heading = locale === 'en' ? `Connect ${data.name} to ShopLinkr` : `${data.name} koppelen aan ShopLinkr`;
    const faqHeading = locale === 'en' ? 'Frequently asked questions' : 'Veelgestelde vragen';
    const lines: string[] = [`# ${heading}`, '', `> ${data.summary}`, ''];
    if (data.about) lines.push(data.about, '');
    if (data.faqs && data.faqs.length) {
        lines.push(`## ${faqHeading}`, '');
        for (const f of data.faqs) lines.push(`### ${f.q}`, '', f.a, '');
    }
    lines.push('---', '', `Bron: ${sourceUrl}`);
    return lines.join('\n') + '\n';
}
