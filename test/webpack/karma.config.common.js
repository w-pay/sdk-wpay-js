const path = require("path");

const rootDir = path.resolve(__dirname, "../..");

module.exports = {
	/*
	 * This looks weird; because it is. If karma is run from the root project dir, the `basePath`
	 * base will be the dir of the karma config file eg: customer/karma.config.js
	 * which includes/uses this common config.
	 *
	 * Therefore the basePath needs to be relative to the dir of the config file, so that when
	 * tsc is run, the `tsconfig.json` will be found and used.
	 */
	basePath: "../",
	rootDir,
	frameworks: ["mocha", "karma-typescript"],
	preprocessors: {
		"**/*.ts": "karma-typescript"
	},
	reporters: ["progress", "karma-typescript"],
	browsers: ["jsdom"]
};
