"use strict";

const { v4: uuid } = require("uuid");

const { assertThat, equalTo, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/payment-instruments");
const { Wallet } = require("../../src/model/enums");

const { body, withData } = require("../matchers/request-body-matchers");
const {
	individualPaymentInstrumentFrom,
	paymentInstrumentAddedFrom,
	walletContentsFrom
} = require("../matchers/payment-instrument-matchers");
const { requiredParameterError } = require("../matchers/required-parameters");
const {
	individualPaymentInstrumentDTO,
	walletContentsDTO
} = require("../data/payment-instruments");
const { StubApiClient } = require("../stub-api-client");

describe("PaymentInstrumentsApi", function () {
	let apiClient;

	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("getByToken", function () {
		const paymentToken = uuid();

		beforeEach(function () {
			apiClient.response = {
				data: individualPaymentInstrumentDTO(),
				meta: {
					cipherText: "fgjkagjkl;dkls;jsdjfdafjafkadkl;f"
				}
			};
		});

		it("should throw error if payment token is missing", function () {
			assertThat(() => api.getByToken(), throws(requiredParameterError("paymentToken")));
		});

		it("should throw error if wallet is missing", function () {
			assertThat(() => api.getByToken(paymentToken), throws(requiredParameterError("wallet")));
		});

		it("should set request parameters", async function () {
			await api.getByToken(paymentToken, Wallet.MERCHANT);

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/instore/customer/instruments/:paymentToken",
					pathParams: {
						paymentToken
					},
					queryParams: {}
				})
			);
		});

		it("should set optional request parameters", async function () {
			const publicKey = "dkjfgadko;fgjai;gja;ig";

			await api.getByToken(paymentToken, Wallet.MERCHANT, publicKey);

			assertThat(
				apiClient.request.queryParams,
				is({
					publicKey
				})
			);
		});

		it("should get payment instrument", async function () {
			const result = await api.getByToken(paymentToken, Wallet.EVERYDAY_PAY);

			assertThat(result, is(individualPaymentInstrumentFrom(apiClient.response)));
		});
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
					url: "/instore/customer/instruments"
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
					url: "/instore/customer/instruments/:paymentInstrumentId",
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
					url: "/instore/customer/instruments",
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
