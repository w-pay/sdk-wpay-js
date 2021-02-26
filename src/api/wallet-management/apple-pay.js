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
		pipeK(
			client
		)({
			method: HttpRequestMethod.POST,
			url: "/applepay/tokenize/:paymentInstrumentId",
			pathParams: {
				paymentInstrumentId
			},
			body: request
		})
	);
};

const tokenize = (client) => (request) => {
	return asyncToPromise(
		pipeK(
			client
		)({
			method: HttpRequestMethod.POST,
			url: "/applepay/tokenize",
			body: request
		})
	);
};

const guestTokenize = (client) => (request) => {
	return asyncToPromise(
		pipeK(
			client
		)({
			method: HttpRequestMethod.POST,
			url: "/guest/applepay/tokenize",
			body: request
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../types/api/WalletManagement/ApplePay').ApplePay} */
	return {
		tokenize: tokenize(client),
		guestTokenize: guestTokenize(client),
		update: update(client)
    };
};
