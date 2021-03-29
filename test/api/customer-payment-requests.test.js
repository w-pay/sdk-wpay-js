"use strict";

const { v4: uuid } = require("uuid");

const { assertThat, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/customer-payment-requests");

const { aChallengeResponse } = require("../data/challenge-response");
const { aSecondaryPaymentInstrument } = require("../data/payment-instruments");
const { body, withData, withMeta } = require("../matchers/request-body-matchers");
const { challengeResponsesDTOFrom } = require("../matchers/challenge-response-matchers");
const { customerPaymentRequestDTO } = require("../data/payment-request");
const { customerPaymentRequestFrom } = require("../matchers/payment-request-matchers");
const { customerTransactionSummaryDTO } = require("../data/customer-transactions");
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

		apiClient.response = {
			data: customerPaymentRequestDTO(),
			meta: {}
		};
	});

	describe("getById", function () {
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
			const clientReference = "this is a reference";
			const prefs = paymentPreferences();
			const challengeResponses = [aChallengeResponse()];

			await api.makePayment(
				uuid(),
				primaryPaymentInstrument,
				secondaryPaymentInstruments,
				skipRollback,
				clientReference,
				prefs,
				challengeResponses
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
								prefs
							)
						),
						withMeta(challengeResponsesDTOFrom(challengeResponses))
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
});
