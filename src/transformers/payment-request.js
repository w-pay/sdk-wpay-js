"use strict";

const mapProps = require("crocks/helpers/mapProps");

const { fromQrDTO } = require("./qr-code");

exports.fromCreatePaymentRequestResultDTO = mapProps({
	qr: fromQrDTO
});
