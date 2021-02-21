"use strict";

const { constantHeaders } = require("@api-sdk-creator/http-api-client");

const { Wallet } = require("../model/enums");
const { X_EVERYDAY_PAY_WALLET } = require("./header-names");

// everydayPayWalletHeader :: Wallet -> RequestHeaderFactory
const everydayPayWalletHeader = (wallet) =>
	constantHeaders({
		[X_EVERYDAY_PAY_WALLET]: (wallet === Wallet.EVERYDAY_PAY).toString()
	})

module.exports = {
	everydayPayWalletHeader
}
