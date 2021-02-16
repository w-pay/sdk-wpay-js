// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
	entry: {
		all: path.join(__dirname, "/src/index.js"),
		customer: path.join(__dirname, "/src/customer-index.js"),
		merchant: path.join(__dirname, "/src/merchant-index.js")
	},
	output: {
		globalObject: "this",
		path: path.join(__dirname, "dist"),
		filename: "wpay-wallet-sdk.[name].js",
		library: "WPay",
		libraryTarget: "umd"
	},
	resolve: {
		extensions: [ ".js" ],

		// we don't want a polyfill for Node streams.
		fallback: { "stream": false }
	}
};
