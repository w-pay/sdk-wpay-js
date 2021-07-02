"use strict";

const paymentAgreementsDTO = () => ({
	paymentAgreements: [
		{
			paymentToken: "27e07e4e-58df-4072-8e75-33dd464af667",
			status: "UNVERIFIED_PERSISTENT",
			lastUpdated: "2019-09-01T06:31:46.358Z",
			lastUsed: "2018-09-01T06:31:46.358Z",
			createdOn: "2017-11-01T06:31:46.358Z",
			primary: false,
			allowed: true,
			type: "RECURRING",
			paymentInstrumentId: "90731",
			scheme: "VISA",
			cardSuffix: "4405",
			expiryMonth: "11",
			expiryYear: "22",
			startDate: "2020-09-01T00:00:00.000Z",
			endDate: "2021-12-31T23:29:29.999Z",
			chargeFrequency: "MONTHLY",
			chargeAmount: 25.99,
			chargeCycle: 2,
			expired: "false",
			updateURL:
				"https://{environment}.mobile-api.woolworths.com.au/wow/v1/pay/paymentagreements/27e07e4e-58df-4072-8e75-33dd464af667",
			stepUp: {
				type: "CAPTURE_CVV",
				mandatory: true,
				url:
					"https://uat.woolworthspay.com.au/container-ws/getCaptureFrame/cvvExpiry/353629ec-4cb5-4fc3-ab47-8c9c3f117ab8/90731"
			},
			description: "A description of the payment agreement"
		}
	]
});

const paymentAgreementDTO = () => ({
	paymentToken: "27e07e4e-58df-4072-8e75-33dd464af667",
	status: "UNVERIFIED_PERSISTENT",
	lastUpdated: "2019-09-01T06:31:46.358Z",
	lastUsed: "2018-09-01T06:31:46.358Z",
	createdOn: "2017-11-01T06:31:46.358Z",
	primary: false,
	allowed: true,
	type: "RECURRING",
	paymentInstrumentId: "90731",
	scheme: "VISA",
	cardSuffix: "4405",
	expiryMonth: "11",
	expiryYear: "22",
	startDate: "2020-09-01T00:00:00.000Z",
	endDate: "2021-12-31T23:29:29.999Z",
	chargeFrequency: "MONTHLY",
	chargeAmount: 25.99,
	chargeCycle: 2,
	expired: "false",
	updateURL:
		"https://{environment}.mobile-api.woolworths.com.au/wow/v1/pay/paymentagreements/27e07e4e-58df-4072-8e75-33dd464af667",
	stepUp: {
		type: "CAPTURE_CVV",
		mandatory: true,
		url:
			"https://uat.woolworthspay.com.au/container-ws/getCaptureFrame/cvvExpiry/353629ec-4cb5-4fc3-ab47-8c9c3f117ab8/90731"
	},
	description: "A description of the payment agreement"
});

const CreatePaymentAgreementRequest = () => ({
	clientReference: "client-ref",
	customerRef: "customer-ref",
	orderNumber: "order-12345",
	description: "Description of the payment agreement.",
	billingAddress: {
		firstName: "John",
		lastName: "Smith",
		email: "john.smith@test.com",
		streetAddress: "1 Test St",
		suburb: "Melbourne",
		stateOrTerritory: "VIC",
		postalCode: "3000",
		countryCode: "AU"
	},
	paymentAgreement: {
		type: "RECURRING",
		paymentInstrumentId: "90731",
		chargeFrequency: "WEEKLY",
		chargeAmount: 25.99
	}
});

const PaymentAgreementResponse = () => ({
	paymentToken: "27e07e4e-58df-4072-8e75-33dd464af667",
	status: "UNVERIFIED_PERSISTENT",
	lastUpdated: "2019-09-01T06:31:46.358Z",
	lastUsed: "2018-09-01T06:31:46.358Z",
	createdOn: "2017-11-01T06:31:46.358Z",
	primary: false,
	allowed: true,
	type: "RECURRING",
	paymentInstrumentId: "90731",
	scheme: "VISA",
	cardSuffix: "4405",
	expiryMonth: "11",
	expiryYear: "22",
	startDate: "2020-09-01T00:00:00.000Z",
	endDate: "2021-12-31T23:29:29.999Z",
	chargeFrequency: "MONTHLY",
	chargeAmount: 25.99,
	chargeCycle: 2,
	expired: "false",
	updateURL:
		"https://{environment}.mobile-api.woolworths.com.au/wow/v1/pay/paymentagreements/27e07e4e-58df-4072-8e75-33dd464af667",
	stepUp: {
		type: "CAPTURE_CVV",
		mandatory: true,
		url:
			"https://uat.woolworthspay.com.au/container-ws/getCaptureFrame/cvvExpiry/353629ec-4cb5-4fc3-ab47-8c9c3f117ab8/90731"
	},
	description: "A description of the payment agreement"
});

const ListPaymentAgreementsResponse = () => ({
	paymentAgreements: [{ ...PaymentAgreementResponse() }]
});

const UpdatePaymentAgreementRequest = () => ({
	clientReference: "client-ref",
	customerRef: "customer-ref",
	orderNumber: "order-12345",
	description: "Description of the payment agreement.",
	billingAddress: {
		firstName: "John",
		lastName: "Smith",
		email: "john.smith@test.com",
		streetAddress: "1 Test St",
		suburb: "Melbourne",
		stateOrTerritory: "VIC",
		postalCode: "3000",
		countryCode: "AU"
	},
	paymentAgreement: {
		type: "RECURRING",
		paymentInstrumentId: "90731",
		chargeFrequency: "WEEKLY",
		chargeAmount: 25.99
	}
});

const ChargePaymentAgreementRequest = () => ({
	transactionType: {
		creditCard: "PURCHASE"
	},
	amount: 25.53,
	clientReference: "client-ref",
	customerRef: "customer-ref",
	orderNumber: "order-12345",
	paymentToken: "11111111-1111-1111-111111111111"
});

module.exports = {
	paymentAgreementDTO,
	paymentAgreementsDTO,
	CreatePaymentAgreementRequest,
	PaymentAgreementResponse,
	ListPaymentAgreementsResponse,
	UpdatePaymentAgreementRequest,
	ChargePaymentAgreementRequest
};
