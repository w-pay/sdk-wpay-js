"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const mapProps = require("crocks/helpers/mapProps");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { fromData } = require("../transformers/data");
const { fromPaymentSessionDTO } = require("../transformers/payment-session");
const { requiredParameterError } = require("./api-errors");
const { toDynamicPayloadDTO } = require("../transformers/dynamic-payload");
const { toPaymentDetailsDTO } = require("../transformers/payment-details");

const getById = (client) => (paymentSessionId) => {
	if (!paymentSessionId) {
		throw requiredParameterError("paymentSessionId");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromPaymentSessionDTO)
		)({
			method: HttpRequestMethod.GET,
			url: "/instore/customer/payment/session/:paymentSessionId",
			pathParams: {
				paymentSessionId
			}
		})
	);
};

const getByQRCodeId = (client) => (qrCodeId) => {
	if (!qrCodeId) {
		throw requiredParameterError("qrCodeId");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromPaymentSessionDTO)
		)({
			method: HttpRequestMethod.GET,
			url: "/instore/customer/payment/session/qr/:qrId",
			pathParams: {
				qrId: qrCodeId
			}
		})
	);
};

const update = (client) => (paymentSessionId, session) => {
	if (!paymentSessionId) {
		throw requiredParameterError("paymentSessionId");
	}

	if (!session) {
		throw requiredParameterError("session");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/instore/customer/payment/session/:paymentSessionId",
			pathParams: {
				paymentSessionId
			},
			body: {
				data: mapProps(
					{
						customerInfo: toDynamicPayloadDTO
					},
					session
				),
				meta: {}
			}
		})
	);
};

const deletePayment = (client) => (paymentSessionId) => {
	if (!paymentSessionId) {
		throw requiredParameterError("paymentSessionId");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.DELETE,
			url: "/instore/customer/payment/session/:paymentSessionId",
			pathParams: {
				paymentSessionId
			}
		})
	);
};

const preApprove = (client) => (
	paymentSessionId,
	primaryInstrument,
	secondaryInstruments,
	skipRollback,
	clientReference,
	preferences,
	challengeResponses
) => {
	if (!paymentSessionId) {
		throw requiredParameterError("paymentSessionId");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.PUT,
			url: "/instore/customer/payment/session/:paymentSessionId",
			pathParams: {
				paymentSessionId
			},
			body: {
				data: toPaymentDetailsDTO(
					primaryInstrument,
					secondaryInstruments,
					skipRollback,
					clientReference,
					preferences
				),
				meta: {
					challengeResponses: challengeResponses ? challengeResponses : []
				}
			}
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerPaymentSessions').CustomerPaymentSessionsApi} */
	return {
		getById: getById(client),
		getByQRCodeId: getByQRCodeId(client),
		update: update(client),
		delete: deletePayment(client),
		preApprove: preApprove(client)
	};
};
