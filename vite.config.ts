/**
 * Vite config for bundling.
 */
import path from 'path';
import { UserConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default {
	root: path.resolve(__dirname, 'src'),
	publicDir: path.resolve(__dirname, 'public'),
	build: {
		emptyOutDir: true,
		manifest: true,
		rollupOptions: {
			input: path.resolve(__dirname, 'src/js/app.ts'),
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [],
} as UserConfig;
