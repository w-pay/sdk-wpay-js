"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const chain = require("crocks/pointfree/chain");
const map = require("crocks/pointfree/map");
const mapProps = require("crocks/helpers/mapProps");
const pipe = require("crocks/helpers/pipe");
const resultToAsync = require("crocks/Async/resultToAsync");

const { addHeaders, HttpRequestMethod } = require("@sdk-creator/http-api-client");

const { everydayPayWalletHeader } = require("../headers/everyday-pay-header");
const { fromDynamicPayloadDTO, toDynamicPayloadDTO } = require("../transformers/dynamic-payload");
const { getPropOrError } = require("../helpers/props");
const { requiredParameterError } = require("./api-errors");
const { toDate } = require("../helpers/props");

const fromPaymentSessionDTO = mapProps({
	expiryTime: toDate,
	merchantInfo: fromDynamicPayloadDTO,
	customerInfo: fromDynamicPayloadDTO
});

// toSecondaryInstrument :: SecondaryPaymentInstrument -> Object
const toSecondaryInstrument = (instrument) => ({
	instrumentId: instrument.paymentInstrumentId,
	amount: instrument.amount
});

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
		url: "/customer/payment/session/:paymentSessionId",
		pathParams: {
			paymentSessionId
		}
	})
}

const getByQRCodeId = (client) => (qrCodeId) => {
	if (!qrCodeId) {
		throw requiredParameterError("qrCodeId");
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
		url: "/customer/payment/session/qr/:qrId",
		pathParams: {
			qrId: qrCodeId
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
		url: "/customer/payment/session/:paymentSessionId",
		pathParams: {
			paymentSessionId
		},
		body: {
			data: mapProps({
				customerInfo: toDynamicPayloadDTO
			}, session),
			meta: {}
		}
	})
}

const deletePayment = (client) => (paymentSessionId) => {
	if (!paymentSessionId) {
		throw requiredParameterError("paymentSessionId");
	}

	return pipe(
		client,
		asyncToPromise
	)({
		method: HttpRequestMethod.DELETE,
		url: "/customer/payment/session/:paymentSessionId",
		pathParams: {
			paymentSessionId
		}
	})
}

const preApprove = (client) => (
	paymentSessionId,
	primaryInstrument,
	secondaryInstruments,
	clientReference,
	challengeResponses
) => {
	if (!paymentSessionId) {
		throw requiredParameterError("paymentSessionId");
	}

	if (!primaryInstrument) {
		throw requiredParameterError("primaryInstrument");
	}

	const body = {
		data: {
			primaryInstrumentId: primaryInstrument.paymentInstrumentId,
			secondaryInstruments: secondaryInstruments
				? secondaryInstruments.map(toSecondaryInstrument)
				: [],
			challengeResponses: challengeResponses ? challengeResponses : []
		},
		meta: {}
	};

	if (clientReference) {
		body.data.clientReference = clientReference;
	}

	return pipe(
		addHeaders(everydayPayWalletHeader(primaryInstrument.wallet)),
		chain(client),
		asyncToPromise
	)({
		method: HttpRequestMethod.PUT,
		url: "/customer/payment/session/:paymentSessionId",
		pathParams: {
			paymentSessionId
		},
		body: body
	});
}

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerPaymentSessions').CustomerPaymentSessionsApi} */
	return {
		getById: getById(client),
		getByQRCodeId: getByQRCodeId(client),
		update: update(client),
		delete: deletePayment(client),
		preApprove: preApprove(client)
	};
}
