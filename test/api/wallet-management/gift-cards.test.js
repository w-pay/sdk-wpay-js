"use strict";

const { assertThat, is } = require("hamjest");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");
const {
	TokenizeGiftcardResponseDTO
} = require("../../data/wallet-management/TokenizeGiftcardResponse");
const {
	GiftcardsBalanceResponseDTO
} = require("../../data/wallet-management/GiftcardsBalanceResponse");
const {
	TokenizeGiftcardRequestDTO
} = require("../../data/wallet-management/TokenizeGiftcardRequest");
const {
	GiftcardsBalanceRequestDTO
} = require("../../data/wallet-management/GiftcardsBalanceRequest");
const apiFactory = require("../../../src/api/wallet-management/gift-cards");

describe("GiftCards", function () {
	let apiClient;
	let api;

	function setResponse(response) {
		apiClient.response = {
			data: response,
			meta: {}
		};
	}

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
		apiClient.response = {
			data: TokenizeGiftcardResponseDTO(),
			meta: {}
		};
	});

	describe("tokenize", function () {
		it("should set request params", async function () {
			await api.tokenize(TokenizeGiftcardRequestDTO());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/giftcards/tokenize"));
			assertThat(request.body, is(TokenizeGiftcardRequestDTO()));
		});

		it("should return TokenizeGiftcardResponseDTO", async function () {
			const result = await api.tokenize();
			assertThat(result.data, is(TokenizeGiftcardResponseDTO()));
		});
	});

	describe("guestTokenize", function () {
		it("should set request params", async function () {
			await api.guestTokenize(TokenizeGiftcardRequestDTO());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/guest/giftcards/tokenize"));
			assertThat(request.body, is(TokenizeGiftcardRequestDTO()));
		});

		it("should return TokenizeGiftcardResponseDTO", async function () {
			const result = await api.guestTokenize();
			assertThat(result.data, is(TokenizeGiftcardResponseDTO()));
		});
	});

	describe("balance", function () {
		it("should set request params", async function () {
			await api.balance(GiftcardsBalanceRequestDTO());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/giftcards/tokenize"));
			assertThat(request.body, is(GiftcardsBalanceRequestDTO()));
		});

		it("should return GiftcardsBalanceResponseDTO", async function () {
			setResponse(GiftcardsBalanceResponseDTO());
			const result = await api.balance(GiftcardsBalanceRequestDTO());
			assertThat(result.data, is(GiftcardsBalanceResponseDTO()));
		});
	});
});
