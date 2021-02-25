"use strict";

const mapProps = require("crocks/helpers/mapProps");

const { fromBasketDTO, toBasketDTO } = require("./basket");
const { fromQrDTO } = require("./qr-code");
const { toDynamicPayloadDTO } = require("./dynamic-payload");

exports.fromCreatePaymentRequestResultDTO = mapProps({
	qr: fromQrDTO
});

exports.fromCustomerPaymentRequestDTO = mapProps({
	basket: fromBasketDTO
});

exports.toNewPaymentRequestDTO = mapProps({
	basket: toBasketDTO,
	posPayload: toDynamicPayloadDTO,
	merchantPayload: toDynamicPayloadDTO
});
