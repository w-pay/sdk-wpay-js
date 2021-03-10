"use strict";
const { v4: uuid } = require("uuid");
const { assertThat, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const {
	paymentAgreementFrom,
	paymentAgreementsFrom
} = require("../matchers/payment-agreements-matchers");

const apiFactory = require("../../src/api/customer-payment-agreements");
const { aChallengeResponse } = require("../data/challenge-response");
const { body, withData, withMeta } = require("../matchers/request-body-matchers");
const { challengeResponsesDTOFrom } = require("../matchers/challenge-response-matchers");
const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");
const {
	PaymentAgreementResponse,
	CreatePaymentAgreementRequest,
	UpdatePaymentAgreementRequest,
	ListPaymentAgreementsResponse
} = require("../data/payment-agreements");

describe("CustomerPaymentAgreementsApi", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("list", function () {
		beforeEach(function () {
			apiClient.response = {
				data: ListPaymentAgreementsResponse(),
				meta: {}
			};
		});

		it("should set request params", async function () {
			await api.list();

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/instore/customer/payments/agreements"
				})
			);
		});

		it("should get payment agreements", async function () {
			const result = await api.list();

			assertThat(result, is(paymentAgreementsFrom(apiClient.response.data)));
		});
	});

	describe("getById", function () {
		const paymentToken = uuid();

		beforeEach(function () {
			apiClient.response = {
				data: PaymentAgreementResponse(),
				meta: {}
			};
		});

		it("should throw error when payment token is missing", function () {
			assertThat(() => api.getById(), throws(requiredParameterError("paymentToken")));
		});

		it("should set request params", async function () {
			await api.getById(paymentToken);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.GET,
					url: "/instore/customer/payments/agreements/:paymentToken"
				})
			);
		});

		it("should get payment agreement", async function () {
			const result = await api.getById(paymentToken);

			assertThat(result, is(paymentAgreementFrom(apiClient.response.data)));
		});
	});

	describe("create", function () {
		beforeEach(function () {
			apiClient.response = {
				data: PaymentAgreementResponse(),
				meta: {}
			};
		});

		it("should throw error when create request is missing", function () {
			assertThat(
				() => api.create(),
				throws(requiredParameterError("createPaymentAgreementRequest"))
			);
		});

		it("should set request params", async function () {
			const request = CreatePaymentAgreementRequest();
			const challengeResponses = [aChallengeResponse()];
			await api.create(request, challengeResponses);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/instore/customer/payments/agreements",
					body: is(
						body(withData(request), withMeta(challengeResponsesDTOFrom(challengeResponses)))
					)
				})
			);
		});

		it("should create payment agreement", async function () {
			const result = await api.create(CreatePaymentAgreementRequest());

			assertThat(result, is(paymentAgreementFrom(apiClient.response.data)));
		});
	});

	describe("update", function () {
		const paymentToken = uuid();

		beforeEach(function () {
			apiClient.response = {
				data: PaymentAgreementResponse(),
				meta: {}
			};
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
			const request = UpdatePaymentAgreementRequest();
			const challengeResponses = [aChallengeResponse()];
			await api.update(paymentToken, request, challengeResponses);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/instore/customer/payments/agreements/:paymentToken"
				})
			);

			assertThat(
				apiClient.request.body,
				is(body(withData(request), withMeta(challengeResponsesDTOFrom(challengeResponses))))
			);
		});

		it("should update payment agreement", async function () {
			const result = await api.update(paymentToken, UpdatePaymentAgreementRequest());

			assertThat(result, is(paymentAgreementFrom(apiClient.response.data)));
		});
	});
});
