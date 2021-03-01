"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { requiredParameterError } = require("../api-errors");

const update = (client) => (paymentInstrumentId, request) => {
	if (!paymentInstrumentId) {
		throw requiredParameterError("paymentInstrumentId");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/androidpay/tokenize/:paymentInstrumentId",
			pathParams: {
				paymentInstrumentId
			},
			body: request
		})
	);
};

const tokenize = (client) => (request) => {
	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/androidpay/tokenize",
			body: request
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../../types/api/WalletManagement/AndroidPay').AndroidPayApi} */
	return {
		tokenize: tokenize(client),
		update: update(client)
	};
};
