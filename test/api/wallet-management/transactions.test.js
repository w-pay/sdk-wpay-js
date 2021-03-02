"use strict";

const { assertThat, is } = require("hamjest");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");
const {
	TransactionHistoryResponseDTO
} = require("../../data/wallet-management/TransactionHistoryResponse");
const {
	TransactionHistoryRequestDTO
} = require("../../data/wallet-management/TransactionHistoryRequest");
const apiFactory = require("../../../src/api/wallet-management/transactions");

describe("Transactions", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
		apiClient.response = {
			data: TransactionHistoryResponseDTO(),
			meta: {}
		};
	});

	describe("history", function () {
		it("should set request params", async function () {
			await api.history(TransactionHistoryRequestDTO());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/transactions"));
			assertThat(request.body, is(TransactionHistoryRequestDTO()));
		});

		it("should return TokenizeGiftcardResponseDTO", async function () {
			const result = await api.history(TransactionHistoryRequestDTO());
			assertThat(result.data, is(TransactionHistoryResponseDTO()));
		});
	});
});
