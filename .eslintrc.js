module.exports = {
	extends: [
		"eslint:recommended",
		"prettier"
	],
	env: {
		node: true,
		es2020: true
	},
	rules: {
		"no-unused-vars": [ "error" , { args: "all", argsIgnorePattern: "^_$" } ]
	}
}
