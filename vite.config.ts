/**
 * Vite config for bundling.
 */
const path = require("path");

/** @type {import('vite').UserConfig} */
export default {
	root: path.resolve(__dirname, "src"),
	publicDir: path.resolve(__dirname, 'public'),
	build: {
		outDir: path.resolve(__dirname, 'dist'),
		emptyOutDir: true,
		manifest: true,
		rollupOptions: {
			input: [
				path.resolve(__dirname, 'src/scss/app.scss'),
				path.resolve(__dirname, 'src/js/app.ts'),
			],
			output: {
				dir: path.resolve(__dirname, 'dist'),
			},
		}
	},
	assetsInclude: ["favicon.svg", "favicon.ico", "public/*"],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		}
	},
	// css: {
	// 	preprocessorOptions: {
	// 		scss: {
	// 			additionalData: `
	// 			@import "@/scss/abstracts/_functions.scss";
	// 			@import "@/scss/abstracts/_mixins.scss";
	// 			@import "@/scss/abstracts/_variables.scss";
	// 			`
	// 		}
	// 	}
	// },
};
