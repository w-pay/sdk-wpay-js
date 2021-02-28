"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { requiredParameterError } = require("../api-errors");

const deleteRoute = (client) => (paymentInstrumentId) => {
	if (!paymentInstrumentId) {
		throw requiredParameterError("paymentInstrumentId");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.DELETE,
			url: "/instruments/:paymentInstrumentId",
			pathParams: {
				paymentInstrumentId
			}
		})
	);
};

const importRoute = (client) => (request) => {
	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/instruments/import",
			body: request
		})
	);
};

const verify = (client) => (request) => {
	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/instruments/verify",
			body: request
		})
	);
};

const getList = (client) => () => {
	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.GET,
			url: "/instruments"
		})
	);
};

const postList = (client) => (request) => {
	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/instruments",
			body: request
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../../types/api/WalletManagement/Instruments').Instruments} */
	return {
		import: importRoute(client),
		verify: verify(client),
		delete: deleteRoute(client),
		getList: getList(client),
		postList: postList(client)
	};
};
