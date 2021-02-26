"use strict";

const { assertThat, is } = require("hamjest");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");
const { TokenizePaypalResponseDTO } = require("../../data/wallet-management/TokenizePaypalResponse");
const { TokenizePaypalRequestDTO } = require("../../data/wallet-management/TokenizePaypalRequest");
const apiFactory = require("../../../src/api/wallet-management/paypal");

describe("AndroidPay", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
		apiClient.response = {
			data: TokenizePaypalResponseDTO(),
			meta: {}
		};
	});

    describe("tokenize", function () {
        it("should set request params", async function () {
            await api.tokenize(TokenizePaypalRequestDTO());
            const request = apiClient.request;
    
            assertThat(request.method, is(HttpRequestMethod.POST));
            assertThat(request.url, is("/paypal/tokenize"));
            assertThat(request.body, is(TokenizePaypalRequestDTO()));
        });
    
        it("should return TokenizePaypalResponseDTO", async function () {
            const result = await api.tokenize(TokenizePaypalRequestDTO());
            assertThat(result.data, is(TokenizePaypalResponseDTO()));
        });
	});

	describe("guestTokenize", function () {
        it("should set request params", async function () {
            await api.guestTokenize(TokenizePaypalRequestDTO());
            const request = apiClient.request;
    
            assertThat(request.method, is(HttpRequestMethod.POST));
            assertThat(request.url, is("/guest/paypal/tokenize"));
            assertThat(request.body, is(TokenizePaypalRequestDTO()));
        });
    
        it("should return TokenizePaypalResponseDTO", async function () {
            const result = await api.guestTokenize(TokenizePaypalRequestDTO());
            assertThat(result.data, is(TokenizePaypalResponseDTO()));
        });
	});
});