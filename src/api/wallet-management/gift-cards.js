"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const tokenize = (client) => (request) => {
	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/giftcards/tokenize",
			body: request
		})
	);
};

const guestTokenize = (client) => (request) => {
	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/guest/giftcards/tokenize",
			body: request
		})
	);
};

const balance = (client) => (request) => {
	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/giftcards/balance",
			body: request
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../../types/api/WalletManagement/Giftcards').GiftcardsApi} */
	return {
		tokenize: tokenize(client),
		guestTokenize: guestTokenize(client),
		balance: balance(client)
	};
};
