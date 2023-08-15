/**
 * Vite config for bundling.
 */
const path = require("path");
const scssPlugin = require("vite-plugin-sass");

/** @type {import('vite').UserConfig} */
export default {
	root: path.resolve(__dirname, "src"),
	build: {
		outDir: path.resolve(__dirname, "dist"),
	},
	plugins: [scssPlugin()],
};
