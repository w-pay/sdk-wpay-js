"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod, addHeaders } = require("@api-sdk-creator/http-api-client");
const { everydayPayWalletHeader } = require("../../headers/everyday-pay-header");

const deleteRoute = (client) => (request) => {
	return asyncToPromise(
		pipeK(
			addHeaders(everydayPayWalletHeader(request.wallet)),
			client
		)({
			method: HttpRequestMethod.POST,
			url: "/wallet/delete",
			body: request
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../../types/api/WalletManagement/Wallet').WalletApi} */
	return {
		delete: deleteRoute(client)
	};
};
