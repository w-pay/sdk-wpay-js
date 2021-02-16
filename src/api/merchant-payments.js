"use strict";

const listPayments = (client, type, page, pageSize) => Promise.resolve();

const createPaymentRequest = (client, paymentRequest) => Promise.resolve();

const getPaymentRequestDetailsBy = (client, paymentRequestId) => Promise.resolve();

const deletePaymentRequest = (client, paymentRequestId) => Promise.resolve();

const refundTransaction = (client, transactionId, refundDetails) => Promise.resolve()

module.exports = (client) => {
	/** @implements {import('../../types/api/MerchantPayments').MerchantPaymentsApi} */
	return {
		listPayments: listPayments(client),
		createPaymentRequest: createPaymentRequest(client),
		getPaymentRequestDetailsBy: getPaymentRequestDetailsBy(client),
		deletePaymentRequest: deletePaymentRequest(client),
		refundTransaction: refundTransaction(client)
	};
}
