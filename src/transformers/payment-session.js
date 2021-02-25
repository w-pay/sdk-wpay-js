"use strict";

const mapProps = require("crocks/helpers/mapProps");

const { toDate } = require("../helpers/props");
const { fromDynamicPayloadDTO, toDynamicPayloadDTO } = require("./dynamic-payload");
const { fromQrDTO } = require("./qr-code");

exports.fromCreatePaymentSessionResultDTO = mapProps({
	qr: fromQrDTO
});

exports.fromPaymentSessionDTO = mapProps({
	expiryTime: toDate,
	merchantInfo: fromDynamicPayloadDTO,
	customerInfo: fromDynamicPayloadDTO
});

exports.toCreatePaymentSessionRequestDTO = mapProps({
	merchantInfo: toDynamicPayloadDTO
});

exports.toCustomerUpdatePaymentSessionRequestDTO = mapProps({
	customerInfo: toDynamicPayloadDTO
});

exports.toMerchantUpdatePaymentSessionRequestDTO = mapProps({
	merchantInfo: toDynamicPayloadDTO
});
