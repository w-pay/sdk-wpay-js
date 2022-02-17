"use strict";

const { assertThat, is, throws } = require("hamjest");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");
const { requiredParameterError } = require("../../matchers/required-parameters");
const { v4: uuid } = require("uuid");
const {
	TokenizeApplePayResponseDTO
} = require("../../data/wallet-management/TokenizeApplePayResponse");
const {
	TokenizeApplePayRequestDTO
} = require("../../data/wallet-management/TokenizeApplePayRequest");
const apiFactory = require("../../../src/api/wallet-management/apple-pay");
const { StartSessionApplePayRequestDTO } = require("../../data/wallet-management/StartSessionApplePayRequest");

describe("ApplePay", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
		apiClient.response = {
			data: TokenizeApplePayResponseDTO(),
			meta: {}
		};
	});

	describe("startSession", function () {
		it("should set request params", async function () {
			await api.startSession(StartSessionApplePayRequestDTO());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/applepay/startSession"));
			assertThat(request.body, is(StartSessionApplePayRequestDTO()));
		});

	});

	describe("tokenize", function () {
		it("should set request params", async function () {
			await api.tokenize(TokenizeApplePayRequestDTO());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/applepay/tokenize"));
			assertThat(request.body, is(TokenizeApplePayRequestDTO()));
		});

		it("should return TokenizeApplePayResponseDTO", async function () {
			const result = await api.tokenize(TokenizeApplePayRequestDTO());
			assertThat(result.data, is(TokenizeApplePayResponseDTO()));
		});
	});

	describe("guestTokenize", function () {
		it("should set request params", async function () {
			await api.guestTokenize(TokenizeApplePayRequestDTO());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/guest/applepay/tokenize"));
			assertThat(request.body, is(TokenizeApplePayRequestDTO()));
		});

		it("should return TokenizeApplePayResponseDTO", async function () {
			const result = await api.guestTokenize(TokenizeApplePayRequestDTO());
			assertThat(result.data, is(TokenizeApplePayResponseDTO()));
		});
	});

	describe("update", function () {
		it("should throw error if paymentInstrumentId is missing", async function () {
			assertThat(() => api.update(), throws(requiredParameterError("paymentInstrumentId")));
		});

		it("should set request params", async function () {
			const paymentInstrumentId = uuid();
			await api.update(paymentInstrumentId, TokenizeApplePayRequestDTO());

			const request = apiClient.request;
			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/applepay/tokenize/:paymentInstrumentId"));
			assertThat(request.pathParams, is({ paymentInstrumentId }));
			assertThat(request.body, is(TokenizeApplePayRequestDTO()));
		});

		it("should return TokenizeApplePayResponseDTO", async function () {
			const result = await api.update(uuid());
			assertThat(result.data, is(TokenizeApplePayResponseDTO()));
		});
	});
});
