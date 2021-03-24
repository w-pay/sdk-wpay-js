"use strict";
const { v4: uuid } = require("uuid");
const { assertThat, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { paymentAgreementFrom } = require("../matchers/payment-agreements-matchers");

const apiFactory = require("../../src/api/merchant-payment-agreements");

const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");
const {
	PaymentAgreementResponse,
	ChargePaymentAgreementRequest
} = require("../data/payment-agreements");

describe("MerchantPaymentAgreementsApi", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("charge", function () {
		const paymentToken = uuid();

		beforeEach(function () {
			apiClient.response = {
				data: PaymentAgreementResponse(),
				meta: {}
			};
		});

		it("should throw error when payment token is missing", function () {
			assertThat(() => api.charge(), throws(requiredParameterError("paymentToken")));
		});

		it("should throw error when charge request is missing", function () {
			assertThat(
				() => api.charge(paymentToken),
				throws(requiredParameterError("chargePaymentAgreementRequest"))
			);
		});

		it("should set request params", async function () {
			const request = ChargePaymentAgreementRequest();
			await api.charge(paymentToken, request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.PUT,
					url: "/instore/merchant/payments/agreements/:paymentToken",
					body: is(request)
				})
			);
		});

		it("should charge payment agreement", async function () {
			const result = await api.charge(paymentToken, ChargePaymentAgreementRequest());

			assertThat(result, is(paymentAgreementFrom(apiClient.response.data)));
		});
	});

	describe("delete", function () {
		const paymentToken = uuid();

		it("should throw error if paymentToken is missing", function () {
			assertThat(() => api.delete(), throws(requiredParameterError("paymentToken")));
		});

		it("should set request params", async function () {
			await api.delete(paymentToken);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.DELETE,
					url: "/instore/merchant/payments/agreements/:paymentToken",
					pathParams: {
						paymentToken
					}
				})
			);
		});
	});
});
