"use strict";
const { assertThat, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/dp-payments");

const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");
const {
	digitalPayPaymentResponse,
	digitalPayPaymentRequest,
	digitalPayCompletionRequest,
	digitalPayCompletionResponse,
	digitalPayVoidRequest,
	digitalPayRefundRequest,
	digitalPayRefundResponse,
	digitalPayVoidResponse
} = require("../data/dp-payments");

describe("digitalPayApi", function () {
	let apiClient;

	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("pay", function () {
		beforeEach(function () {
			apiClient.response = digitalPayPaymentResponse();
		});

		it("should throw error when payment request is missing", function () {
			assertThat(() => api.pay(), throws(requiredParameterError("paymentRequest")));
		});

		it("should set request params", async function () {
			const request = digitalPayPaymentRequest();
			await api.pay(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/payments",
					body: is(request)
				})
			);
		});

		it("should create payment request", async function () {
			const result = await api.pay(digitalPayPaymentRequest());

			assertThat(result, is(digitalPayPaymentResponse()));
		});
	});

	describe("guestPayment", function () {
		beforeEach(function () {
			apiClient.response = digitalPayPaymentResponse();
		});

		it("should throw error when payment request is missing", function () {
			assertThat(() => api.guestPayment(), throws(requiredParameterError("paymentRequest")));
		});

		it("should set request params", async function () {
			const request = digitalPayPaymentRequest();
			await api.guestPayment(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/guest/payments",
					body: is(request)
				})
			);
		});

		it("should create payment request", async function () {
			const result = await api.guestPayment(digitalPayPaymentRequest());

			assertThat(result, is(digitalPayPaymentResponse()));
		});
	});

	describe("complete", function () {
		beforeEach(function () {
			apiClient.response = digitalPayCompletionResponse();
		});

		it("should throw error when completion request is missing", function () {
			assertThat(() => api.complete(), throws(requiredParameterError("completionRequest")));
		});

		it("should set request params", async function () {
			const request = digitalPayPaymentRequest();
			await api.complete(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/completions",
					body: is(request)
				})
			);
		});

		it("should complete payment request", async function () {
			const result = await api.complete(digitalPayCompletionRequest());

			assertThat(result, is(digitalPayCompletionResponse()));
		});
	});

	describe("voidPayment", function () {
		beforeEach(function () {
			apiClient.response = digitalPayVoidResponse();
		});

		it("should throw error when void request is missing", function () {
			assertThat(() => api.voidPayment(), throws(requiredParameterError("voidRequest")));
		});

		it("should set request params", async function () {
			const request = digitalPayVoidRequest();
			await api.voidPayment(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/voids",
					body: is(request)
				})
			);
		});

		it("should void payment request", async function () {
			const result = await api.voidPayment(digitalPayVoidRequest());

			assertThat(result, is(digitalPayVoidResponse()));
		});
	});

	describe("refund", function () {
		beforeEach(function () {
			apiClient.response = digitalPayRefundResponse();
		});

		it("should throw error when payment request is missing", function () {
			assertThat(() => api.refund(), throws(requiredParameterError("refundRequest")));
		});

		it("should set request params", async function () {
			const request = digitalPayRefundRequest();
			await api.refund(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/refunds",
					body: is(request)
				})
			);
		});

		it("should refund payment request", async function () {
			const result = await api.refund(digitalPayRefundRequest());

			assertThat(result, is(digitalPayRefundResponse()));
		});
	});
});
