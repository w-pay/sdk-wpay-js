"use strict";

const {
	allOf,
	assertThat,
	defined,
	hasProperties,
	instanceOf,
	is,
	not,
	throws
} = require("hamjest");

const { HttpRequestMethod } = require("@sdk-creator/http-api-client");

const apiFactory = require("../../src/api/merchant-payment-sessions");
const { QRCodePaymentReferenceType } = require("../../src/model/enums");

const {
	paymentSession,
	paymentSessionCreated
} = require("../matchers/payment-session-matchers");
const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");
const { TestCreatePaymentSessionRequest } =
	require("../data/test-create-payment-session-request");
const { TestMerchantUpdatePaymentSessionRequest } =
	require("../data/test-update-payment-session-request");

describe("MerchantPaymentSessionsApi", function() {
	let apiClient;

	let api;

	beforeEach(function() {
		apiClient = new StubApiClient()

		api = apiFactory(apiClient.client());
	})

	describe("create", function() {
		const request = new TestCreatePaymentSessionRequest()

		beforeEach(function() {
			apiClient.response = {
				data: {
					paymentSessionId: "fkldfdalka",
					qr: {
						qrId: "abc123def",
						referenceId: "reference123",
						referenceType: QRCodePaymentReferenceType.PAYMENT_REQUEST,
						content: "http://foo.com/code",
						image: "fadsfadfdasfdasfadfads",
						expiryTime: "2021-02-17T06:31:46.358Z"
					}
				},
				meta: {}
			}
		})
		it("should throw error when request is missing", function() {
			assertThat(() => api.create(), throws(requiredParameterError("request")));
		});

		it("should set request params", async function() {
			await api.create(request);

			assertThat(apiClient.request, hasProperties({
				method: HttpRequestMethod.POST,
				url: "/merchant/payment/session",
				body: hasProperties({
					data: defined(),
					meta: {}
				})
			}))

			assertThat(apiClient.request.body.data.merchantInfo, allOf(
				defined(),
				not(instanceOf(Map))
			))
		});

		it("should create payment session", async function() {
			const result = await api.create(request);

			assertThat(result, is(paymentSessionCreated()));
		});
	});

	describe("getById", function() {
		beforeEach(function() {
			apiClient.response = {
				data: {
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
				},
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
				url: "/merchant/payment/session/:paymentSessionId",
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

	describe("update", function() {
		const paymentSessionId = "fdjfadfaj2312";
		const session = new TestMerchantUpdatePaymentSessionRequest()

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
				url: "/merchant/payment/session/:paymentSessionId",
				pathParams: {
					paymentSessionId
				},
				body: hasProperties({
					data: defined(),
					meta: {}
				})
			}));

			assertThat(apiClient.request.body.data.merchantInfo.payload, allOf(
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
				url: "/merchant/payment/session/:paymentSessionId",
				pathParams: {
					paymentSessionId
				}
			}))
		});
	});
});
