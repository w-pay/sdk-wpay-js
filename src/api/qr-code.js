"use strict";

const createPaymentRequestQRCode = (client, details) => Promise.resolve();

const getPaymentRequestQRCodeContent = (client, qrCodeId) => Promise.resolve();

const cancelPaymentQRCode = (client, qrCodeId) => Promise.resolve();

module.exports = function(client) {
	/** @implements {import('../../types/api/QRCode').QRCodeApi} */
	return {
		createPaymentRequestQRCode: createPaymentRequestQRCode(client),
		getPaymentRequestQRCodeContent: getPaymentRequestQRCodeContent(client),
		cancelPaymentQRCode: cancelPaymentQRCode(client)
	};
}
