"use strict";

const { v4: uuid } = require("uuid");

const { PaymentInstrumentStatus, Wallet } = require("../../src/model/enums");

const aSelectedPaymentInstrument = () => ({
	paymentInstrumentId: uuid(),
	wallet: Wallet.MERCHANT,
	allowed: true,
	cardSuffix: "1234",
	lastUpdated: new Date(),
	lastUsed: new Date(),
	paymentToken: uuid(),
	primary: true,
	status: PaymentInstrumentStatus.VERIFIED,
});

const aSecondaryPaymentInstrument = () => ({
	paymentInstrumentId: uuid(),
	amount: 10
})

const aNewPaymentInstrument = () => ({
	clientReference: "abc123",
	wallet: Wallet.EVERYDAY_PAY,
})

const paymentInstrumentDTO = () => ({
	paymentInstrumentId: uuid(),
	allowed: true,
	cardSuffix: "1234",
	lastUpdated: "2021-02-17T06:31:46.358Z",
	lastUsed: "2021-02-17T06:31:46.358Z",
	paymentToken: "token",
	primary: false,
	status: PaymentInstrumentStatus.UNVERIFIED_PERSISTENT.toLowerCase()
})

const creditCardDTO = () => ({
	...paymentInstrumentDTO(),
	cardName: "My Card",
	cvvValidated: true,
	expired: true,
	expiryMonth: "02",
	expiryYear: "2100",
	requiresCVV: false,
	scheme: "visa",
	updateURL: "http://foobar.com/",
	stepUp: {
		type: "capture_cvv",
		mandatory: false,
		url: "http://foobar.com/"
	}
})

const giftCardDTO = () => ({
	...paymentInstrumentDTO(),
	programName: "Gift cards",
	stepUp: {
		type: "REQUIRE_PASSCODE",
		mandatory: false
	}
})

const walletContentsDTO = () => ({
	creditCards: [ creditCardDTO() ],
	giftCards: [ giftCardDTO() ],
	everydayPay: {
		creditCards: [ creditCardDTO() ],
		giftCards: [ giftCardDTO() ],
	}
})

module.exports = {
	aNewPaymentInstrument,
	aSelectedPaymentInstrument,
	aSecondaryPaymentInstrument,
	creditCardDTO,
	giftCardDTO,
	paymentInstrumentDTO,
	walletContentsDTO
}
