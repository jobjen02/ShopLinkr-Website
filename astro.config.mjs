// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

export default defineConfig({
    site: 'https://shoplinkr.com',
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
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
                const url = item.url;

                if (url === 'https://shoplinkr.com/') {
                    return {
                        ...item,
                        priority: 1.0,
                        changefreq: 'weekly',
                    };
                }

                if (url.includes('/functionaliteiten') || url.includes('/integraties') || url === 'https://shoplinkr.com/prijzen') {
                    return {
                        ...item,
                        priority: 0.9,
                        changefreq: 'weekly',
                    };
                }

                if (url.includes('/blogs/') || url.includes('/support/')) {
                    return {
                        ...item,
                        priority: 0.7,
                        changefreq: 'monthly',
                    };
                }

                if (url.includes('/privacy') || url.includes('/voorwaarden') || url.includes('/cookies')) {
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
