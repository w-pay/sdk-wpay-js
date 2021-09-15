"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { fromCreatePaymentRequestResultDTO } = require("../transformers/payment-request");
const { fromData } = require("../transformers/data");
const {
	fromMerchantPaymentDetailsDTO,
	fromMerchantPaymentSummariesDTO
} = require("../transformers/merchant-payments");
const { fromMerchantTransactionSummaryDTO } = require("../transformers/merchant-transactions");
const { optionalParam, params } = require("../helpers/params");
const { requiredParameterError } = require("./api-errors");

const listPayments = (client) => (type, page, pageSize) => {
	return asyncToPromise(
		pipeK(
			client,
			fromData(fromMerchantPaymentSummariesDTO)
		)({
			method: HttpRequestMethod.GET,
			url: "/instore/merchant/payments",
			queryParams: params([
				optionalParam("type", type),
				optionalParam("page", page),
				optionalParam("pageSize", pageSize)
			])
		})
	);
};

const createPaymentRequest = (client) => (paymentRequest) => {
	if (!paymentRequest) {
		throw requiredParameterError("paymentRequest");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromCreatePaymentRequestResultDTO)
		)({
			method: HttpRequestMethod.POST,
			url: "/instore/merchant/payments",
			body: {
				data: paymentRequest,
				meta: {}
			}
		})
	);
};

const getPaymentRequestDetailsBy = (client) => (paymentRequestId) => {
	if (!paymentRequestId) {
		throw requiredParameterError("paymentRequestId");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromMerchantPaymentDetailsDTO)
		)({
			method: HttpRequestMethod.GET,
			url: "/instore/merchant/payments/:paymentRequestId",
			pathParams: {
				paymentRequestId
			}
		})
	);
};

const deletePaymentRequest = (client) => (paymentRequestId) => {
	if (!paymentRequestId) {
		throw requiredParameterError("paymentRequestId");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.DELETE,
			url: "/instore/merchant/payments/paymentRequestId",
			pathParams: {
				paymentRequestId
			}
		})
	);
};

// refundTransaction :: HttpApiClient -> (String, TransactionRefundDetails) -> Promise MerchantTransactionSummary
const refundTransaction = (client) => (transactionId, refundDetails) => {
	if (!transactionId) {
		throw requiredParameterError("transactionId");
	}

	if (!refundDetails) {
		throw requiredParameterError("refundDetails");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromMerchantTransactionSummaryDTO)
		)({
			method: HttpRequestMethod.POST,
			url: "/instore/merchant/transactions/:transactionId/refund",
			pathParams: {
				transactionId
			},
			body: {
				data: refundDetails,
				meta: {}
			}
		})
	);
};

// completeTransaction :: HttpApiClient -> (String, TransactionCompletionDetails) -> Promise MerchantTransactionSummary
const completeTransaction = (client) => (transactionId, completionDetails) => {
	if (!transactionId) {
		throw requiredParameterError("transactionId");
	}

	if (!completionDetails) {
		throw requiredParameterError("completionDetails");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromMerchantTransactionSummaryDTO)
		)({
			method: HttpRequestMethod.POST,
			url: "/instore/merchant/transactions/:transactionId/completion",
			pathParams: {
				transactionId
			},
			body: {
				data: completionDetails,
				meta: {}
			}
		})
	);
};

// voidTransaction :: HttpApiClient -> (String, TransactionVoidDetails) -> Promise MerchantTransactionSummary
const voidTransaction = (client) => (transactionId, voidDetails) => {
	if (!transactionId) {
		throw requiredParameterError("transactionId");
	}

	if (!voidDetails) {
		throw requiredParameterError("voidDetails");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromMerchantTransactionSummaryDTO)
		)({
			method: HttpRequestMethod.POST,
			url: "/instore/merchant/transactions/:transactionId/void",
			pathParams: {
				transactionId
			},
			body: {
				data: voidDetails,
				meta: {}
			}
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../types/api/MerchantPayments').MerchantPaymentsApi} */
	return {
		listPayments: listPayments(client),
		createPaymentRequest: createPaymentRequest(client),
		getPaymentRequestDetailsBy: getPaymentRequestDetailsBy(client),
		deletePaymentRequest: deletePaymentRequest(client),
		refundTransaction: refundTransaction(client),
		completeTransaction: completeTransaction(client),
		voidTransaction: voidTransaction(client)
	};
};
