"use strict";

const { assertThat, is } = require("hamjest");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");

const {
	GiftcardsBalanceRequest,
	GiftcardsBalanceResponseDTO,
	TokenizeGiftcardRequest,
	TokenizeGiftcardResponseDTO
} = require("../../data/wallet-management/gift-cards");

const apiFactory = require("../../../src/api/wallet-management/gift-cards");

describe("GiftCards", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
	});

	describe("tokenize", function () {
		beforeEach(function () {
			apiClient.response = TokenizeGiftcardResponseDTO();
		});

		it("should set request params", async function () {
			await api.tokenize(TokenizeGiftcardRequest());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/giftcards/tokenize"));
			assertThat(request.body, is(TokenizeGiftcardRequest()));
		});

		it("should tokenise card", async function () {
			const result = await api.tokenize();

			assertThat(result, is(TokenizeGiftcardResponseDTO()));
		});
	});

	describe("guestTokenize", function () {
		beforeEach(function () {
			apiClient.response = TokenizeGiftcardResponseDTO();
		});

		it("should set request params", async function () {
			await api.guestTokenize(TokenizeGiftcardRequest());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/guest/giftcards/tokenize"));
			assertThat(request.body, is(TokenizeGiftcardRequest()));
		});

		it("should tokenise card", async function () {
			const result = await api.guestTokenize();

			assertThat(result, is(TokenizeGiftcardResponseDTO()));
		});
	});

	describe("balance", function () {
		beforeEach(function () {
			apiClient.response = GiftcardsBalanceResponseDTO();
		});

		it("should set request params", async function () {
			await api.balance(GiftcardsBalanceRequest());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/giftcards/balance"));
			assertThat(request.body, is(GiftcardsBalanceRequest()));
		});

		it("should return balance", async function () {
			const result = await api.balance(GiftcardsBalanceRequest());

			assertThat(result, is(GiftcardsBalanceResponseDTO()));
		});
	});
});
