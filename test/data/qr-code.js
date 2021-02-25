"use strict";

const { v4: uuid } = require("uuid");

const { QRCodePaymentReferenceType } = require("../../src/model");

exports.aQRCode = () => ({
	qrId: uuid(),
	referenceId: uuid(),
	referenceType: QRCodePaymentReferenceType.PAYMENT_REQUEST,
	content: "qr code contents",
	image: "pretend this is base64 encoded",
	expiryTime: new Date()
});

exports.qrCodeDTO = () => ({
	qrId: uuid(),
	referenceId: uuid(),
	referenceType: QRCodePaymentReferenceType.PAYMENT_REQUEST.toLowerCase(),
	content: "qr code contents",
	image: "pretend this is base64 encoded",
	expiryTime: new Date().toISOString()
});
