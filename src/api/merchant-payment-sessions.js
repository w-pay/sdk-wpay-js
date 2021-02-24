"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const chain = require("crocks/pointfree/chain");
const map = require("crocks/pointfree/map");
const mapProps = require("crocks/helpers/mapProps");
const pipe = require("crocks/helpers/pipe");
const resultToAsync = require("crocks/Async/resultToAsync");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { fromDynamicPayloadDTO, toDynamicPayloadDTO } = require("../transformers/dynamic-payload");
const { fromCreatePaymentSessionResultDTO } = require("../transformers/payment-session");
const { getPropOrError } = require("../helpers/props");
const { requiredParameterError } = require("./api-errors");
const { toDate } = require("../helpers/props");

const fromPaymentSessionDTO = mapProps({
	expiryTime: toDate,
	merchantInfo: fromDynamicPayloadDTO,
	customerInfo: fromDynamicPayloadDTO
});

const create = (client) => (request) => {
	if (!request) {
		throw requiredParameterError("request");
	}

	return pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(fromCreatePaymentSessionResultDTO),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.POST,
		url: "/merchant/payment/session",
		body: {
			data: mapProps({
				merchantInfo: toDynamicPayloadDTO
			}, request),
			meta: {}
		}
	})
}

const getById = (client) => (paymentSessionId) => {
	if (!paymentSessionId) {
		throw requiredParameterError("paymentSessionId");
	}

	return pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(fromPaymentSessionDTO),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.GET,
		url: "/merchant/payment/session/:paymentSessionId",
		pathParams: {
			paymentSessionId
		}
	})
}

const update = (client) => (paymentSessionId, session) => {
	if (!paymentSessionId) {
		throw requiredParameterError("paymentSessionId");
	}

	if (!session) {
		throw requiredParameterError("session");
	}

	return pipe(
		client,
		asyncToPromise
	)({
		method: HttpRequestMethod.POST,
		url: "/merchant/payment/session/:paymentSessionId",
		pathParams: {
			paymentSessionId
		},
		body: {
			data: mapProps({
				merchantInfo: toDynamicPayloadDTO
			}, session),
			meta: {}
		}
	})
}

const deletePaymentSession = (client) => (paymentSessionId) => {
	if (!paymentSessionId) {
		throw requiredParameterError("paymentSessionId");
	}

	return pipe(
		client,
		asyncToPromise
	)({
		method: HttpRequestMethod.DELETE,
		url: "/merchant/payment/session/:paymentSessionId",
		pathParams: {
			paymentSessionId
		}
	})
}

module.exports = (client) => {
	/** @implements {import('../../types/api/MerchantPaymentSessions').MerchantPaymentSessionsApi} */
	return {
		create: create(client),
		getById: getById(client),
		update: update(client),
		delete: deletePaymentSession(client)
	};
}
