"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const initCapture = (client) => (request) => {
	return asyncToPromise(
		pipeK(
			client
		)({
			method: HttpRequestMethod.POST,
			url: "/cards/initcapture",
            body: request
		})
	);
};

const guestInitCapture = (client) => (request) => {
	return asyncToPromise(
		pipeK(
			client
		)({
			method: HttpRequestMethod.POST,
			url: "/guest/cards/initcapture",
            body: request
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../types/api/WalletManagement/Cards').Cards} */
	return {
		initCapture: initCapture(client),
		guestInitCapture: guestInitCapture(client)
    };
};
