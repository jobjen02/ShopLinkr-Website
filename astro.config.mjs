// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
    site: 'https://shoplinkr.com',
    output: 'server',
    adapter: vercel(),
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
