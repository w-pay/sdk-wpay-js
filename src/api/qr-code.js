"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { fromData } = require("../transformers/data");
const { fromQrDTO } = require("../transformers/qr-code");
const { requiredParameterError } = require("./api-errors");

// toQrCode :: Object -> Async Error Object
const createPaymentRequestQRCode = (client) => (details) => {
	if (!details) {
		throw requiredParameterError("details");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromQrDTO)
		)({
			method: HttpRequestMethod.POST,
			url: "/merchant/qr",
			body: {
				data: details,
				meta: {}
			}
		})
	);
};

const getPaymentRequestQRCodeContent = (client) => (qrCodeId) => {
	if (!qrCodeId) {
		throw requiredParameterError("qrCodeId");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromQrDTO)
		)({
			method: HttpRequestMethod.GET,
			url: "/merchant/qr/:qrId",
			pathParams: {
				qrId: qrCodeId
			}
		})
	);
};

const cancelPaymentQRCode = (client) => (qrCodeId) => {
	if (!qrCodeId) {
		throw requiredParameterError("qrCodeId");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.DELETE,
			url: "/merchant/qr/:qrId",
			pathParams: {
				qrId: qrCodeId
			}
		})
	);
};

module.exports = function (client) {
	/** @implements {import('../../types/api/QRCode').QRCodeApi} */
	return {
		createPaymentRequestQRCode: createPaymentRequestQRCode(client),
		getPaymentRequestQRCodeContent: getPaymentRequestQRCodeContent(client),
		cancelPaymentQRCode: cancelPaymentQRCode(client)
	};
};
