// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
	entry: {
		all: path.join(__dirname, "/src/index.ts"),
		customer: path.join(__dirname, "/src/customer-index.ts"),
		merchant: path.join(__dirname, "/src/merchant-index.ts")
	},
	output: {
		globalObject: "this",
		path: path.join(__dirname, "dist"),
		filename: "wpay-wallet-sdk.[name].js",
		library: "WPay",
		libraryTarget: "umd"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: [/node_modules/, /test/]
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	}
};
