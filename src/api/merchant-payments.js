"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const chain = require("crocks/pointfree/chain");
const map = require("crocks/pointfree/map");
const mapProps = require("crocks/helpers/mapProps");
const pipe = require("crocks/helpers/pipe");
const resultToAsync = require("crocks/Async/resultToAsync");

const { HttpRequestMethod } = require("@sdk-creator/http-api-client");

const { fromBasketDTO } = require("../transformers/basket");
const { fromDynamicPayloadDTO } = require("../transformers/dynamic-payload");
const { fromQrDTO } = require("../transformers/qr-code");
const { fromTransactionSummaryDTO } = require("../transformers/transaction-summary");
const { getPropOrError } = require("../helpers/props");
const { optionalParam, params } = require("../helpers/params");
const { requiredParameterError } = require("./api-errors");
const { toBasketDTO } = require("../transformers/basket");
const { toDate } = require("../helpers/props");
const { toDynamicPayloadDTO } = require("../transformers/dynamic-payload");

const listPayments = (client) => (type, page, pageSize) => {
	return pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(mapProps({
				payments: map(mapProps({
					expiryTime: toDate
				}))
			})),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.GET,
		url: "/merchant/payments",
		queryParams: params([
			optionalParam("type", type),
			optionalParam("page", page),
			optionalParam("pageSize", pageSize)
		])
	})
}

const createPaymentRequest = (client) => (paymentRequest) => {
	if (!paymentRequest) {
		throw requiredParameterError("paymentRequest");
	}

	const data = mapProps({
		basket: toBasketDTO,
		posPayload: toDynamicPayloadDTO,
		merchantPayload: toDynamicPayloadDTO
	}, paymentRequest);

	return pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(mapProps({
				qr: fromQrDTO
			})),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.POST,
		url: "/merchant/payments",
		body: {
			data,
			meta: {}
		}
	})
};

const getPaymentRequestDetailsBy = (client) => (paymentRequestId) => {
	if (!paymentRequestId) {
		throw requiredParameterError("paymentRequestId")
	}

	return pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(mapProps({
				expiryTime: toDate,
				basket: fromBasketDTO,
				posPayload: fromDynamicPayloadDTO,
				merchantPayload: fromDynamicPayloadDTO
			})),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.GET,
		url: "/merchant/payments/:paymentRequestId",
		pathParams: {
			paymentRequestId
		}
	})
}

const deletePaymentRequest = (client) => (paymentRequestId) => {
	if (!paymentRequestId) {
		throw requiredParameterError("paymentRequestId");
	}

	return pipe(
		client,
		asyncToPromise
	)({
		method: HttpRequestMethod.DELETE,
		url: "/merchant/payments/paymentRequestId",
		pathParams: {
			paymentRequestId
		}
	})
}

const refundTransaction = (client) => (transactionId, refundDetails) => {
	if (!transactionId) {
		throw requiredParameterError("transactionId");
	}

	if (!refundDetails) {
		throw requiredParameterError("refundDetails");
	}

	return pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(fromTransactionSummaryDTO),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.POST,
		url: "/merchant/transactions/:transactionId/refund",
		pathParams: {
			transactionId
		},
		body: {
			data: refundDetails
		},
		meta: {}
	})
}

module.exports = (client) => {
	/** @implements {import('../../types/api/MerchantPayments').MerchantPaymentsApi} */
	return {
		listPayments: listPayments(client),
		createPaymentRequest: createPaymentRequest(client),
		getPaymentRequestDetailsBy: getPaymentRequestDetailsBy(client),
		deletePaymentRequest: deletePaymentRequest(client),
		refundTransaction: refundTransaction(client)
	};
}
