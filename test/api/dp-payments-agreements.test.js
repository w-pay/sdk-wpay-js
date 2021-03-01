"use strict";
const { v4: uuid } = require("uuid");
const { assertThat, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/dp-payment-agreements");

const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");
const {
	digitalPayCreatePaymentAgreementRequest,
	digitalPayPaymentAgreementResponse,
	digitalPayUpdatePaymentAgreementRequest,
	digitalPayChargePaymentAgreementRequest
} = require("../data/dp-payment-agreements");

describe("PaymentAgreementsApi", function () {
	let apiClient;

	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("create", function () {
		beforeEach(function () {
			apiClient.response = digitalPayPaymentAgreementResponse();
		});

		it("should throw error when payment request is missing", function () {
			assertThat(
				() => api.create(),
				throws(requiredParameterError("createPaymentAgreementRequest"))
			);
		});

		it("should set request params", async function () {
			const request = digitalPayCreatePaymentAgreementRequest();
			await api.create(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/paymentagreements",
					body: is(request)
				})
			);
		});

		it("should create payment agreement", async function () {
			const result = await api.create(digitalPayCreatePaymentAgreementRequest());

			assertThat(result, is(digitalPayPaymentAgreementResponse()));
		});
	});

	describe("update", function () {
		const paymentToken = uuid();

		beforeEach(function () {
			apiClient.response = digitalPayPaymentAgreementResponse();
		});

		it("should throw error when payment token is missing", function () {
			assertThat(() => api.update(), throws(requiredParameterError("paymentToken")));
		});

		it("should throw error when update request is missing", function () {
			assertThat(
				() => api.update(paymentToken),
				throws(requiredParameterError("updatePaymentAgreementRequest"))
			);
		});

		it("should set request params", async function () {
			const request = digitalPayUpdatePaymentAgreementRequest();
			await api.update(paymentToken, request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/paymentagreements/:paymentToken",
					pathParams: {
						paymentToken
					},
					body: is(request)
				})
			);
		});

		it("should update payment agreement", async function () {
			const result = await api.update(paymentToken, digitalPayUpdatePaymentAgreementRequest());

			assertThat(result, is(digitalPayPaymentAgreementResponse()));
		});
	});

	describe("charge", function () {
		beforeEach(function () {
			apiClient.response = digitalPayPaymentAgreementResponse();
		});

		it("should throw error when completion request is missing", function () {
			assertThat(
				() => api.charge(),
				throws(requiredParameterError("chargePaymentAgreementRequest"))
			);
		});

		it("should set request params", async function () {
			const request = digitalPayChargePaymentAgreementRequest();
			await api.charge(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/paymentagreements/charge",
					body: is(request)
				})
			);
		});

		it("should charge payment agreement", async function () {
			const result = await api.charge(digitalPayChargePaymentAgreementRequest());

			assertThat(result, is(digitalPayPaymentAgreementResponse()));
		});
	});

	describe("delete", function () {
		const paymentToken = uuid();

		it("should set request params", async function () {
			await api.delete(paymentToken);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.DELETE,
					url: "/paymentagreements/:paymentToken",
					pathParams: {
						paymentToken
					}
				})
			);
		});
	});
});
