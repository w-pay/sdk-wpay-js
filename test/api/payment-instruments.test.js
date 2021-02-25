"use strict";

const { v4: uuid } = require("uuid");

const { assertThat, equalTo, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/payment-instruments");
const { X_EVERYDAY_PAY_WALLET } = require("../../src/headers/header-names");
const { Wallet } = require("../../src/model/enums");

const { body, withData } = require("../matchers/request-body-matchers");
const {
	paymentInstrumentAddedFrom,
	walletContentsFrom
} = require("../matchers/payment-instrument-matchers");
const { requiredParameterError } = require("../matchers/required-parameters");
const { walletContentsDTO } = require("../data/payment-instruments");
const { StubApiClient } = require("../stub-api-client");

describe("PaymentInstrumentsApi", function () {
	let apiClient;

	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("list", function () {
		beforeEach(function () {
			apiClient.response = {
				data: walletContentsDTO(),
				meta: {}
			};
		});

		it("should throw error if wallet is missing", function () {
			assertThat(() => api.list(), throws(requiredParameterError("wallet")));
		});

		it("should set request params", async function () {
			await api.list(Wallet.EVERYDAY_PAY);

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/customer/instruments",
					headers: {
						[X_EVERYDAY_PAY_WALLET]: "true"
					}
				})
			);
		});

		it("should list payment instruments", async function () {
			const result = await api.list(Wallet.MERCHANT);

			assertThat(result, is(walletContentsFrom(apiClient.response.data)));
		});
	});

	describe("delete", function () {
		const instrument = {
			paymentInstrumentId: "dfadfdagaeg",
			wallet: Wallet.MERCHANT
		};

		it("should throw error if instrument is missing", function () {
			assertThat(() => api.delete(), throws(requiredParameterError("instrument")));
		});

		it("should set request params", async function () {
			await api.delete(instrument);

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.DELETE,
					url: "/customer/instruments/:paymentInstrumentId",
					headers: {
						[X_EVERYDAY_PAY_WALLET]: "false"
					},
					pathParams: {
						paymentInstrumentId: instrument.paymentInstrumentId
					}
				})
			);
		});
	});

	describe("initiateAddition", function () {
		const newPaymentInstrument = {
			clientReference: uuid(),
			wallet: Wallet.MERCHANT
		};

		beforeEach(function () {
			apiClient.response = {
				data: {
					cardCaptureURL: "http://foo.com",
					transactionRef: uuid()
				},
				meta: {}
			};
		});

		it("should throw error if instrument is missing", function () {
			assertThat(() => api.initiateAddition(), throws(requiredParameterError("instrument")));
		});

		it("should set request params", async function () {
			await api.initiateAddition(newPaymentInstrument);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/customer/instruments",
					headers: {
						[X_EVERYDAY_PAY_WALLET]: "false"
					},
					body: is(
						body(
							withData(
								equalTo({
									clientReference: newPaymentInstrument.clientReference
								})
							)
						)
					)
				})
			);
		});

		it("should initiate addon", async function () {
			const result = await api.initiateAddition(newPaymentInstrument);

			assertThat(result, is(paymentInstrumentAddedFrom(apiClient.response.data)));
		});
	});
});
