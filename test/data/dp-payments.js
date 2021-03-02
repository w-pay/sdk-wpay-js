"use strict";

const digitalPayPaymentRequest = () => ({
	transactionType: "PURCHASE",
	clientReference: "ref-1234",
	orderNumber: "12345678",
	shippingAddress: {
		firstName: "John",
		lastName: "Smith",
		streetAddress: "1 Woolworths Way",
		suburb: "Bella Vista",
		stateOrTerritory: "NSW",
		postalCode: "2153",
		countryCode: "AU"
	},
	payments: [
		{
			paymentInstrumentId: "123",
			paymentToken: "54321",
			amount: 150.25
		}
	]
});

const digitalPayPaymentResponse = () => ({
	transactionReceipt: "txn-123",
	partialSuccess: false,
	fraudResponse: {
		clientId: "client-id",
		reasonCode: "123",
		decision: "decision"
	},
	creditCards: [
		{
			paymentInstrumentId: "12345",
			paymentToken: "token-12",
			paymentTransactionRef: "ref-123"
		}
	],
	giftCards: [],
	payPal: [],
	androidPay: [],
	googlePay: [],
	applePay: [],
	unknown: []
});

const digitalPayCompletionRequest = () => ({
	clientReference: "ref-1234",
	orderNumber: "12345678",
	completions: [
		{
			paymentTransactionRef: "payment-123",
			amount: 100
		}
	]
});

const digitalPayCompletionResponse = () => ({
	transactionReceipt: "receipt-123",
	partialSuccess: false,
	completionResponses: [
		{
			paymentTransactionRef: "txn-123",
			completionTransactionRef: "comp-123",
			amount: 100
		}
	]
});

const digitalPayVoidRequest = () => ({
	clientReference: "ref-123",
	orderNumber: "order-123",
	voids: [
		{
			paymentTransactionRef: "pay-123"
		}
	]
});

const digitalPayVoidResponse = () => ({
	transactionReceipt: "txn-123",
	partialSuccess: false,
	voidResponses: [
		{
			paymentTransactionRef: "pay-123",
			voidTransactionRef: "void-123"
		}
	]
});

const digitalPayRefundRequest = () => ({
	clientReference: "ref-123",
	orderNumber: "order-123",
	refunds: [
		{
			paymentTransactionRef: "pay-123",
			amount: 123.45
		}
	]
});

const digitalPayRefundResponse = () => ({
	transactionReceipt: "txn-123",
	partialSuccess: false,
	refundResponses: [
		{
			paymentTransactionRef: "pay-123",
			refundTransactionRef: "ref-123",
			amount: 123.45
		}
	]
});

module.exports = {
	digitalPayPaymentRequest,
	digitalPayPaymentResponse,
	digitalPayCompletionRequest,
	digitalPayCompletionResponse,
	digitalPayVoidRequest,
	digitalPayVoidResponse,
	digitalPayRefundRequest,
	digitalPayRefundResponse
};
