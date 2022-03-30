"use strict";

const { assertThat, is } = require("hamjest");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");

const {
	TokenizePaypalRequest,
	TokenizePaypalResponseDTO
} = require("../../data/wallet-management/paypal");
const apiFactory = require("../../../src/api/wallet-management/paypal");

describe("PayPal", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
		apiClient.response = TokenizePaypalResponseDTO();
	});

	describe("tokenize", function () {
		it("should set request params", async function () {
			await api.tokenize(TokenizePaypalRequest());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/paypal/tokenize"));
			assertThat(request.body, is(TokenizePaypalRequest()));
		});

		it("should tokenize instrument", async function () {
			const result = await api.tokenize(TokenizePaypalRequest());

			assertThat(result, is(TokenizePaypalResponseDTO()));
		});
	});

	describe("guestTokenize", function () {
		it("should set request params", async function () {
			await api.guestTokenize(TokenizePaypalRequest());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/guest/paypal/tokenize"));
			assertThat(request.body, is(TokenizePaypalRequest()));
		});

		it("should tokenize instrument", async function () {
			const result = await api.guestTokenize(TokenizePaypalRequest());

			assertThat(result, is(TokenizePaypalResponseDTO()));
		});
	});
});
