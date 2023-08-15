/**
 * Vite config for bundling.
 */
const path = require("path");
const scssPlugin = require("vite-plugin-sass");

/** @type {import('vite').UserConfig} */
export default {
	root: path.resolve(__dirname, "src"),
	publicDir: path.resolve(__dirname, 'public'),
	build: {
		outDir: path.resolve(__dirname, 'dist'),
		emptyOutDir: true,
	},
	plugins: [scssPlugin()],
	assetsInclude: ["favicon.svg", "favicon.ico", "public/*"],
};
