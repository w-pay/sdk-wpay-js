"use strict";

const { v4: uuid } = require("uuid");

const { basketDTO } = require("./basket");
const {
	TransactionSummaryPaymentStatus,
	TransactionSummaryPaymentType,
	TransactionSummaryRollback
} = require("../../src/model");

const customerTransactionSummaryDTO = () => ({
	paymentRequestId: uuid(),
	merchantReferenceId: uuid(),
	grossAmount: 12.32,
	transactionId: uuid(),
	clientReference: uuid(),
	type: TransactionSummaryPaymentType.PAYMENT.toLowerCase(),
	executionTime: "2021-02-17T06:31:46.358Z",
	status: TransactionSummaryPaymentStatus.APPROVED.toLowerCase(),
	rollback: TransactionSummaryRollback.FAILED.toLowerCase(),
	merchantId: uuid(),
	instruments: [
		{
			paymentInstrumentId: uuid(),
			instrumentType: "card",
			transactions: [
				{
					type: TransactionSummaryPaymentType.PAYMENT.toLowerCase(),
					executionTime: "2021-02-17T06:31:46.358Z",
					paymentTransactionRef: uuid(),
					status: TransactionSummaryPaymentStatus.APPROVED.toLowerCase(),
					amount: 12.32
				}
			]
		}
	]
});

const customerTransactionSummariesDTO = () => ({
	transactions: [customerTransactionSummaryDTO()]
});

const customerTransactionDetailsDTO = () => ({
	...customerTransactionSummaryDTO(),
	basket: basketDTO()
});

module.exports = {
	customerTransactionDetailsDTO,
	customerTransactionSummariesDTO,
	customerTransactionSummaryDTO
};
