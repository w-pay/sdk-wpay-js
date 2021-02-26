"use strict";

const { assertThat, is, throws } = require("hamjest");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");
const { requiredParameterError } = require("../../matchers/required-parameters");
const { v4: uuid } = require("uuid");
const { TokenizeGooglePayResponseDTO } = require("../../data/wallet-management/TokenizeGooglePayResponse");
const { TokenizeGooglePayRequestDTO } = require("../../data/wallet-management/TokenizeGooglePayRequest");
const apiFactory = require("../../../src/api/wallet-management/google-pay");

describe("GooglePay", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
		apiClient.response = {
			data: TokenizeGooglePayResponseDTO(),
			meta: {}
		};
	});

    describe("tokenize", function () {
        it("should set request params", async function () {
            await api.tokenize(TokenizeGooglePayRequestDTO());
            const request = apiClient.request;
    
            assertThat(request.method, is(HttpRequestMethod.POST));
            assertThat(request.url, is("/googlepay/tokenize"));
			assertThat(request.body, is(TokenizeGooglePayRequestDTO()));
        });
    
        it("should return TokenizeGooglePayResponseDTO", async function () {
            const result = await api.tokenize(TokenizeGooglePayRequestDTO());
            assertThat(result.data, is(TokenizeGooglePayResponseDTO()));
        });
	});

	describe("guestTokenize", function () {
        it("should set request params", async function () {
            await api.guestTokenize(TokenizeGooglePayRequestDTO());
            const request = apiClient.request;
    
            assertThat(request.method, is(HttpRequestMethod.POST));
            assertThat(request.url, is("/guest/googlepay/tokenize"));
			assertThat(request.body, is(TokenizeGooglePayRequestDTO()));
        });
    
        it("should return TokenizeGooglePayResponseDTO", async function () {
            const result = await api.guestTokenize(TokenizeGooglePayRequestDTO());
            assertThat(result.data, is(TokenizeGooglePayResponseDTO()));
        });
	});


    describe("update", function () {
		it("should throw error if paymentToken is missing", async function () {
			assertThat(() => api.update(), throws(requiredParameterError("paymentToken")));
		});

		it("should set request params", async function () {
			const paymentToken = uuid();
			await api.update(paymentToken, TokenizeGooglePayRequestDTO());

			const request = apiClient.request;
			assertThat(request.method, is(HttpRequestMethod.POST));
            assertThat(request.url, is("/googlepay/tokenize/:paymentToken"));
			assertThat(request.pathParams, is({paymentToken}));
			assertThat(request.body, is(TokenizeGooglePayRequestDTO()));
		});
		

		it("should return TokenizeGooglePayResponseDTO", async function () {
			const result = await api.update(uuid(), TokenizeGooglePayRequestDTO());
            assertThat(result.data, is(TokenizeGooglePayResponseDTO()));
		});
	});
});