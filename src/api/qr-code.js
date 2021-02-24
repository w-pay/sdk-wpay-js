"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const chain = require("crocks/pointfree/chain");
const map = require("crocks/pointfree/map");
const pipe = require("crocks/helpers/pipe");
const resultToAsync = require("crocks/Async/resultToAsync");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { fromQrDTO } = require("../transformers/qr-code");
const { getPropOrError } = require("../helpers/props");
const { requiredParameterError } = require("./api-errors");

// toQrCode :: Object -> Async Error Object
const createPaymentRequestQRCode = (client) => (details) => {
	if (!details) {
		throw requiredParameterError("details");
	}

	return pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(fromQrDTO),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.POST,
		url: "/merchant/qr",
		body: {
			data: details,
			meta: {}
		}
	});
};

const getPaymentRequestQRCodeContent = (client) => (qrCodeId) => {
	if (!qrCodeId) {
		throw requiredParameterError("qrCodeId");
	}

	return pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(fromQrDTO),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.GET,
		url: "/merchant/qr/:qrId",
		pathParams: {
			qrId: qrCodeId
		}
	})
};

const cancelPaymentQRCode = (client) => (qrCodeId) => {
	if (!qrCodeId) {
		throw requiredParameterError("qrCodeId");
	}

	return pipe(
		client,
		asyncToPromise
	)({
		method: HttpRequestMethod.DELETE,
		url: "/merchant/qr/:qrId",
		pathParams: {
			qrId: qrCodeId
		}
	})
};

module.exports = function(client) {
	/** @implements {import('../../types/api/QRCode').QRCodeApi} */
	return {
		createPaymentRequestQRCode: createPaymentRequestQRCode(client),
		getPaymentRequestQRCodeContent: getPaymentRequestQRCodeContent(client),
		cancelPaymentQRCode: cancelPaymentQRCode(client)
	};
}
