"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { fromCreatePaymentSessionResultDTO } = require("../transformers/payment-session");
const { fromData } = require("../transformers/data");
const { fromPaymentSessionDTO } = require("../transformers/payment-session");
const { requiredParameterError } = require("./api-errors");

const create = (client) => (request) => {
	if (!request) {
		throw requiredParameterError("request");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromCreatePaymentSessionResultDTO)
		)({
			method: HttpRequestMethod.POST,
			url: "/instore/merchant/payment/session",
			body: {
				data: request,
				meta: {}
			}
		})
	);
};

const getById = (client) => (paymentSessionId) => {
	if (!paymentSessionId) {
		throw requiredParameterError("paymentSessionId");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromPaymentSessionDTO)
		)({
			method: HttpRequestMethod.GET,
			url: "/instore/merchant/payment/session/:paymentSessionId",
			pathParams: {
				paymentSessionId
			}
		})
	);
};

const update = (client) => (paymentSessionId, session) => {
	if (!paymentSessionId) {
		throw requiredParameterError("paymentSessionId");
	}

	if (!session) {
		throw requiredParameterError("session");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/instore/merchant/payment/session/:paymentSessionId",
			pathParams: {
				paymentSessionId
			},
			body: {
				data: session,
				meta: {}
			}
		})
	);
};

const deletePaymentSession = (client) => (paymentSessionId) => {
	if (!paymentSessionId) {
		throw requiredParameterError("paymentSessionId");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.DELETE,
			url: "/instore/merchant/payment/session/:paymentSessionId",
			pathParams: {
				paymentSessionId
			}
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../types/api/MerchantPaymentSessions').MerchantPaymentSessionsApi} */
	return {
		create: create(client),
		getById: getById(client),
		update: update(client),
		delete: deletePaymentSession(client)
	};
};
