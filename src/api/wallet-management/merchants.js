"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const profile = (client) => () => {
	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.GET,
			url: "/merchants/profile"
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../../types/api/WalletManagement/Merchants').MerchantsApi} */
	return {
		profile: profile(client)
	};
};
