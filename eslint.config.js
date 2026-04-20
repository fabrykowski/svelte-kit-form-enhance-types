import { defineConfig } from 'eslint/config';
import svelteParser from 'svelte-eslint-parser';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default defineConfig({
	files: ['**/*.svelte'],
	ignores: ['.svelte-kit/**'],
	plugins: {
		'@typescript-eslint': ts.plugin
	},
	languageOptions: {
		parser: svelteParser,
		parserOptions: {
			projectService: true,
			extraFileExtensions: ['.svelte'],
			parser: ts.parser,
			svelteConfig
		}
	},
	rules: {
		'@typescript-eslint/no-misused-promises': 'error'
	}
});
