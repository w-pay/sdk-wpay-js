"use strict";
const { v4: uuid } = require("uuid");
const { assertThat, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const {
	digitalPayPaymentAgreementFrom
} = require("../matchers/digitalpay/payment-agreements-matchers");
const { body, withData, withMeta } = require("../matchers/request-body-matchers");

const apiFactory = require("../../src/api/merchant-payment-agreements");

const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");
const { chargePaymentAgreementRequest } = require("../data/payment-agreements");
const { digitalPayPaymentAgreementDTO } = require("../data/digitalpay/payment-agreements");
const { fraudPayloadDTO } = require("../data/fraud-payload");
const { fraudPayloadDTOFrom } = require("../matchers/fraud-payload-matchers");

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
				data: digitalPayPaymentAgreementDTO(),
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
			const request = chargePaymentAgreementRequest();
			await api.charge(paymentToken, request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.PUT,
					url: "/instore/merchant/payments/agreements/:paymentToken",
					pathParams: {
						paymentToken
					},
					body: is(body(withData(request)))
				})
			);
		});

		it("should set optional params", async function () {
			const request = chargePaymentAgreementRequest();
			const fraudPayload = fraudPayloadDTO();
			await api.charge(paymentToken, request, fraudPayload);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.PUT,
					url: "/instore/merchant/payments/agreements/:paymentToken",
					body: is(body(withData(request), withMeta(fraudPayloadDTOFrom(fraudPayload))))
				})
			);
		});

		it("should charge payment agreement", async function () {
			const result = await api.charge(paymentToken, chargePaymentAgreementRequest());

			assertThat(result, is(digitalPayPaymentAgreementFrom(apiClient.response.data)));
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
