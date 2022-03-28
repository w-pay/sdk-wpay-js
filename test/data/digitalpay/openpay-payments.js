"use strict";

const openPayPaymentRequest = () => ({
	transactionType: {
		openPay: "PURCHASE"
	},
	clientReference: "ref-1234",
	orderNumber: "12345678",
	channel: "Online",
	payments: [
		{
			paymentToken: "54321",
			amount: 150.25
		}
	],
	storeData: {
		storeId: "store-1",
		pin: "12345"
	}
});

const openPayTransactionResponse = () => ({
	transactionReceipt: "receipt-123",
	paymentResponses: [openPayPaymentResponse()]
});

const openPayPaymentResponse = () => ({
	paymentToken: "54321",
	paymentTransactionRef: "pay-ref-1234"
});

const openPayCompletionRequest = () => ({
	clientReference: "ref-1234",
	orderNumber: "12345678",
	merchantTransactedAt: "2021-02-25T05:45:31.941Z",
	completions: [
		{
			paymentTransactionRef: "payment-123",
			amount: 100
		}
	]
});

const openPayCompletionResponse = () => ({
	transactionReceipt: "receipt-123",
	completionResponses: [
		{
			paymentTransactionRef: "txn-123",
			completionTransactionRef: "comp-123",
			amount: 100,
			externalServiceCode: "Code",
			externalServiceMessage: "Message"
		}
	]
});

const openPayVoidRequest = () => ({
	clientReference: "ref-123",
	voids: [
		{
			paymentTransactionRef: "pay-123"
		}
	]
});

const openPayVoidResponse = () => ({
	transactionReceipt: "txn-123",
	voidResponses: [
		{
			paymentTransactionRef: "pay-123",
			voidTransactionRef: "void-123",
			amount: 153.22
		}
	]
});

const openPayRefundRequest = () => ({
	clientReference: "ref-123",
	refunds: [
		{
			paymentTransactionRef: "pay-123",
			amount: 123.45
		}
	]
});

const openPayRefundResponse = () => ({
	transactionReceipt: "txn-123",
	refundResponses: [
		{
			paymentTransactionRef: "pay-123",
			refundTransactionRef: "ref-123",
			amount: 123.45
		}
	]
});

module.exports = {
	openPayPaymentRequest,
	openPayPaymentResponse,
	openPayCompletionRequest,
	openPayCompletionResponse,
	openPayTransactionResponse,
	openPayVoidRequest,
	openPayVoidResponse,
	openPayRefundRequest,
	openPayRefundResponse
};
