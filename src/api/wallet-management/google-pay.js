"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { requiredParameterError } = require("../api-errors");

const update = (client) => (paymentToken, request) => {
    if (!paymentToken) {
		throw requiredParameterError("paymentToken");
	}
    
	return asyncToPromise(
		pipeK(
			client
		)({
			method: HttpRequestMethod.POST,
			url: "/googlepay/tokenize/:paymentToken",
			pathParams: {
				paymentToken
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
			url: "/googlepay/tokenize",
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
			url: "/guest/googlepay/tokenize",
            body: request
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../types/api/WalletManagement/GooglePay').GooglePay} */
	return {
		tokenize: tokenize(client),
        guestTokenize: guestTokenize(client),
		update: update(client)
    };
};
