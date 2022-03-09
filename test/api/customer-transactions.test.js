"use strict";

const { v4: uuid } = require("uuid");

const { assertThat, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/customer-transactions");

const {
	customerTransactionDetailsFrom,
	customerTransactionSummariesFrom
} = require("../matchers/customer-transactions-matchers");
const {
	customerTransactionDetailsDTO,
	customerTransactionSummariesDTO
} = require("../data/customer-transactions");
const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");

describe("CustomerTransactionsApi", function () {
	let apiClient;

	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("list", function () {
		beforeEach(function () {
			apiClient.response = {
				data: customerTransactionSummariesDTO(),
				meta: {}
			};
		});

		it("should set request params", async function () {
			await api.list();

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/instore/customer/transactions",
					queryParams: {}
				})
			);
		});

		it("should set optional request params", async function () {
			const paymentRequestId = uuid();
			const page = 10;
			const pageSize = 50;
			const endTime = new Date();
			const startTime = new Date();

			await api.list(paymentRequestId, page, pageSize, endTime, startTime);

			assertThat(
				apiClient.request.queryParams,
				is({
					paymentRequestId,
					page,
					pageSize,
					endTime: endTime.toISOString(),
					startTime: startTime.toISOString()
				})
			);
		});

		it("should return customer transactions", async function () {
			const result = await api.list();

			assertThat(result, is(customerTransactionSummariesFrom(apiClient.response.data)));
		});
	});

	describe("getById", function () {
		const transactionId = uuid();

		beforeEach(function () {
			apiClient.response = {
				data: customerTransactionDetailsDTO(),
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
					url: "/instore/customer/transactions/:transactionId",
					pathParams: {
						transactionId
					}
				})
			);
		});

		it("should get customer transaction details", async function () {
			const result = await api.getById(transactionId);

			assertThat(result, is(customerTransactionDetailsFrom(apiClient.response.data)));
		});
	});
});
