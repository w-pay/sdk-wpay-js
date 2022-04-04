"use strict";

const { assertThat, is, throws } = require("hamjest");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");
const { requiredParameterError } = require("../../matchers/required-parameters");
const { v4: uuid } = require("uuid");

const {
	TokenizeGooglePayRequest,
	TokenizeGooglePayResponseDTO
} = require("../../data/wallet-management/google-pay");
const apiFactory = require("../../../src/api/wallet-management/google-pay");

describe("GooglePay", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
		apiClient.response = TokenizeGooglePayResponseDTO();
	});

	describe("tokenize", function () {
		it("should set request params", async function () {
			await api.tokenize(TokenizeGooglePayRequest());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/googlepay/tokenize"));
			assertThat(request.body, is(TokenizeGooglePayRequest()));
		});

		it("should tokenise", async function () {
			const result = await api.tokenize(TokenizeGooglePayRequest());

			assertThat(result, is(TokenizeGooglePayResponseDTO()));
		});
	});

	describe("guestTokenize", function () {
		it("should set request params", async function () {
			await api.guestTokenize(TokenizeGooglePayRequest());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/guest/googlepay/tokenize"));
			assertThat(request.body, is(TokenizeGooglePayRequest()));
		});

		it("should tokenize", async function () {
			const result = await api.guestTokenize(TokenizeGooglePayRequest());

			assertThat(result, is(TokenizeGooglePayResponseDTO()));
		});
	});

	describe("update", function () {
		it("should throw error if paymentToken is missing", async function () {
			assertThat(() => api.update(), throws(requiredParameterError("paymentToken")));
		});

		it("should set request params", async function () {
			const paymentToken = uuid();
			await api.update(paymentToken, TokenizeGooglePayRequest());

			const request = apiClient.request;
			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/googlepay/tokenize/:paymentToken"));
			assertThat(request.pathParams, is({ paymentToken }));
			assertThat(request.body, is(TokenizeGooglePayRequest()));
		});

		it("should update", async function () {
			const result = await api.update(uuid(), TokenizeGooglePayRequest());

			assertThat(result, is(TokenizeGooglePayResponseDTO()));
		});
	});
});
