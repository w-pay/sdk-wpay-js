"use strict";

const { assertThat, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/merchant-transactions");
const {
	merchantTransactionDetailsFrom,
	merchantTransactionSummariesFrom
} = require("../matchers/merchant-transaction-matchers");
const {
	merchantTransactionDetailsDTO,
	merchantTransactionSummariesDTO
} = require("../data/merchant-transactions");
const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");

describe("MerchantTransactionsApi", function () {
	let apiClient;

	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("list", function () {
		beforeEach(function () {
			apiClient.response = {
				data: merchantTransactionSummariesDTO(),
				meta: {}
			};
		});

		it("should set request params", async function () {
			await api.list();

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/instore/merchant/transactions",
					queryParams: {}
				})
			);
		});

		it("should set optional request params", async function () {
			const page = 10;
			const pageSize = 50;
			const endTime = new Date();
			const startTime = new Date();

			await api.list(page, pageSize, endTime, startTime);

			assertThat(
				apiClient.request.queryParams,
				is({
					page,
					pageSize,
					endTime: endTime.toISOString(),
					startTime: endTime.toISOString()
				})
			);
		});

		it("should return merchant transactions", async function () {
			const result = await api.list();

			assertThat(result, is(merchantTransactionSummariesFrom(apiClient.response.data)));
		});
	});

	describe("getById", function () {
		const transactionId = "gjkghdfjlsghjg";

		beforeEach(function () {
			apiClient.response = {
				data: merchantTransactionDetailsDTO(),
				meta: {}
			};
		});

		it("should throw error when transactionId is missing", async function () {
			assertThat(() => api.getById(), throws(requiredParameterError("transactionId")));
		});

		it("should set request params", async function () {
			await api.getById(transactionId);

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/instore/merchant/transactions/:transactionId",
					pathParams: {
						transactionId
					}
				})
			);
		});

		it("should get merchant transaction details", async function () {
			const result = await api.getById(transactionId);

			assertThat(result, is(merchantTransactionDetailsFrom(apiClient.response.data)));
		});
	});
});
