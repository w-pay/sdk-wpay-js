"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

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

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromCustomerPaymentRequestDTO)
		)({
			method: HttpRequestMethod.GET,
			url: "/instore/customer/payments/:paymentRequestId",
			pathParams: {
				paymentRequestId
			}
		})
	);
};

// getByQRCodeId :: HttpApiClient -> String -> Promise CustomerPaymentRequest
const getByQRCodeId = (client) => (qrCodeId) => {
	if (!qrCodeId) {
		throw requiredParameterError("qrCodeId");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromCustomerPaymentRequestDTO)
		)({
			method: HttpRequestMethod.GET,
			url: "/instore/customer/qr/:qrCodeId",
			pathParams: {
				qrCodeId
			}
		})
	);
};

// returns an uncurried function for data so that defaults can be omitted
// makePayment :: HttpApiClient -> (String, String, Array, Boolean, String, Array) -> Promise CustomerTransactionSummary
const makePayment = (client) => (
	paymentRequestId,
	primaryInstrument,
	secondaryInstruments,
	skipRollback,
	clientReference,
	challengeResponses
) => {
	if (!paymentRequestId) {
		throw requiredParameterError("paymentRequestId");
	}

	if (!primaryInstrument) {
		throw requiredParameterError("primaryInstrument");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromCustomerTransactionSummaryDTO)
		)({
			method: HttpRequestMethod.PUT,
			url: "/instore/customer/payments/:paymentRequestId",
			pathParams: {
				paymentRequestId
			},
			body: {
				data: toPaymentDetailsDTO(
					primaryInstrument,
					secondaryInstruments,
					skipRollback,
					clientReference
				),
				meta: {
					challengeResponses: challengeResponses ? challengeResponses : []
				}
			}
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerPaymentRequests').CustomerPaymentRequestsApi} */
	return {
		getById: getById(client),
		getByQRCodeId: getByQRCodeId(client),
		makePayment: makePayment(client)
	};
};
