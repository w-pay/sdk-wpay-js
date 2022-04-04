"use strict";

exports.ImportPaymentInstrumentsRequest = () => ({
	uid: "61ea4c7310df484d91e15cd6ad883ccb",
	shopperId: "12345",
	creditCards: [
		{
			transactionRef: "2000000009719570",
			transactionTimestamp: "2017-09-26T23:11:27.000Z",
			orderNumber: "20170505090",
			bin: "543048",
			cardSuffix: "4307",
			amount: 75.5
		}
	],
	payPal: {
		customerId: "690238314",
		payPalId: "jane.doe@paypal.com",
		paymentMethodToken: "I7wME6uOKgsq3fz3y52s"
	}
});

exports.ImportPaymentInstrumentsResponseDTO = () => ({
	uid: "61ea4c7310df484d91e15cd6ad883ccb",
	shopperId: "12345",
	creditCards: [
		{
			transactionRef: "2000000009719570",
			transactionTimestamp: "2017-09-26T23:11:27.000Z",
			transactionType: "PURCHASE",
			transactionResponseCode: "00",
			transactionResponseText: "APPROVED",
			orderNumber: "20170505090",
			bin: "543048",
			cardSuffix: "4307",
			expiryMonth: "01",
			expiryYear: "19",
			amount: 75.5,
			result: "OK"
		}
	],
	payPal: {
		customerId: "690238314",
		payPalId: "jane.doe@paypal.com",
		paymentMethodToken: "I7wME6uOKgsq3fz3y52s",
		result: "OK"
	}
});

exports.ListPaymentInstrumentsRequest = () => ({
	uid: "61ea4c7310df484d91e15cd6ad883ccb",
	shopperId: "12345"
});

exports.ListPaymentInstrumentsResponseDTO = () => ({
	creditCards: [
		{
			paymentInstrumentId: "90731",
			paymentToken: "712029a1-c0aa-41bc-a810-3d42424c5834",
			status: "UNVERIFIED_PERSISTENT",
			lastUpdated: "2017-11-06T08:38:09.890Z",
			lastUsed: "2017-11-06T08:38:09.890Z",
			createdOn: "2017-11-06T08:38:09.890Z",
			primary: true,
			allowed: true,
			expiryYear: "21",
			expiryMonth: "05",
			scheme: "MASTERCARD",
			cardSuffix: "6106",
			cvvValidated: false,
			cardName: "My Card",
			expired: false,
			requiresCVV: true,
			updateURL:
				"https://uat.woolworthspay.com.au/container-ws/getCaptureFrame/cvvExpiry/353629ec-4cb5-4fc3-ab47-8c9c3f117ab8/90731",
			stepUp: {
				type: "CAPTURE_CVV",
				mandatory: true,
				url:
					"https://uat.woolworthspay.com.au/container-ws/getCaptureFrame/cvv/353629ec-4cb5-4fc3-ab47-8c9c3f117ab8/90731"
			}
		}
	],
	giftCards: [
		{
			paymentInstrumentId: "81054",
			paymentToken: "ec9b062a-220a-43b3-8185-a8ca4fc4dc0c",
			status: "UNVERIFIED_PERSISTENT",
			lastUpdated: "2017-11-06T08:38:09.860Z",
			lastUsed: "2017-10-12T02:25:49.770Z",
			createdOn: "2017-11-06T08:38:09.890Z",
			primary: false,
			allowed: true,
			programName: "WISH Gift Card",
			cardSuffix: "2517",
			stepUp: {
				type: "REQUIRE_PASSCODE",
				mandatory: true,
				url: "https://uat.woolworthspay.com.au/container-ws/tbd"
			}
		}
	],
	payPal: [
		{
			paymentInstrumentId: "90271",
			paymentToken: "15f774d0-e42e-11e9-a359-2a2ae2dbcce4",
			status: "UNVERIFIED_PERSISTENT",
			lastUpdated: "2017-11-06T08:38:09.860Z",
			lastUsed: "2017-11-06T08:38:09.860Z",
			createdOn: "2017-11-06T08:38:09.890Z",
			primary: false,
			allowed: true,
			payPalId: "jane.doe@paypal.com",
			customerId: "690238314"
		}
	],
	paymentAgreements: [
		{
			paymentToken: "27e07e4e-58df-4072-8e75-33dd464af667",
			status: "VERIFIED",
			lastUpdated: "2018-09-01T00:00:00.000+1100",
			lastUsed: "2018-09-14T12:00:00.000+1100",
			createdOn: "2017-11-06T08:38:09.890Z",
			primary: false,
			allowed: true,
			type: "RECURRING",
			paymentInstrumentId: "90731",
			scheme: "VISA",
			cardSuffix: "4405",
			expiryMonth: "11",
			expiryYear: "22",
			startDate: "2018-09-01T00:00:00.000+1100",
			endDate: "2018-12-31T23:59:59.999+1100",
			chargeFrequency: "WEEKLY",
			chargeAmount: 25.99,
			chargeCycle: 2,
			expired: false,
			updateURL:
				"https://{environment}.mobile-api.woolworths.com.au/wow/v1/pay/paymentagreements/27e07e4e-58df-4072-8e75-33dd464af667",
			stepUp: {
				type: "CAPTURE_CVV",
				mandatory: true,
				url:
					"https://uat.woolworthspay.com.au/container-ws/getCaptureFrame/cvv/353629ec-4cb5-4fc3-ab47-8c9c3f117ab8/90731"
			}
		}
	],
	googlePay: {
		paymentInstrumentId: "201155",
		paymentToken: "76a4c2f1-7620-4bc4-8f4f-01c1467ea318",
		status: "VERIFIED",
		lastUpdated: "2017-09-20T06:20:18.173Z",
		lastUsed: "2017-07-28T02:58:56.187Z",
		createdOn: "2017-11-06T08:38:09.890Z",
		primary: false,
		allowed: true,
		expired: true,
		stepUp: {
			type: "REFRESH_TOKEN",
			mandatory: true,
			url:
				"https://{environment}.mobile-api.woolworths.com.au/wow/v1/pay/googlepay/tokenize/201155"
		}
	},
	applePay: {
		paymentInstrumentId: "16161",
		paymentToken: "64dee650-e42e-11e9-81b4-2a2ae2dbcce4",
		status: "VERIFIED",
		lastUpdated: "2017-07-28T02:58:56.187Z",
		lastUsed: "2017-09-20T06:20:18.173Z",
		createdOn: "2017-11-06T08:38:09.890Z",
		primary: false,
		allowed: true,
		stepUp: {
			type: "REFRESH_TOKEN",
			mandatory: true,
			url:
				"https://{environment}.mobile-api.woolworths.com.au/wow/v1/pay/applepay/tokenize/16161"
		}
	}
});

exports.VerifyPaymentInstrumentsRequest = () => ({
	clientReference: "T5ESYRPWJKPHF54",
	paymentInstruments: [
		{
			paymentToken: "f63fbfa8-0a2f-48a6-9162-6b102161a05b",
			stepUpToken: "e86b3a32-96a5-4659-b6d8-5d685bfa78e8"
		}
	],
	fraudPayload: {
		provider: "cybersource",
		version: "CyberSourceTransaction_1.101",
		format: "ZIP_BASE_64_ENCODED",
		responseFormat: "ZIP_BASE_64_ENCODED",
		message: "GzbOxpLagX6iFEb7td61cZyA="
	}
});

exports.VerifyPaymentInstrumentsResponseDTO = () => ({
	transactionReceipt: "1000000009303280",
	partialSuccess: false,
	fraudResponse: {
		clientId: "5615334856056397603065",
		reasonCode: "100",
		decision: "ACCEPT"
	},
	verifyResponses: [
		{
			paymentToken: "f63fbfa8-0a2f-48a6-9162-6b102161a05b",
			verifyTransactionRef: "1000000009303281",
			externalServiceCode: "00",
			externalServiceMessage: "ACCEPTED"
		}
	]
});
