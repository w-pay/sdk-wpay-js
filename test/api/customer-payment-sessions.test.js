"use strict";

const {
	allOf,
	assertThat,
	defined,
	equalTo,
	hasProperties,
	instanceOf,
	is,
	not,
	throws
} = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/customer-payment-sessions");
const { X_EVERYDAY_PAY_WALLET } = require("../../src/headers/header-names");

const { aChallengeResponse } = require("../data/test-challenge-response");
const {
	aSecondaryPaymentInstrument,
	aSelectedPaymentInstrument
} = require("../data/test-payment-instrument");
const { paymentSession } = require("../matchers/payment-session-matchers");
const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");
const { TestCustomerUpdatePaymentSessionRequest } =
	require("../data/test-update-payment-session-request");

const session = {
	paymentSessionId: "fadfadsads",
	paymentRequestId: undefined,
	merchantId: "fadddasfdasf",
	walletId: undefined,
	expiryTime: "2021-02-17T06:31:46.358Z",
	location: "location",
	merchantInfo: {
		schemaId: "abc",
		payload: {}
	},
	customerInfo: {
		schemaId: "abc",
		payload: {}
	}
}

describe("CustomerPaymentSessionsApi", function() {
	let apiClient;

	let api;

	beforeEach(function() {
		apiClient = new StubApiClient()

		api = apiFactory(apiClient.client());
	})

	describe("getById", function() {
		beforeEach(function() {
			apiClient.response = {
				data: session,
				meta: {}
			}
		});

		const paymentSessionId = "fdjfadfaj2312";

		it("should throw error when paymentSessionId is missing", function() {
			assertThat(() => api.getById(), throws(requiredParameterError("paymentSessionId")));
		});

		it("should set request params", async function() {
			await api.getById(paymentSessionId);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.GET,
				url: "/customer/payment/session/:paymentSessionId",
				pathParams: {
					paymentSessionId
				}
			}))
		});

		it("should get payment session", async function() {
			const result = await api.getById(paymentSessionId);

			assertThat(result, is(paymentSession()));
		});
	});

	describe("getByQRCodeId", function() {
		const qrCodeId = "dgjkkadsgkadfslg;d";

		beforeEach(function() {
			apiClient.response = {
				data: session,
				meta: {}
			}
		});

		it("should throw error when qrCodeId is missing", function() {
			assertThat(() => api.getByQRCodeId(), throws(requiredParameterError("qrCodeId")));
		});

		it("should set request params", async function() {
			await api.getByQRCodeId(qrCodeId);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.GET,
				url: "/customer/payment/session/qr/:qrId",
				pathParams: {
					qrId: qrCodeId
				}
			}))
		});

		it("should get payment session", async function() {
			const result = await api.getByQRCodeId(qrCodeId);

			assertThat(result, is(paymentSession()));
		});
	});

	describe("update", function() {
		const paymentSessionId = "fdjfadfaj2312";
		const session = new TestCustomerUpdatePaymentSessionRequest()

		it("should throw error when paymentSessionId is missing", function() {
			assertThat(() => api.update(), throws(requiredParameterError("paymentSessionId")));
		});

		it("should throw error when session is missing", function() {
			assertThat(() => api.update(paymentSessionId), throws(requiredParameterError("session")));
		});

		it("should set request params", async function() {
			await api.update(paymentSessionId, session);

			assertThat(apiClient.request, hasProperties({
				method: HttpRequestMethod.POST,
				url: "/customer/payment/session/:paymentSessionId",
				pathParams: {
					paymentSessionId
				},
				body: hasProperties({
					data: defined(),
					meta: {}
				})
			}));

			assertThat(apiClient.request.body.data.customerInfo.payload, allOf(
				defined(),
				not(instanceOf(Map))
			))
		});
	});

	describe("delete", function() {
		const paymentSessionId = "fdjfadfaj2312";

		it("should throw error when paymentSessionId is missing", function() {
			assertThat(() => api.delete(), throws(requiredParameterError("paymentSessionId")));
		});

		it("should set request params", async function() {
			await api.delete(paymentSessionId);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.DELETE,
				url: "/customer/payment/session/:paymentSessionId",
				pathParams: {
					paymentSessionId
				}
			}))
		});
	});

	describe("preApprove", function() {
		const paymentSessionId = "fdjfadfaj2312";
		const primaryInstrument = aSelectedPaymentInstrument();

		it("should throw error when paymentSessionId is missing", function() {
			assertThat(() => api.preApprove(), throws(requiredParameterError("paymentSessionId")));
		});

		it("should throw error when primaryInstrument is missing", function() {
			assertThat(
				() => api.preApprove(paymentSessionId),
				throws(requiredParameterError("primaryInstrument"))
			);
		});

		it("should set request params", async function() {
			await api.preApprove(paymentSessionId, primaryInstrument);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.PUT,
				url: "/customer/payment/session/:paymentSessionId",
				headers: {
					[X_EVERYDAY_PAY_WALLET]: "false"
				},
				pathParams: {
					paymentSessionId
				},
				body: {
					data: {
						primaryInstrumentId: primaryInstrument.paymentInstrumentId,
						secondaryInstruments: [],
						challengeResponses: []
					},
					meta: {}
				}
			}));
		});

		it("should set optional request params", async function() {
			const secondaryPaymentInstrument = aSecondaryPaymentInstrument();
			const clientReference = "this is a reference";
			const challengeResponse = aChallengeResponse();

			await api.preApprove(
				paymentSessionId,
				primaryInstrument,
				[ secondaryPaymentInstrument ],
				clientReference,
				[ challengeResponse ]
			);

			const data = apiClient.request.body.data;

			assertThat(data.secondaryInstruments, equalTo([
				{
					instrumentId: secondaryPaymentInstrument.paymentInstrumentId,
					amount: secondaryPaymentInstrument.amount
				}
			]));

			assertThat(data.clientReference, equalTo(clientReference));
			assertThat(data.challengeResponses, equalTo([ challengeResponse ]))
		});
	});
});
