// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://agentic15.github.io',
	base: '/knowledge-base',
	integrations: [
		starlight({
			title: 'Hosting & Infrastructure KB',
			description: '6,658 lessons across 176 categories — GPU infrastructure, AI hosting, web servers, payment systems, and more.',
			// logo: { text: '📚 Hosting & Infra KB' },
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/agentic15/knowledge-base' },
			],
			editLink: {
				baseUrl: 'https://github.com/agentic15/knowledge-base/edit/main/astro-site/',
			},
			sidebar: [
				{
					label: '📖 All Categories',
					items: [{ autogenerate: { directory: 'lessons', collapsed: true } }],
				},
			],
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'meta',
					attrs: { name: 'theme-color', content: '#1e293b' },
				},
			],
			lastUpdated: false,
			pagination: true,
		}),
	],
});
