// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import { readFileSync, readdirSync } from 'node:fs';
import nodePath from 'node:path';
import { fileURLToPath } from 'node:url';
import { redirects } from './src/data/redirects.mjs';

// The content routes (blog/guide/support/integration + support categories) are
// server-rendered, so @astrojs/sitemap can't auto-discover them. We enumerate
// every content URL from the source files here and feed them as `customPages`,
// and build a pathname -> ISO date map for <lastmod> in the same pass.
const ORIGIN = 'https://shoplinkr.com';
const CONTENT_DIR = fileURLToPath(new URL('./src/content', import.meta.url));

function walkMarkdown(dir) {
    const files = [];
    let entries;
    try {
        entries = readdirSync(dir, { withFileTypes: true });
    } catch {
        return files;
    }
    for (const entry of entries) {
        const full = nodePath.join(dir, entry.name);
        if (entry.isDirectory()) files.push(...walkMarkdown(full));
        else if (entry.name.endsWith('.md')) files.push(full);
    }
    return files;
}

function frontmatter(file) {
    const m = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
    return m ? m[1] : '';
}
function fmField(block, key) {
    const m = block.match(new RegExp(`^${key}:\\s*["']?([\\w./:+-]+)["']?`, 'm'));
    return m ? m[1] : null;
}
function fmDate(block) {
    // Freshest first: a real revision (updatedAt / support's lastUpdated) wins
    // over the original publish date for <lastmod>.
    const v = fmField(block, 'updatedAt') ?? fmField(block, 'lastUpdated') ?? fmField(block, 'publishedAt');
    if (!v) return null;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function buildContent() {
    const lastmod = {};
    const urls = new Set();
    const add = (path, date) => { urls.add(path); if (date) lastmod[path] = date; };

    // Article collections (markdown body).
    const articleDirs = [
        { dir: 'blogs', toPath: (s) => `/blogs/${s}` },
        { dir: 'blogs-en', toPath: (s) => `/en/blog/${s}` },
        { dir: 'seo', toPath: (s) => `/${s}` },
        { dir: 'seo-en', toPath: (s) => `/en/${s}` },
        { dir: 'support', toPath: (s) => `/support/${s}` },
        { dir: 'support-en', toPath: (s) => `/en/support/${s}` },
    ];
    for (const { dir, toPath } of articleDirs) {
        for (const file of walkMarkdown(nodePath.join(CONTENT_DIR, dir))) {
            add(toPath(nodePath.basename(file, '.md')), fmDate(frontmatter(file)));
        }
    }

    // Support category + subcategory pages, derived from the articles' frontmatter.
    for (const { dir, base } of [
        { dir: 'support', base: '/support/categorieen' },
        { dir: 'support-en', base: '/en/support/categories' },
    ]) {
        for (const file of walkMarkdown(nodePath.join(CONTENT_DIR, dir))) {
            const block = frontmatter(file);
            const cat = fmField(block, 'category');
            const sub = fmField(block, 'subcategory');
            if (cat) add(`${base}/${cat}`);
            if (cat && sub) add(`${base}/${cat}/${sub}`);
        }
    }

    // Integration detail pages (JSON).
    for (const { dir, toPath } of [
        { dir: 'integrations', toPath: (s) => `/integraties/${s}` },
        { dir: 'integrations-en', toPath: (s) => `/en/integrations/${s}` },
    ]) {
        let files = [];
        try { files = readdirSync(nodePath.join(CONTENT_DIR, dir)).filter((f) => f.endsWith('.json')); } catch {}
        for (const f of files) {
            const slug = JSON.parse(readFileSync(nodePath.join(CONTENT_DIR, dir, f), 'utf8')).slug;
            if (slug) add(toPath(slug));
        }
    }

    // Customer story detail pages (slugs read from the TS data file). Each story
    // exists in both locales, so emit both the NL and EN URL.
    try {
        const storiesSrc = readFileSync(fileURLToPath(new URL('./src/data/customerStories.ts', import.meta.url)), 'utf8');
        for (const m of storiesSrc.matchAll(/slug:\s*'([a-z0-9-]+)'/g)) {
            add(`/referenties/${m[1]}`);
            add(`/en/customer-stories/${m[1]}`);
        }
    } catch {}

    return { lastmod, customPages: [...urls].map((p) => `${ORIGIN}${p}`) };
}

const { lastmod: lastmodByPath, customPages: contentCustomPages } = buildContent();

export default defineConfig({
    site: 'https://shoplinkr.com',
    output: 'server',
    // One canonical URL form: /x, never /x/. The Vercel adapter 308-redirects the
    // slashed variant and the generated sitemap emits slash-free URLs, so /prijzen
    // and /prijzen/ stop being two indexable soft-duplicates.
    trailingSlash: 'never',
    adapter: vercel(),
    redirects,
    i18n: {
        locales: ['nl', 'en'],
        defaultLocale: 'nl',
        routing: {
            prefixDefaultLocale: false,
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [
        vue(),
        mdx(),
        sitemap({
            // The @astrojs/sitemap i18n option only prefix-swaps (/prijzen -> /en/prijzen),
            // which cannot map our translated slugs (/prijzen <-> /en/pricing), so it emitted
            // hreflang alternates for only a handful of same-slug pages and none for the rest.
            // A partial, mostly-wrong alternate set is worse than none, and the in-<head>
            // hreflang (built from the routes map in BaseHead) is already complete and correct,
            // so that stays the single source of truth for hreflang.
            // Server-rendered content routes aren't auto-discovered; add them.
            customPages: contentCustomPages,
            filter: (page) => !page.includes('/404'),
            serialize(item) {
                const rawPath = new URL(item.url).pathname.replace(/\/$/, '') || '/';
                const lastmod = lastmodByPath[rawPath];
                if (lastmod) item = { ...item, lastmod };

                // Strip the /en prefix AND any trailing slash so the exact-match tests below
                // (e.g. '/prijzen', '/pricing', '/') fire for every URL variant.
                const path = new URL(item.url).pathname.replace(/^\/en(?=\/|$)/, '').replace(/\/$/, '') || '/';

                if (path === '/') {
                    return {
                        ...item,
                        priority: 1.0,
                        changefreq: 'weekly',
                    };
                }

                if (path.includes('/functionaliteiten') || path.includes('/features') || path.includes('/integraties') || path.includes('/integrations') || path === '/prijzen' || path === '/pricing') {
                    return {
                        ...item,
                        priority: 0.9,
                        changefreq: 'weekly',
                    };
                }

                if (path.includes('/blogs/') || path.includes('/blog/') || path.includes('/support/')) {
                    return {
                        ...item,
                        priority: 0.7,
                        changefreq: 'monthly',
                    };
                }

                if (path.includes('/cookies')) {
                    return {
                        ...item,
                        priority: 0.3,
                        changefreq: 'yearly',
                    };
                }

                return {
                    ...item,
                    priority: 0.6,
                    changefreq: 'monthly',
                };
            },
        }),
    ],
});
