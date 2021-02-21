"use strict";

const { aNewBasket } = require("./test-basket");

exports.aCustomerPaymentRequest = () =>
	new TestCustomerPaymentRequest();

class TestCustomerPaymentRequest {
	constructor() {
		this.merchantId = "10006";
		this.grossAmount = 32.1;
		this.paymentRequestId = "7c1b74bd-17f8-4bbc-a902-d25f6246df60";
		this.merchantReferenceId = "4c282339-9b29-41a2-9eea-d53f509db477";
		this.basket = aNewBasket();
	}
}
