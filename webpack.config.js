// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const webpack = require("webpack")

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
	plugins: [
		/*
		 * This is due to a bug in the npm "util" package that looks for the `process`
		 * object in the browser and can't find it.
		 *
		 * See https://github.com/browserify/node-util/issues/43
		 */
		new webpack.DefinePlugin({
			"process.env.NODE_DEBUG": JSON.stringify(process.env.NODE_DEBUG)
		})
	],
	resolve: {
		extensions: [ ".js" ],

		// we don't want a polyfill for Node streams.
		fallback: { "stream": false }
	}
};
