const path = require("path");

const common = require("../karma.config.common");

module.exports = function (config) {
	config.set({
		...common,
		files: [
			path.join(common.rootDir, "dist", "wpay-wallet-sdk.all.js"),

			// resolved from the `baseDir`
			"customer/WPay.spec.ts",
			"merchant/WPay.spec.ts"
		]
	});
};
