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

// Build a pathname -> ISO date map from the content frontmatter so the sitemap
// can emit <lastmod>. A pathname that has no matching entry simply gets no
// lastmod (never a wrong date), so this is safe even if a route shape changes.
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

function frontmatterDate(file) {
    const fm = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) return null;
    const m = fm[1].match(/^(?:publishedAt|lastUpdated):\s*["']?([0-9T:.\-Z]+)["']?/m);
    if (!m) return null;
    const date = new Date(m[1]);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function buildLastmodMap() {
    const collections = [
        { dir: 'blogs', toPath: (slug) => `/blogs/${slug}` },
        { dir: 'blogs-en', toPath: (slug) => `/en/blog/${slug}` },
        { dir: 'seo', toPath: (slug) => `/${slug}` },
        { dir: 'seo-en', toPath: (slug) => `/en/${slug}` },
        { dir: 'support', toPath: (slug) => `/support/${slug}` },
        { dir: 'support-en', toPath: (slug) => `/en/support/${slug}` },
    ];
    const map = {};
    for (const { dir, toPath } of collections) {
        for (const file of walkMarkdown(nodePath.join(CONTENT_DIR, dir))) {
            const date = frontmatterDate(file);
            if (date) map[toPath(nodePath.basename(file, '.md'))] = date;
        }
    }
    return map;
}

const lastmodByPath = buildLastmodMap();

export default defineConfig({
    site: 'https://shoplinkr.com',
    output: 'server',
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
            i18n: {
                defaultLocale: 'nl',
                locales: {
                    nl: 'nl-NL',
                    en: 'en-US',
                },
            },
            filter: (page) => !page.includes('/404'),
            serialize(item) {
                const rawPath = new URL(item.url).pathname.replace(/\/$/, '') || '/';
                const lastmod = lastmodByPath[rawPath];
                if (lastmod) item = { ...item, lastmod };

                const path = new URL(item.url).pathname.replace(/^\/en(?=\/|$)/, '') || '/';

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
