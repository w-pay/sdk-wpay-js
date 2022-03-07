"use strict";

const { v4: uuid } = require("uuid");

const { assertThat, equalTo, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/customer-payment-requests");

const { aChallengeResponse } = require("../data/challenge-response");
const { aSecondaryPaymentInstrument } = require("../data/payment-instruments");
const { body, withData, withMeta } = require("../matchers/request-body-matchers");
const { challengeResponsesDTOFrom } = require("../matchers/challenge-response-matchers");
const {
	customerPaymentRequestDTO,
	immediatePaymentRequest,
	paymentTransactionType
} = require("../data/payment-request");
const { customerPaymentRequestFrom } = require("../matchers/payment-request-matchers");
const { customerTransactionSummaryDTO } = require("../data/customer-transactions");
const { fraudPayloadDTO } = require("../data/fraud-payload");
const { paymentMetaDTOFrom } = require("../matchers/payment-meta-matchers");
const {
	customerTransactionSummaryFrom
} = require("../matchers/customer-transactions-matchers");
const { paymentDetailsDTOFrom } = require("../matchers/payment-instrument-matchers");
const { paymentPreferences } = require("../data/preferences");
const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");

describe("CustomerPaymentRequestsApi", function () {
	let apiClient;

	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("getById", function () {
		beforeEach(function () {
			apiClient.response = {
				data: customerPaymentRequestDTO(),
				meta: {}
			};
		});

		it("should throw error if paymentRequestId is missing", async function () {
			assertThat(() => api.getById(), throws(requiredParameterError("paymentRequestId")));
		});

		it("should set request params", async function () {
			const paymentRequestId = uuid();

			await api.getById(paymentRequestId);

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/instore/customer/payments/:paymentRequestId",
					pathParams: {
						paymentRequestId
					}
				})
			);
		});

		it("should return CustomerPaymentRequest", async function () {
			const result = await api.getById(uuid());

			assertThat(result, is(customerPaymentRequestFrom(apiClient.response.data)));
		});
	});

	describe("getByQRCodeId", function () {
		beforeEach(function () {
			apiClient.response = {
				data: customerPaymentRequestDTO(),
				meta: {}
			};
		});

		it("should throw error if qrCodeId is missing", async function () {
			assertThat(() => api.getByQRCodeId(), throws(requiredParameterError("qrCodeId")));
		});

		it("should set request params", async function () {
			const qrCodeId = uuid();

			await api.getByQRCodeId(qrCodeId);

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/instore/customer/qr/:qrCodeId",
					pathParams: {
						qrCodeId
					}
				})
			);
		});

		it("should return CustomerPaymentRequest", async function () {
			const result = await api.getByQRCodeId(uuid());

			assertThat(result, is(customerPaymentRequestFrom(apiClient.response.data)));
		});
	});

	describe("makePayment", function () {
		beforeEach(function () {
			apiClient.response = {
				data: customerTransactionSummaryDTO(),
				meta: {}
			};
		});

		it("should throw error if paymentRequestId is missing", function () {
			assertThat(() => api.makePayment(), throws(requiredParameterError("paymentRequestId")));
		});

		it("should set request params", async function () {
			const paymentRequestId = "fhgut738484dfjkskdk";

			await api.makePayment(paymentRequestId);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.PUT,
					url: "/instore/customer/payments/:paymentRequestId",
					pathParams: {
						paymentRequestId
					},
					body: is(
						body(withData(paymentDetailsDTOFrom()), withMeta(challengeResponsesDTOFrom([])))
					)
				})
			);
		});

		it("should set optional parameters", async function () {
			const primaryPaymentInstrument = uuid();
			const secondaryPaymentInstruments = [aSecondaryPaymentInstrument()];
			const skipRollback = true;
			const allowPartialSuccess = true;
			const clientReference = "this is a reference";
			const prefs = paymentPreferences();
			const challengeResponses = [aChallengeResponse()];
			const fraudPayload = fraudPayloadDTO();
			const transactionType = paymentTransactionType();

			await api.makePayment(
				uuid(),
				primaryPaymentInstrument,
				secondaryPaymentInstruments,
				skipRollback,
				clientReference,
				prefs,
				challengeResponses,
				fraudPayload,
				transactionType,
				allowPartialSuccess
			);

			assertThat(
				apiClient.request.body,
				is(
					body(
						withData(
							paymentDetailsDTOFrom(
								primaryPaymentInstrument,
								secondaryPaymentInstruments,
								skipRollback,
								clientReference,
								prefs,
								transactionType,
								allowPartialSuccess
							)
						),
						withMeta(paymentMetaDTOFrom(challengeResponses, fraudPayload))
					)
				)
			);
		});

		it("should make a payment", async function () {
			apiClient.response.data = customerTransactionSummaryDTO();

			const result = await api.makePayment(uuid(), uuid());

			assertThat(result, is(customerTransactionSummaryFrom(apiClient.response.data)));
		});
	});

	describe("makeImmediatePayment", function () {
		beforeEach(function () {
			apiClient = new StubApiClient();

			api = apiFactory(apiClient.client());

			apiClient.response = {
				data: customerTransactionSummaryDTO(),
				meta: {}
			};
		});

		it("should throw error if paymentRequest is missing", function () {
			assertThat(
				() => api.makeImmediatePayment(),
				throws(requiredParameterError("paymentRequest"))
			);
		});

		it("should set request params", async function () {
			const request = immediatePaymentRequest();

			await api.makeImmediatePayment(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/instore/customer/payments",
					body: is(body(withData(equalTo(request)), withMeta(challengeResponsesDTOFrom([]))))
				})
			);
		});

		it("should set optional parameters", async function () {
			const request = immediatePaymentRequest();
			const challenges = [aChallengeResponse()];
			const fraudPayload = fraudPayloadDTO();

			await api.makeImmediatePayment(request, challenges, fraudPayload);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/instore/customer/payments",
					body: is(
						body(
							withData(equalTo(request)),
							withMeta(paymentMetaDTOFrom(challenges, fraudPayload))
						)
					)
				})
			);
		});

		it("should make an immediate payment", async function () {
			const result = await api.makeImmediatePayment(immediatePaymentRequest());

			assertThat(result, is(customerTransactionSummaryFrom(apiClient.response.data)));
		});
	});
});
