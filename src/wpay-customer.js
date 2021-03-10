"use strict";

const { createApiClient } = require("./wpay-factory");
const api = require("./api");

/**
 * @type {import('../types/WPayCustomer').createCustomerSDK}
 */
const createCustomerSDK = (httpClient, options) => {
	const client = createApiClient(httpClient, options);

	return {
		admin: api.administration(client),
		dp: api.digitalPay(client),
		instruments: api.paymentInstruments(client),
		paymentAgreements: api.customerPaymentAgreements(client),
		paymentRequests: api.customerPaymentRequests(client),
		paymentSessions: api.customerPaymentSessions(client),
		preferences: api.customerPreferences(client),
		transactions: api.customerTransactions(client),
		termsAndConditions: api.customerTermsAndConditions(client),
		options
	};
};

module.exports = {
	createCustomerSDK
};
