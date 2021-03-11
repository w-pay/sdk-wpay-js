"use strict";

module.exports = {
	administration: require("./administration"),
	apiErrors: require("./api-errors"),
	customerPaymentAgreements: require("./customer-payment-agreements"),
	customerPaymentRequests: require("./customer-payment-requests"),
	customerPaymentSessions: require("./customer-payment-sessions"),
	customerPreferences: require("./customer-preferences"),
	customerTransactions: require("./customer-transactions"),
	customerTermsAndConditions: require("./customer-terms-and-conditions"),
	digitalPay: require("./digital-pay"),
	merchantPaymentAgreements: require("./merchant-payment-agreements"),
	merchantPaymentSessions: require("./merchant-payment-sessions"),
	merchantPayments: require("./merchant-payments"),
	merchantPreferences: require("./merchant-preferences"),
	merchantTransactions: require("./merchant-transactions"),
	paymentInstruments: require("./payment-instruments"),
	qrCode: require("./qr-code"),
	schemas: require("./schemas"),

	handlers: require("./result-handler")
};
