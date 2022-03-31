"use strict";

const { assertThat, is, throws } = require("hamjest");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");
const { requiredParameterError } = require("../../matchers/required-parameters");
const { v4: uuid } = require("uuid");

const {
	TokenizeAndroidPayRequest,
	TokenizeAndroidPayResponseDTO
} = require("../../data/wallet-management/android-pay");
const apiFactory = require("../../../src/api/wallet-management/android-pay");

describe("AndroidPay", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
		apiClient.response = TokenizeAndroidPayResponseDTO();
	});

	describe("tokenize", function () {
		it("should set request params", async function () {
			await api.tokenize(TokenizeAndroidPayRequest());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/androidpay/tokenize"));
			assertThat(request.body, is(TokenizeAndroidPayRequest()));
		});

		it("should tokenize", async function () {
			const result = await api.tokenize(TokenizeAndroidPayRequest());

			assertThat(result, is(TokenizeAndroidPayResponseDTO()));
		});
	});

	describe("update", function () {
		it("should throw error if paymentInstrumentId is missing", async function () {
			assertThat(() => api.update(), throws(requiredParameterError("paymentInstrumentId")));
		});

		it("should set request params", async function () {
			const paymentInstrumentId = uuid();
			await api.update(paymentInstrumentId, TokenizeAndroidPayRequest());

			const request = apiClient.request;
			assertThat(apiClient.request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/androidpay/tokenize/:paymentInstrumentId"));
			assertThat(request.pathParams, is({ paymentInstrumentId }));
			assertThat(request.body, is(TokenizeAndroidPayRequest()));
		});

		it("should update", async function () {
			const result = await api.update(uuid());

			assertThat(result, is(TokenizeAndroidPayResponseDTO()));
		});
	});
});
