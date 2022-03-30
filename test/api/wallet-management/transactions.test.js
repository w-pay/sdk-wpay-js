"use strict";

const { assertThat, is } = require("hamjest");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");

const {
	TransactionHistoryRequestDTO,
	TransactionHistoryResponseDTO
} = require("../../data/wallet-management/transaction-history");
const apiFactory = require("../../../src/api/wallet-management/transactions");

describe("Transactions", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
		apiClient.response = TransactionHistoryResponseDTO();
	});

	describe("history", function () {
		it("should set request params", async function () {
			await api.history(TransactionHistoryRequestDTO());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/transactions"));
			assertThat(request.body, is(TransactionHistoryRequestDTO()));
		});

		it("should return transaction history", async function () {
			const result = await api.history(TransactionHistoryRequestDTO());
			assertThat(result, is(TransactionHistoryResponseDTO()));
		});
	});
});
