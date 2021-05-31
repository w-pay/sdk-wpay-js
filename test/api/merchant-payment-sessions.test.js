"use strict";

const { v4: uuid } = require("uuid");

const { assertThat, equalTo, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/merchant-payment-sessions");

const {
	aCreatePaymentSessionRequest,
	aMerchantUpdatePaymentSessionRequest,
	createPaymentSessionResultDTO,
	paymentSessionDTO
} = require("../data/payment-session");
const { body, withData } = require("../matchers/request-body-matchers");
const {
	paymentSessionFrom,
	paymentSessionCreatedFrom
} = require("../matchers/payment-session-matchers");
const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");

describe("MerchantPaymentSessionsApi", function () {
	let apiClient;

	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("create", function () {
		const request = aCreatePaymentSessionRequest();

		beforeEach(function () {
			apiClient.response = {
				data: createPaymentSessionResultDTO(),
				meta: {}
			};
		});
		it("should throw error when request is missing", function () {
			assertThat(() => api.create(), throws(requiredParameterError("request")));
		});

		it("should set request params", async function () {
			await api.create(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/instore/merchant/payment/session",
					body: is(body(withData(equalTo(request))))
				})
			);
		});

		it("should create payment session", async function () {
			const result = await api.create(request);

			assertThat(result, is(paymentSessionCreatedFrom(apiClient.response.data)));
		});
	});

	describe("getById", function () {
		beforeEach(function () {
			apiClient.response = {
				data: paymentSessionDTO(),
				meta: {}
			};
		});

		const paymentSessionId = uuid();

		it("should throw error when paymentSessionId is missing", function () {
			assertThat(() => api.getById(), throws(requiredParameterError("paymentSessionId")));
		});

		it("should set request params", async function () {
			await api.getById(paymentSessionId);

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/instore/merchant/payment/session/:paymentSessionId",
					pathParams: {
						paymentSessionId
					}
				})
			);
		});

		it("should get payment session", async function () {
			const result = await api.getById(paymentSessionId);

			assertThat(result, is(paymentSessionFrom(apiClient.response.data)));
		});
	});

	describe("update", function () {
		const paymentSessionId = uuid();
		const session = aMerchantUpdatePaymentSessionRequest();

		it("should throw error when paymentSessionId is missing", function () {
			assertThat(() => api.update(), throws(requiredParameterError("paymentSessionId")));
		});

		it("should throw error when session is missing", function () {
			assertThat(() => api.update(paymentSessionId), throws(requiredParameterError("session")));
		});

		it("should set request params", async function () {
			await api.update(paymentSessionId, session);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/instore/merchant/payment/session/:paymentSessionId",
					pathParams: {
						paymentSessionId
					},
					body: is(body(withData(equalTo(session))))
				})
			);
		});
	});

	describe("delete", function () {
		const paymentSessionId = uuid();

		it("should throw error when paymentSessionId is missing", function () {
			assertThat(() => api.delete(), throws(requiredParameterError("paymentSessionId")));
		});

		it("should set request params", async function () {
			await api.delete(paymentSessionId);

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.DELETE,
					url: "/instore/merchant/payment/session/:paymentSessionId",
					pathParams: {
						paymentSessionId
					}
				})
			);
		});
	});
});
