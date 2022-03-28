"use strict";

const digitalPayPaymentAgreementDTO = () => ({
	transactionReceipt: "abc123def",
	paymentAgreement: {
		type: "RECURRING",
		paymentInstrumentId: "90731",
		paymentInstrumentType: "card",
		scheme: "VISA",
		cardSuffix: "4405",
		expiryMonth: "11",
		expiryYear: "22",
		startDate: "2020-09-01T00:00:00.000Z",
		endDate: "2021-12-31T23:29:29.999Z",
		chargeFrequency: "MONTHLY",
		chargeAmount: 25.99
	}
});

const digitalPayCreatePaymentAgreementRequest = () => ({
	clientReference: "T5ESYRPWJKPHF54",
	customerRef: "654321",
	orderNumber: "201905070001",
	billingAddress: {
		firstName: "Francois",
		lastName: "van der Merwe",
		email: "fvandermerwe@woolworths.com.au",
		company: "Woolworths Limited",
		extendedAddress: "Level 1",
		streetAddress: "22 River Oak Circuit",
		suburb: "Kellyville",
		stateOrTerritory: "NSW",
		postalCode: "2155",
		countryCode: "AU"
	},
	paymentAgreement: {
		type: "RECURRING",
		paymentInstrumentId: "90731",
		startDate: "2018-09-01T00:00:00.000+1100",
		endDate: "2018-12-31T23:59:59.999+1100",
		chargeFrequency: "WEEKLY",
		chargeAmount: 25.99,
		immediateCharge: true,
		stepUpToken: "e86b3a32-96a5-4659-b6d8-5d685bfa78e8"
	}
});

const digitalPayUpdatePaymentAgreementRequest = () => ({
	clientReference: "T5ESYRPWJKPHF54",
	customerRef: "654321",
	billingAddress: {
		firstName: "Francois",
		lastName: "van der Merwe",
		email: "fvandermerwe@woolworths.com.au",
		company: "Woolworths Limited",
		extendedAddress: "Level 1",
		streetAddress: "22 River Oak Circuit",
		suburb: "Kellyville",
		stateOrTerritory: "NSW",
		postalCode: "2155",
		countryCode: "AU"
	},
	paymentAgreement: {
		paymentInstrumentId: "90731",
		startDate: "2018-09-01T00:00:00.000+1100",
		endDate: "2018-12-31T23:59:59.999+1100",
		chargeFrequency: "WEEKLY",
		chargeAmount: 25.99,
		stepUpToken: "e86b3a32-96a5-4659-b6d8-5d685bfa78e8"
	}
});

const digitalPayChargePaymentAgreementRequest = () => ({
	transactionType: {
		creditCard: "PURCHASE"
	},
	clientReference: "T5ESYRPWJKPHF54",
	orderNumber: "201808312007",
	paymentToken: "8f65ca0a-7873-4d1f-ab8d-6815adae5300",
	amount: 25.99
});

module.exports = {
	digitalPayChargePaymentAgreementRequest,
	digitalPayCreatePaymentAgreementRequest,
	digitalPayPaymentAgreementDTO,
	digitalPayUpdatePaymentAgreementRequest
};
