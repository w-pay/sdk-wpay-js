"use strict";

const assign = require("crocks/helpers/assign");
const asyncToPromise = require("crocks/Async/asyncToPromise");
const fanout = require("crocks/Pair/fanout");
const identity = require("crocks/combinators/identity");
const liftA2 = require("crocks/helpers/liftA2");
const merge = require("crocks/pointfree/merge");
const pipe = require("crocks/helpers/pipe");
const pipeK = require("crocks/helpers/pipeK");

const { addHeaders, HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { everydayPayWalletHeader } = require("../headers/everyday-pay-header");
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

const getByToken = (client) => (paymentToken, wallet, publicKey) => {
	if (!paymentToken) {
		throw requiredParameterError("paymentToken");
	}

	if (!wallet) {
		throw requiredParameterError("wallet");
	}

	return asyncToPromise(
		pipeK(
			addHeaders(everydayPayWalletHeader(wallet)),
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

const list = (client) => (wallet) => {
	if (!wallet) {
		throw requiredParameterError("wallet");
	}

	return asyncToPromise(
		pipeK(
			addHeaders(everydayPayWalletHeader(wallet)),
			client,
			fromData(fromWalletContentsDTO)
		)({
			method: HttpRequestMethod.GET,
			url: "/instore/customer/instruments"
		})
	);
};

const deleteInstrument = (client) => (instrument) => {
	if (!instrument) {
		throw requiredParameterError("instrument");
	}

	return asyncToPromise(
		pipeK(
			addHeaders(everydayPayWalletHeader(instrument.wallet)),
			client
		)({
			method: HttpRequestMethod.DELETE,
			url: "/instore/customer/instruments/:paymentInstrumentId",
			pathParams: {
				paymentInstrumentId: instrument.paymentInstrumentId
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
			addHeaders(everydayPayWalletHeader(instrument.wallet)),
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
