"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { fromData } = require("../transformers/data");
const { requiredParameterError } = require("./api-errors");
const {
	fromPaymentAgreementsDTO,
	fromPaymentAgreementDTO
} = require("../transformers/payment-agreements");

// list :: HttpApiClient -> () -> Promise PaymentAgreements
const list = (client) => () => {
	return asyncToPromise(
		pipeK(
			client,
			fromData(fromPaymentAgreementsDTO)
		)({
			method: HttpRequestMethod.GET,
			url: "/instore/customer/payments/agreements"
		})
	);
};

// getById :: HttpApiClient -> (String) -> Promise PaymentAgreement
const getById = (client) => (paymentToken) => {
	if (!paymentToken) {
		throw requiredParameterError("paymentToken");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromPaymentAgreementDTO)
		)({
			method: HttpRequestMethod.GET,
			url: "/instore/customer/payments/agreements/:paymentToken",
			pathParams: {
				paymentToken
			}
		})
	);
};

// create :: HttpApiClient -> (CreatePaymentAgreementRequest, [ChallengeResponse]?) -> Promise PaymentAgreements
const create = (client) => (createPaymentAgreementRequest, challengeResponses) => {
	if (!createPaymentAgreementRequest) {
		throw requiredParameterError("createPaymentAgreementRequest");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromPaymentAgreementDTO)
		)({
			method: HttpRequestMethod.POST,
			url: "/instore/customer/payments/agreements",
			body: {
				data: createPaymentAgreementRequest,
				meta: {
					challengeResponses: challengeResponses ? challengeResponses : []
				}
			}
		})
	);
};

// update :: HttpApiClient -> (String, UpdatePaymentAgreementRequest, [ChallengeResponse]?) -> Promise PaymentAgreements
const update = (client) => (
	paymentToken,
	updatePaymentAgreementRequest,
	challengeResponses
) => {
	if (!paymentToken) {
		throw requiredParameterError("paymentToken");
	}

	if (!updatePaymentAgreementRequest) {
		throw requiredParameterError("updatePaymentAgreementRequest");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromPaymentAgreementDTO)
		)({
			method: HttpRequestMethod.POST,
			url: "/instore/customer/payments/agreements/:paymentToken",
			pathParams: {
				paymentToken
			},
			body: {
				data: updatePaymentAgreementRequest,
				meta: {
					challengeResponses: challengeResponses ? challengeResponses : []
				}
			}
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerPaymentAgreements').CustomerPaymentAgreementsApi} */
	return {
		list: list(client),
		getById: getById(client),
		create: create(client),
		update: update(client)
	};
};
