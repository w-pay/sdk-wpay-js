"use strict";

const { v4: uuid } = require("uuid");

const { merchantPayloadDTO, posPayloadDTO } = require("./dynamic-payloads");
const { basketDTO } = require("./basket");

const merchantPaymentSummariesDTO = () => ({
	payments: [merchantPaymentSummaryDTO()]
});

const merchantPaymentSummaryDTO = () => ({
	paymentRequestId: uuid(),
	merchantReferenceId: uuid(),
	grossAmount: 345.23,
	usesRemaining: 2,
	expiryTime: "2021-02-17T06:31:46.358Z",
	specificWalletId: "399394393920"
});

const merchantPaymentDetailsDTO = () => ({
	...merchantPaymentSummaryDTO(),
	basket: basketDTO(),
	posPayload: posPayloadDTO(),
	merchantPayload: merchantPayloadDTO()
});

module.exports = {
	merchantPaymentDetailsDTO,
	merchantPaymentSummariesDTO,
	merchantPaymentSummaryDTO
};
