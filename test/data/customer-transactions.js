"use strict";

const { v4: uuid } = require("uuid");

const { basketDTO } = require("./basket");
const {
	TransactionSummaryPaymentStatus,
	TransactionSummaryPaymentType
} = require("../../src/model");

const customerTransactionSummaryDTO = () => ({
	transactionId: uuid(),
	clientReference: uuid(),
	type: TransactionSummaryPaymentType.PAYMENT.toLowerCase(),
	executionTime: "2021-02-17T06:31:46.358Z",
	status: TransactionSummaryPaymentStatus.APPROVED.toLowerCase(),
	merchantId: uuid(),
	instruments: [
		{
			paymentInstrumentId: uuid(),
			amount: 232.34,
			paymentTransactionRef: uuid()
		}
	]
});

const customerTransactionSummariesDTO = () => ({
	transactions: [ customerTransactionSummaryDTO() ]
});

const customerTransactionDetailsDTO = () => ({
	...customerTransactionSummaryDTO(),
	basket: basketDTO()
});

module.exports = {
	customerTransactionDetailsDTO,
	customerTransactionSummariesDTO,
	customerTransactionSummaryDTO
}
