"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const identity = require("crocks/combinators/identity");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

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
			fromData(identity)
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
			fromData(identity)
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
// makePayment :: HttpApiClient -> (String, String, Array, Boolean, String, PaymentPreferences, [ChallengeResponse]?, FraudPayload?, Boolean?, PaymentTransactionType?) -> Promise CustomerTransactionSummary
const makePayment = (client) => (
	paymentRequestId,
	primaryInstrument,
	secondaryInstruments,
	skipRollback,
	clientReference,
	preferences,
	challengeResponses,
	fraud,
	transactionType,
	allowPartialSuccess
) => {
	if (!paymentRequestId) {
		throw requiredParameterError("paymentRequestId");
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
					clientReference,
					preferences,
					transactionType,
					allowPartialSuccess
				),
				meta: {
					challengeResponses: challengeResponses ? challengeResponses : [],
					fraud
				}
			}
		})
	);
};

// makeImmediatePayment :: HttpApiClient -> (ImmediatePaymentRequest, [ChallengeResponse]?, FraudPayload?) -> Promise CustomerTransactionSummary
const makeImmediatePayment = (client) => (paymentRequest, challengeResponses, fraud) => {
	if (!paymentRequest) {
		throw requiredParameterError("paymentRequest");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromCustomerTransactionSummaryDTO)
		)({
			method: HttpRequestMethod.POST,
			url: "/instore/customer/payments",
			body: {
				data: paymentRequest,
				meta: {
					challengeResponses: challengeResponses ? challengeResponses : [],
					fraud
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
		makePayment: makePayment(client),
		makeImmediatePayment: makeImmediatePayment(client)
	};
};
