const { v4: uuid } = require("uuid");

const { qrCodeDTO } = require("./qr-code");

exports.aCreatePaymentSessionRequest = () => ({
	generateQR: true,
	timeToLivePaymentSession: 0,
	timeToLiveQR: 0,
	location: "somewhere",
	merchantInfo: {
		schemaId: uuid(),
		payload: (function () {
			const payload = new Map();

			payload.set("merchantInfoKey", "some value");

			return payload;
		})()
	}
});

exports.createPaymentSessionResultDTO = () => ({
	paymentSessionId: uuid(),
	qr: qrCodeDTO()
});

exports.aCustomerUpdatePaymentSessionRequest = () => ({
	customerInfo: {
		schemaId: uuid(),
		payload: (function () {
			const payload = new Map();

			payload.set("customerInfoKey", "some value");

			return payload;
		})()
	}
});

exports.aMerchantUpdatePaymentSessionRequest = () => ({
	paymentRequestId: uuid(),
	merchantInfo: {
		schemaId: uuid(),
		payload: (function () {
			const payload = new Map();

			payload.set("merchantInfoKey", "some value");

			return payload;
		})()
	}
});

exports.paymentSessionDTO = () => ({
	paymentSessionId: uuid(),
	paymentRequestId: uuid(),
	merchantId: uuid(),
	walletId: "103929348",
	expiryTime: "2021-02-17T06:31:46.358Z",
	location: "location",
	merchantInfo: {
		schemaId: uuid(),
		payload: {
			merchantInfoKey: "some value"
		}
	},
	customerInfo: {
		schemaId: uuid(),
		payload: {
			customerInfoKey: "some value"
		}
	}
});
