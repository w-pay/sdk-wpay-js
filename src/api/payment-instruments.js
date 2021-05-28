"use strict";

const assign = require("crocks/helpers/assign");
const asyncToPromise = require("crocks/Async/asyncToPromise");
const fanout = require("crocks/Pair/fanout");
const identity = require("crocks/combinators/identity");
const liftA2 = require("crocks/helpers/liftA2");
const merge = require("crocks/pointfree/merge");
const pipe = require("crocks/helpers/pipe");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { fromData } = require("../transformers/data");
const { fromEncryptedMeta } = require("../transformers/meta");
const {
	fromPaymentInstrumentDTO,
	fromWalletContentsDTO
} = require("../transformers/payment-instruments");
const { optionalParam, params } = require("../helpers/params");
const { requiredParameterError } = require("./api-errors");

/*
 * Merges any cipher text from the 'meta' into the result
 */
// fromGetByTokenResponse :: Object -> Async Error Object
const fromGetByTokenResponse = pipe(
	fanout(fromEncryptedMeta, fromData(fromPaymentInstrumentDTO)),
	merge(liftA2(assign))
);

const getByToken = (client) => (paymentToken, publicKey) => {
	if (!paymentToken) {
		throw requiredParameterError("paymentToken");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromGetByTokenResponse
		)({
			method: HttpRequestMethod.GET,
			url: "/instore/customer/instruments/:paymentToken",
			pathParams: {
				paymentToken
			},
			queryParams: params([optionalParam("publicKey", publicKey)])
		})
	);
};

const list = (client) => () => {
	return asyncToPromise(
		pipeK(
			client,
			fromData(fromWalletContentsDTO)
		)({
			method: HttpRequestMethod.GET,
			url: "/instore/customer/instruments"
		})
	);
};

const deleteInstrument = (client) => (paymentInstrumentId) => {
	if (!paymentInstrumentId) {
		throw requiredParameterError("paymentInstrumentId");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.DELETE,
			url: "/instore/customer/instruments/:paymentInstrumentId",
			pathParams: {
				paymentInstrumentId: paymentInstrumentId
			}
		})
	);
};

const initiateAddition = (client) => (instrument) => {
	if (!instrument) {
		throw requiredParameterError("instrument");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(identity)
		)({
			method: HttpRequestMethod.POST,
			url: "/instore/customer/instruments",
			body: {
				data: {
					clientReference: instrument.clientReference
				},
				meta: {}
			}
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../types/api/PaymentInstruments').PaymentInstrumentsApi} */
	return {
		getByToken: getByToken(client),
		list: list(client),
		delete: deleteInstrument(client),
		initiateAddition: initiateAddition(client)
	};
};
