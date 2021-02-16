"use strict";

const { createApiClient } = require("./wpay-factory");
const api = require("./api");

/**
 * @type {import('../types/WPayMerchant').createMerchantSDK}
 */
const createMerchantSDK = (httpClient, token, options) => {
	const client = createApiClient(httpClient, token, options);

	return {
		admin: api.administration(client),
		payments: api.merchantPayments(client),
		paymentSession: api.merchantPaymentSessions(client),
		preferences: api.merchantPreferences(client),
		qr: api.qrCode(client),
		schemas: api.schemas(client),
		transactions: api.merchantTransactions(client),
		options
	}
}

module.exports = {
	createMerchantSDK
}
