"use strict";

const mapProps = require("crocks/helpers/mapProps");

const { toDate } = require("../helpers/props");
const { fromQrDTO } = require("./qr-code");

exports.fromCreatePaymentSessionResultDTO = mapProps({
	qr: fromQrDTO
});

exports.fromPaymentSessionDTO = mapProps({
	expiryTime: toDate
});
