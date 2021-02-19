"use strict";

const { assertThat, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/payment-instruments");
const { PaymentInstrumentStatus, Wallet } = require("../../src/model/enums");
const { X_EVERYDAY_PAY_WALLET } = require("../../src/headers/header-names");

const { requiredParameterError } = require("../matchers/required-parameters");
const {
	paymentInstrumentAdded,
	walletContents
} = require("../matchers/payment-instrument-matchers");
const { StubApiClient } = require("../stub-api-client");

describe("PaymentInstrumentsApi", function() {
	let apiClient;

	let api;

	beforeEach(function() {
		apiClient = new StubApiClient()

		api = apiFactory(apiClient.client());
	});

	describe("list", function() {
		beforeEach(function() {
			const base = {
				allowed: true,
				cardSuffix: "1234",
				lastUpdated: "2021-02-17T06:31:46.358Z",
				lastUsed: "2021-02-17T06:31:46.358Z",
				paymentToken: "token",
				primary: false,
				status: PaymentInstrumentStatus.UNVERIFIED_PERSISTENT,
				paymentInstrumentId: "abc123"
			}

			const creditCard = {
				...base,
				cardName: "My Card",
				cvvValidated: true,
				expired: true,
				expiryMonth: "02",
				expiryYear: "2100",
				requiresCVV: false,
				scheme: "visa",
				updateURL: "http://foobar.com",
				stepUp: {
					type: "CAPTURE_CVV",
					mandatory: false,
					url: "http://foobar.com"
				}
			}

			const giftCard = {
				...base,
				programName: "Gift cards",
				stepUp: {
					type: "REQUIRE_PASSCODE",
					mandatory: false
				}
			}

			apiClient.response = {
				data: {
					creditCards: [ creditCard ],
					giftCards: [ giftCard ],
					everydayPay: {
						creditCards: [ creditCard ],
						giftCards: [ giftCard ],
					}
				},
				meta: {}
			}
		})

		it("should throw error if wallet is missing", function() {
			assertThat(() => api.list(), throws(requiredParameterError("wallet")));
		});

		it("should set request params", async function() {
			await api.list(Wallet.EVERYDAY_PAY);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.GET,
				url: "/customer/instruments",
				headers: {
					[X_EVERYDAY_PAY_WALLET]: "true"
				}
			}))
		});

		it("should list payment instruments", async function() {
			const result = await api.list(Wallet.MERCHANT);

			assertThat(result, is(walletContents()));
		});
	});

	describe("delete", function() {
		const instrument = {
			paymentInstrumentId: "dfadfdagaeg",
			wallet: Wallet.MERCHANT
		}

		it("should throw error if instrument is missing", function() {
			assertThat(() => api.delete(), throws(requiredParameterError("instrument")));
		});

		it("should set request params", async function() {
			await api.delete(instrument);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.DELETE,
				url: "/customer/instruments/:paymentInstrumentId",
				headers: {
					[X_EVERYDAY_PAY_WALLET]: "false"
				},
				pathParams: {
					paymentInstrumentId: instrument.paymentInstrumentId
				}
			}));
		});
	});

	describe("initiateAddition", function() {
		const newPaymentInstrument = {
			clientReference: "abc123",
			wallet: Wallet.MERCHANT
		}

		beforeEach(function() {
			apiClient.response = {
				cardCaptureURL: "http://foo.com",
				transactionRef: "abc123"
			}
		})

		it("should throw error if instrument is missing", function() {
			assertThat(() => api.initiateAddition(), throws(requiredParameterError("instrument")));
		});

		it("should set request params", async function() {
			await api.initiateAddition(newPaymentInstrument);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.POST,
				url: "/customer/instruments",
				headers: {
					[X_EVERYDAY_PAY_WALLET]: "false"
				},
				body: {
					data: {
						clientReference: newPaymentInstrument.clientReference
					},
					meta: {}
				}
			}))
		});

		it("should initiate addon", async function() {
			const result = await api.initiateAddition(newPaymentInstrument);

			assertThat(result, is(paymentInstrumentAdded()));
		});
	});
});
