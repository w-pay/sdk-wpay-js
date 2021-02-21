"use strict";

const { PaymentInstrumentStatus, Wallet } = require("../../src/model/enums");

exports.aSelectedPaymentInstrument = () =>
	new TestPaymentInstrument();

exports.aSecondaryPaymentInstrument = () =>
	new TestSecondaryPaymentInstrument();

exports.aNewPaymentInstrument = () =>
	new TestPaymentInstrumentAddition();

class TestPaymentInstrument {
	constructor() {
		this.allowed = true;
		this.cardSuffix = "1234";
		this.lastUpdated = new Date();
		this.lastUsed = new Date();
		this.paymentInstrumentId = "abc123";
		this.paymentToken = "def123fgh";
		this.primary = true;
		this.status = PaymentInstrumentStatus.VERIFIED;
		this.wallet = Wallet.MERCHANT;
	}
}

class TestPaymentInstrumentAddition {
	clientReference = "abc123";
	wallet = Wallet.EVERYDAY_PAY;
}

class TestSecondaryPaymentInstrument {
	constructor() {
		this.paymentInstrumentId = "def456";
		this.amount = 10;
	}
}
