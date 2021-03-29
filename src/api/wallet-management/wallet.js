"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const deleteRoute = (client) => (request) => {
	return asyncToPromise(
		pipeK(client)({
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
