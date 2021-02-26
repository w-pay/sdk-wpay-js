"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { requiredParameterError } = require("./api-errors");

// pay :: HttpApiClient -> (OpenPayPaymentRequest) -> Promise OpenPayPaymentResponse
const pay = (client) => (paymentRequest) => {
	if (!paymentRequest) {
		throw requiredParameterError("paymentRequest");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/openpay/payments",
			body: paymentRequest
		})
	);
};

// complete :: HttpApiClient -> (OpenPayCompletionRequest) -> Promise OpenPayCompletionResponse
const complete = (client) => (completionRequest) => {
	if (!completionRequest) {
		throw requiredParameterError("completionRequest");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/openpay/completions",
			body: completionRequest
		})
	);
};

// void :: HttpApiClient -> (OpenPayVoidRequest) -> Promise OpenPayVoidResponse
const voidPayment = (client) => (voidRequest) => {
	if (!voidRequest) {
		throw requiredParameterError("voidRequest");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/openpay/voids",
			body: voidRequest
		})
	);
};

// refund :: HttpApiClient -> (OpenPayRefundRequest) -> Promise OpenPayRefundResponse
const refund = (client) => (refundRequest) => {
	if (!refundRequest) {
		throw requiredParameterError("refundRequest");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/openpay/refunds",
			body: refundRequest
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../types/api/DigitalPayApi/OpenPay').OpenPayApi} */
	return {
		pay: pay(client),
		complete: complete(client),
		voidPayment: voidPayment(client),
		refund: refund(client)
	};
};
