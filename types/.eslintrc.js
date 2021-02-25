module.exports = {
	parserOptions: {
		parser: "@typescript-eslint/parser"
	},
	plugins: ["@typescript-eslint"],
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
	env: {
		node: true
	},
	rules: {
		"@typescript-eslint/no-explicit-any": "off"
	}
};
