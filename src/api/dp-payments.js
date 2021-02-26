"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { requiredParameterError } = require("./api-errors");

// pay :: HttpApiClient -> (DigitalPayPaymentRequest) -> Promise DigitalPayPaymentResponse
const pay = (client) => (paymentRequest) => {
	if (!paymentRequest) {
		throw requiredParameterError("paymentRequest");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/payments",
			body: paymentRequest
		})
	);
};

// guestPayment :: HttpApiClient -> (DigitalPayPaymentRequest) -> Promise DigitalPayPaymentResponse
const guestPayment = (client) => (paymentRequest) => {
	if (!paymentRequest) {
		throw requiredParameterError("paymentRequest");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/guest/payments",
			body: paymentRequest
		})
	);
};

// complete :: HttpApiClient -> (DigitalPayCompletionRequest) -> Promise DigitalPayCompletionResponse
const complete = (client) => (completionRequest) => {
	if (!completionRequest) {
		throw requiredParameterError("completionRequest");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/completions",
			body: completionRequest
		})
	);
};

// voidPayment :: HttpApiClient -> (DigitalPayVoidRequest) -> Promise DigitalPayVoidResponse
const voidPayment = (client) => (voidRequest) => {
	if (!voidRequest) {
		throw requiredParameterError("voidRequest");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/voids",
			body: voidRequest
		})
	);
};

// refund :: HttpApiClient -> (DigitalPayRefundRequest) -> Promise DigitalPayRefundResponse
const refund = (client) => (refundRequest) => {
	if (!refundRequest) {
		throw requiredParameterError("refundRequest");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/refunds",
			body: refundRequest
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../types/api/DigitalPayApi/Payments').OpenPayApi} */
	return {
		pay: pay(client),
		guestPayment: guestPayment(client),
		complete: complete(client),
		voidPayment: voidPayment(client),
		refund: refund(client)
	};
};
