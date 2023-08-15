module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
	},
	extends: ["eslint:recommended", "plugin:prettier/recommended"], // Use plugin:prettier/recommended
	parserOptions: {
		ecmaVersion: 2021,
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
	},
};
