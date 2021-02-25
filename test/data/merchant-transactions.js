"use strict";

const { v4: uuid } = require("uuid");

const {
	TransactionSummaryPaymentStatus,
	TransactionSummaryPaymentType
} = require("../../src/model");

const { basketDTO } = require("./basket");
const { merchantPayloadDTO, posPayloadDTO } = require("./dynamic-payloads");

const merchantTransactionSummaryDTO = () => ({
	transactionId: uuid(),
	clientReference: uuid(),
	type: TransactionSummaryPaymentType.PAYMENT.toLowerCase(),
	executionTime: "2021-02-17T06:31:46.358Z",
	status: TransactionSummaryPaymentStatus.APPROVED.toLowerCase(),
	walletId: "394589294"
});

const merchantTransactionSummariesDTO = () => ({
	transactions: [merchantTransactionSummaryDTO()]
});

const merchantTransactionDetailsDTO = () => ({
	...merchantTransactionSummaryDTO(),
	basket: basketDTO(),
	posPayload: posPayloadDTO(),
	merchantPayload: merchantPayloadDTO()
});

module.exports = {
	merchantTransactionDetailsDTO,
	merchantTransactionSummariesDTO,
	merchantTransactionSummaryDTO
};
