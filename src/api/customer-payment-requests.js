"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const chain = require("crocks/pointfree/chain");
const map = require("crocks/pointfree/map");
const mapProps = require("crocks/helpers/mapProps");
const pipe = require("crocks/helpers/pipe");
const resultToAsync = require("crocks/Async/resultToAsync");

const { addHeaders, HttpRequestMethod } = require("@sdk-creator/http-api-client");

const { everydayPayWalletHeader } = require("../headers/everyday-pay-header");
const { fromBasketDTO } = require("../transformers/basket");
const { fromTransactionSummaryDTO } = require("../transformers/transaction-summary");
const { getPropOrError } = require("../helpers/props");
const { requiredParameterError } = require("./api-errors");

// toSecondaryInstrument :: SecondaryPaymentInstrument -> Object
const toSecondaryInstrument = (instrument) => ({
	instrumentId: instrument.paymentInstrumentId,
	amount: instrument.amount
});

// getById :: HttpApiClient -> String -> Promise CustomerPaymentRequest
const getById = (client) => (paymentRequestId) => {
	if (!paymentRequestId) {
		throw requiredParameterError("paymentRequestId");
	}

	return pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(mapProps({ basket: fromBasketDTO })),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.GET,
		url: "/customer/payments/:paymentRequestId",
		pathParams: {
			paymentRequestId
		}
	})
}

// getByQRCodeId :: HttpApiClient -> String -> Promise CustomerPaymentRequest
const getByQRCodeId = (client) => (qrCodeId) => {
	if (!qrCodeId) {
		throw requiredParameterError("qrCodeId");
	}

	return pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(mapProps({ basket: fromBasketDTO })),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.GET,
		url: "/customer/qr/:qrCodeId",
		pathParams: {
			qrCodeId
		}
	})
};

// returns an uncurried function for data so that defaults can be omitted
// makePayment :: HttpApiClient -> (String, PaymentInstrumentIdentifier, Array, String, Array) -> Promise CustomerTransactionSummary
const makePayment = (client) => (
	paymentRequestId,
	primaryInstrument,
	secondaryInstruments,
	clientReference,
	challengeResponses
) => {
	if (!paymentRequestId) {
		throw requiredParameterError("paymentRequestId");
	}

	if (!primaryInstrument) {
		throw requiredParameterError("primaryInstrument");
	}

	const body = {
		data: {
			primaryInstrumentId: primaryInstrument.paymentInstrumentId,
			secondaryInstruments: secondaryInstruments
				? secondaryInstruments.map(toSecondaryInstrument)
				: [],
			challengeResponses: challengeResponses ? challengeResponses : []
		},
		meta: {}
	};

	if (clientReference) {
		body.data.clientReference = clientReference;
	}

	return pipe(
		addHeaders(everydayPayWalletHeader(primaryInstrument.wallet)),
		chain(client),
		chain(pipe(
			getPropOrError("data"),
			map(fromTransactionSummaryDTO),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.PUT,
		url: "/customer/payments/:paymentRequestId",
		pathParams: {
			paymentRequestId
		},
		body: body
	});
};

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerPaymentRequests').CustomerPaymentRequestsApi} */
	return {
		getById: getById(client),
		getByQRCodeId: getByQRCodeId(client),
		makePayment: makePayment(client)
	};
}
