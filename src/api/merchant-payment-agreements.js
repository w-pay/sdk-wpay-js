"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { fromData } = require("../transformers/data");
const { requiredParameterError } = require("./api-errors");
const { fromPaymentAgreementDTO } = require("../transformers/payment-agreements");

// delete :: HttpApiClient -> (String) -> Promise void
const deletePaymentAgreement = (client) => (paymentToken) => {
	if (!paymentToken) {
		throw requiredParameterError("paymentToken");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.DELETE,
			url: "/instore/customer/payments/agreements/:paymentToken",
			pathParams: {
				paymentToken
			}
		})
	);
};

// charge :: HttpApiClient -> (String, ChargePaymentAgreementRequest) -> Promise DigitalPayPaymentAgreementResponse
const charge = (client) => (paymentToken, chargePaymentAgreementRequest) => {
	if (!paymentToken) {
		throw requiredParameterError("paymentToken");
	}

	if (!chargePaymentAgreementRequest) {
		throw requiredParameterError("chargePaymentAgreementRequest");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromPaymentAgreementDTO)
		)({
			method: HttpRequestMethod.PUT,
			url: "/instore/customer/payments/agreements/:paymentToken",
			pathParams: {
				paymentToken
			},
			body: chargePaymentAgreementRequest
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../types/api/MerchantPaymentAgreements').MerchantPaymentAgreementsApi} */
	return {
		delete: deletePaymentAgreement(client),
		charge: charge(client)
	};
};
