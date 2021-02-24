"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");

const { addHeaders, HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { everydayPayWalletHeader } = require("../headers/everyday-pay-header");
const { fromCustomerPaymentRequestDTO } = require("../transformers/payment-request");
const { fromCustomerTransactionSummaryDTO } = require("../transformers/customer-transactions");
const { fromData } = require("../transformers/data");
const { requiredParameterError } = require("./api-errors");
const { toPaymentDetailsDTO } = require("../transformers/payment-details");

// getById :: HttpApiClient -> String -> Promise CustomerPaymentRequest
const getById = (client) => (paymentRequestId) => {
	if (!paymentRequestId) {
		throw requiredParameterError("paymentRequestId");
	}

	return asyncToPromise(pipeK(
		client,
		fromData(fromCustomerPaymentRequestDTO)
	)({
		method: HttpRequestMethod.GET,
		url: "/customer/payments/:paymentRequestId",
		pathParams: {
			paymentRequestId
		}
	}))
}

// getByQRCodeId :: HttpApiClient -> String -> Promise CustomerPaymentRequest
const getByQRCodeId = (client) => (qrCodeId) => {
	if (!qrCodeId) {
		throw requiredParameterError("qrCodeId");
	}

	return asyncToPromise(pipeK(
		client,
		fromData(fromCustomerPaymentRequestDTO)
	)({
		method: HttpRequestMethod.GET,
		url: "/customer/qr/:qrCodeId",
		pathParams: {
			qrCodeId
		}
	}))
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

	return asyncToPromise(pipeK(
		addHeaders(everydayPayWalletHeader(primaryInstrument.wallet)),
		client,
		fromData(fromCustomerTransactionSummaryDTO)
	)({
		method: HttpRequestMethod.PUT,
		url: "/customer/payments/:paymentRequestId",
		pathParams: {
			paymentRequestId
		},
		body: {
			data: toPaymentDetailsDTO(
				primaryInstrument,
				secondaryInstruments,
				clientReference,
				challengeResponses
			),
			meta: {}
		}
	}));
};

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerPaymentRequests').CustomerPaymentRequestsApi} */
	return {
		getById: getById(client),
		getByQRCodeId: getByQRCodeId(client),
		makePayment: makePayment(client)
	};
}
