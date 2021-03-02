"use strict";

module.exports = {
	administration: require("./administration"),
	apiErrors: require("./api-errors"),
	customerPaymentRequests: require("./customer-payment-requests"),
	customerPaymentSessions: require("./customer-payment-sessions"),
	customerPreferences: require("./customer-preferences"),
	customerTransactions: require("./customer-transactions"),
	digitalPay: require("./digital-pay"),
	merchantPaymentSessions: require("./merchant-payment-sessions"),
	merchantPayments: require("./merchant-payments"),
	merchantPreferences: require("./merchant-preferences"),
	merchantTransactions: require("./merchant-transactions"),
	paymentInstruments: require("./payment-instruments"),
	qrCode: require("./qr-code"),
	schemas: require("./schemas"),

	handlers: require("./result-handler")
};
