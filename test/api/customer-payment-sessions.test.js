"use strict";

const { v4: uuid } = require("uuid");

const { assertThat, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/customer-payment-sessions");

const { aChallengeResponse } = require("../data/challenge-response");
const {
	aCustomerUpdatePaymentSessionRequest,
	paymentSessionDTO
} = require("../data/payment-session");
const { aSecondaryPaymentInstrument } = require("../data/payment-instruments");
const { body, withData, withMeta } = require("../matchers/request-body-matchers");
const { challengeResponsesDTOFrom } = require("../matchers/challenge-response-matchers");
const { objFrom } = require("../matchers/map-matchers");
const { paymentDetailsDTOFrom } = require("../matchers/payment-instrument-matchers");
const { paymentPreferences } = require("../data/preferences");
const { paymentSessionFrom } = require("../matchers/payment-session-matchers");
const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");

describe("CustomerPaymentSessionsApi", function () {
	let apiClient;

	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
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
					url: "/instore/customer/payment/session/:paymentSessionId",
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

	describe("getByQRCodeId", function () {
		const qrCodeId = uuid();

		beforeEach(function () {
			apiClient.response = {
				data: paymentSessionDTO(),
				meta: {}
			};
		});

		it("should throw error when qrCodeId is missing", function () {
			assertThat(() => api.getByQRCodeId(), throws(requiredParameterError("qrCodeId")));
		});

		it("should set request params", async function () {
			await api.getByQRCodeId(qrCodeId);

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/instore/customer/payment/session/qr/:qrId",
					pathParams: {
						qrId: qrCodeId
					}
				})
			);
		});

		it("should get payment session", async function () {
			const result = await api.getByQRCodeId(qrCodeId);

			assertThat(result, is(paymentSessionFrom(apiClient.response.data)));
		});
	});

	describe("update", function () {
		const paymentSessionId = uuid();
		const session = aCustomerUpdatePaymentSessionRequest();

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
					url: "/instore/customer/payment/session/:paymentSessionId",
					pathParams: {
						paymentSessionId
					},
					body: is(
						body(
							withData(
								hasProperties({
									customerInfo: hasProperties({
										schemaId: is(session.customerInfo.schemaId),
										payload: objFrom(session.customerInfo.payload)
									})
								})
							)
						)
					)
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
					url: "/instore/customer/payment/session/:paymentSessionId",
					pathParams: {
						paymentSessionId
					}
				})
			);
		});
	});

	describe("preApprove", function () {
		const paymentSessionId = uuid();

		it("should throw error when paymentSessionId is missing", function () {
			assertThat(() => api.preApprove(), throws(requiredParameterError("paymentSessionId")));
		});

		it("should set request params", async function () {
			await api.preApprove(paymentSessionId);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.PUT,
					url: "/instore/customer/payment/session/:paymentSessionId",
					pathParams: {
						paymentSessionId
					},
					body: is(
						body(withData(paymentDetailsDTOFrom()), withMeta(challengeResponsesDTOFrom([])))
					)
				})
			);
		});

		it("should set optional request params", async function () {
			const primaryInstrument = uuid();
			const secondaryPaymentInstruments = [aSecondaryPaymentInstrument()];
			const skipRollback = true;
			const clientReference = "this is a reference";
			const prefs = paymentPreferences();
			const challengeResponses = [aChallengeResponse()];

			await api.preApprove(
				paymentSessionId,
				primaryInstrument,
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
								primaryInstrument,
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
	});
});
