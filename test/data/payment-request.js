"use strict";

const { v4: uuid } = require("uuid");

const { aNewBasket, basketDTO } = require("./basket");
const { aNewMerchantPayload, aNewPosPayload } = require("./dynamic-payloads");
const { qrCodeDTO } = require("./qr-code");
const { QRCodePaymentReferenceType } = require("../../src/model");

exports.aNewPaymentRequest = () => ({
	merchantReferenceId: uuid(),
	grossAmount: 32.45,
	generateQR: false,
	maxUses: 1,
	timeToLivePayment: 300,
	timeToLiveQR: 90,
	specificWalletId: "1949203",
	basket: aNewBasket(),
	posPayload: aNewPosPayload(),
	merchantPayload: aNewMerchantPayload()
});

exports.aNewPaymentRequestQRCodeRequest = () => ({
	referenceId: uuid(),
	referenceType: QRCodePaymentReferenceType.PAYMENT_REQUEST,
	timeToLive: 300
});

exports.createPaymentRequestResultDTO = () => ({
	paymentRequestId: uuid(),
	qr: qrCodeDTO()
});

exports.customerPaymentRequestDTO = () => ({
	merchantId: "10006",
	grossAmount: 32.1,
	paymentRequestId: uuid(),
	merchantReferenceId: uuid(),
	basket: basketDTO()
});

exports.immediatePaymentRequest = () => ({
	clientReference: "client-ref",
	orderNumber: "order-123",
	payments: [
		{
			paymentInstrumentId: "123456",
			amount: 100
		}
	]
});
