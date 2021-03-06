"use strict";

const { v4: uuid } = require("uuid");

const { PaymentInstrumentStatus } = require("../../src/model/enums");

const aSecondaryPaymentInstrument = () => ({
	paymentInstrumentId: uuid(),
	amount: 10
});

const aNewPaymentInstrument = () => ({
	clientReference: "abc123"
});

const paymentInstrumentDTO = () => ({
	paymentInstrumentId: uuid(),
	allowed: true,
	lastUpdated: "2021-02-17T06:31:46.358Z",
	lastUsed: "2021-02-17T06:31:46.358Z",
	paymentToken: "token",
	primary: false,
	status: PaymentInstrumentStatus.UNVERIFIED_PERSISTENT.toLowerCase()
});

const cardInstrumentDTO = () => ({
	...paymentInstrumentDTO(),
	cardSuffix: "1234"
});

const creditCardDTO = () => ({
	...cardInstrumentDTO(),
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
});

const giftCardDTO = () => ({
	...cardInstrumentDTO(),
	programName: "Gift cards",
	stepUp: {
		type: "REQUIRE_PASSCODE",
		mandatory: false
	}
});

const walletContentsDTO = () => ({
	creditCards: [creditCardDTO()],
	giftCards: [giftCardDTO()],
	everydayPay: {
		creditCards: [creditCardDTO()],
		giftCards: [giftCardDTO()]
	}
});

const individualPaymentInstrumentDTO = () => ({
	...paymentInstrumentDTO(),
	paymentInstrumentType: "GIFT_CARD",
	paymentInstrumentDetail: {
		cardSuffix: "5678",
		programName: "Gift cards",
		stepUp: {
			type: "REQUIRE_PASSCODE",
			mandatory: true
		}
	}
});

module.exports = {
	aNewPaymentInstrument,
	aSecondaryPaymentInstrument,
	creditCardDTO,
	giftCardDTO,
	individualPaymentInstrumentDTO,
	paymentInstrumentDTO,
	walletContentsDTO
};
