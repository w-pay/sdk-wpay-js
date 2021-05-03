"use strict";
const { assertThat, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../../src/api/digital-pay/openpay-payments");

const { requiredParameterError } = require("../../matchers/required-parameters");
const { StubApiClient } = require("../../stub-api-client");
const {
	openPayPaymentRequest,
	openPayCompletionRequest,
	openPayCompletionResponse,
	openPayTransactionResponse,
	openPayVoidRequest,
	openPayRefundRequest,
	openPayRefundResponse,
	openPayVoidResponse
} = require("../../data/dp-openpay-payments");

describe("OpenPayApi", function () {
	let apiClient;

	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("pay", function () {
		beforeEach(function () {
			apiClient.response = openPayTransactionResponse();
		});

		it("should throw error when payment request is missing", function () {
			assertThat(() => api.pay(), throws(requiredParameterError("paymentRequest")));
		});

		it("should set request params", async function () {
			const request = openPayPaymentRequest();
			await api.pay(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/openpay/payments",
					body: is(request)
				})
			);
		});

		it("should create payment request", async function () {
			const result = await api.pay(openPayPaymentRequest());

			assertThat(result, is(openPayTransactionResponse()));
		});
	});

	describe("complete", function () {
		beforeEach(function () {
			apiClient.response = openPayCompletionResponse();
		});

		it("should throw error when completion request is missing", function () {
			assertThat(() => api.complete(), throws(requiredParameterError("completionRequest")));
		});

		it("should set request params", async function () {
			const request = openPayPaymentRequest();
			await api.complete(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/openpay/completions",
					body: is(request)
				})
			);
		});

		it("should complete payment request", async function () {
			const result = await api.complete(openPayCompletionRequest());

			assertThat(result, is(openPayCompletionResponse()));
		});
	});

	describe("voidPayment", function () {
		beforeEach(function () {
			apiClient.response = openPayVoidResponse();
		});

		it("should throw error when void request is missing", function () {
			assertThat(() => api.voidPayment(), throws(requiredParameterError("voidRequest")));
		});

		it("should set request params", async function () {
			const request = openPayVoidRequest();
			await api.voidPayment(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/openpay/voids",
					body: is(request)
				})
			);
		});

		it("should void payment request", async function () {
			const result = await api.voidPayment(openPayVoidRequest());

			assertThat(result, is(openPayVoidResponse()));
		});
	});

	describe("refund", function () {
		beforeEach(function () {
			apiClient.response = openPayRefundResponse();
		});

		it("should throw error when payment request is missing", function () {
			assertThat(() => api.refund(), throws(requiredParameterError("refundRequest")));
		});

		it("should set request params", async function () {
			const request = openPayRefundRequest();
			await api.refund(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/openpay/refunds",
					body: is(request)
				})
			);
		});

		it("should refund payment request", async function () {
			const result = await api.refund(openPayRefundRequest());

			assertThat(result, is(openPayRefundResponse()));
		});
	});
});
