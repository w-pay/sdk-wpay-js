"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { requiredParameterError } = require("./api-errors");

// create :: HttpApiClient -> (DigitalPayCreatePaymentAgreementRequest) -> Promise DigitalPayPaymentAgreementResponse
const create = (client) => (createPaymentAgreementRequest) => {
	if (!createPaymentAgreementRequest) {
		throw requiredParameterError("createPaymentAgreementRequest");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/paymentagreements",
			body: createPaymentAgreementRequest
		})
	);
};

// update :: HttpApiClient -> (String, DigitalPayUpdatePaymentAgreementRequest) -> Promise DigitalPayPaymentAgreementResponse
const update = (client) => (paymentToken, updatePaymentAgreementRequest) => {
	if (!paymentToken) {
		throw requiredParameterError("paymentToken");
	}

	if (!updatePaymentAgreementRequest) {
		throw requiredParameterError("updatePaymentAgreementRequest");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/paymentagreements/:paymentToken",
			pathParams: {
				paymentToken
			},
			body: updatePaymentAgreementRequest
		})
	);
};

// delete :: HttpApiClient -> (String) -> Promise void
const deletePaymentAgreement = (client) => (paymentToken) => {
	if (!paymentToken) {
		throw requiredParameterError("paymentToken");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.DELETE,
			url: "/paymentagreements/:paymentToken",
			pathParams: {
				paymentToken
			}
		})
	);
};

// charge :: HttpApiClient -> (DigitalPayChargePaymentAgreementRequest) -> Promise DigitalPayPaymentAgreementResponse
const charge = (client) => (chargePaymentAgreementRequest) => {
	if (!chargePaymentAgreementRequest) {
		throw requiredParameterError("chargePaymentAgreementRequest");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/paymentagreements/charge",
			body: chargePaymentAgreementRequest
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../types/api/DigitalPayApi/PaymentAgreements').PaymentAgreementsApi} */
	return {
		create: create(client),
		update: update(client),
		delete: deletePaymentAgreement(client),
		charge: charge(client)
	};
};
