"use strict";

const { assertThat, defined, hasProperties, instanceOf, is, not, throws } = require("hamjest");

const { HttpRequestMethod } = require("@sdk-creator/http-api-client");

const apiFactory = require("../../src/api/merchant-payments");
const { QRCodePaymentReferenceType } = require("../../src/model/enums");

const { aNewBasket } = require("../data/test-basket");
const { aNewMerchantPayload, aNewPosPayload } = require("../data/test-merchant-payloads");
const {
	merchantPaymentDetails,
	merchantPaymentSummaries
} = require("../matchers/merchant-payments-matchers");
const { merchantTransactionSummary } = require("../matchers/merchant-transaction-matchers");
const { paymentRequestCreated } = require("../matchers/merchant-payments-matchers");
const { requiredParameterError } = require("../matchers/required-parameters");
const { toBasketDTO } = require("../../src/transformers/basket");
const { toDynamicPayloadDTO } = require("../../src/transformers/dynamic-payload");
const { StubApiClient } = require("../stub-api-client");

describe("MerchantPaymentsApi", function() {
	let apiClient;

	let api;

	beforeEach(function() {
		apiClient = new StubApiClient()

		api = apiFactory(apiClient.client());
	});

	const PAYMENT = {
		usesRemaining: 1,
		expiryTime: "2021-02-17T06:31:46.358Z",
		specificWalletId: "someId",
		paymentRequestId: "dfnafdfjaf",
		merchantReferenceId: "dfjkadfjadkfjadk",
		grossAmount: 123.2
	};

	describe("listPayments", function() {
		beforeEach(function() {
			apiClient.response = {
				data: {
					payments: [
						PAYMENT
					]
				},
				meta: {}
			}
		})

		it("should set request params", async function() {
			await api.listPayments();

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.GET,
				url: "/merchant/payments",
				queryParams: {}
			}));
		});

		it("should pass optional params", async function() {
			const type = "pos";
			const page = 1;
			const pageSize = 10;

			await api.listPayments(type, page, pageSize);

			assertThat(apiClient.request.queryParams, is({
				type,
				page,
				pageSize
			}));
		});

		it("should list payments", async function() {
			const result = await api.listPayments();

			assertThat(result, is(merchantPaymentSummaries()));
		});
	});

	describe("createPaymentRequest", function() {
		const newPaymentDetails = {
			merchantReferenceId: "ffddaafaddfa",
			grossAmount: 1,
			generateQR: false,
			basket: aNewBasket(),
			posPayload: aNewPosPayload(),
			merchantPayload: aNewMerchantPayload()
		}

		beforeEach(function() {
			apiClient.response = {
				data: {
					paymentRequestId: "dfkjdfakfa",
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

		it("should throw error when paymentRequest is missing", function() {
			assertThat(
				() => api.createPaymentRequest(),
				throws(requiredParameterError("paymentRequest"))
			);
		});

		it("should set request params", async function() {
			await api.createPaymentRequest(newPaymentDetails);

			assertThat(apiClient.request, hasProperties({
				method: HttpRequestMethod.POST,
				url: "/merchant/payments",
				body: hasProperties({
					data: defined(),
					meta: defined()
				})
			}))

			const data = apiClient.request.body.data;

			assertThat(data.basket.tags, not(instanceOf(Map)));
			assertThat(data.posPayload.payload, not(instanceOf(Map)));
			assertThat(data.merchantPayload.payload, not(instanceOf(Map)));
		});

		it("should create payment request", async function() {
			const result = await api.createPaymentRequest(newPaymentDetails);

			assertThat(result, is(paymentRequestCreated()));
		});
	});

	describe("getPaymentRequestDetailsBy", function() {
		const paymentRequestId = "dfafafadfajkgks";

		beforeEach(function() {
			apiClient.response = {
				data: {
					...PAYMENT,
					basket: toBasketDTO(aNewBasket()),
					posPayload: toDynamicPayloadDTO(aNewPosPayload()),
					merchantPayload: toDynamicPayloadDTO(aNewMerchantPayload())
				},
				meta: {}
			}
		})

		it("should throw error when paymentRequestId is missing", function() {
			assertThat(
				() => api.getPaymentRequestDetailsBy(),
				throws(requiredParameterError("paymentRequestId"))
			);
		});

		it("should set request params", async function() {
			await api.getPaymentRequestDetailsBy(paymentRequestId);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.GET,
				url: "/merchant/payments/:paymentRequestId",
				pathParams: {
					paymentRequestId
				}
			}));
		});

		it("should get payment request details", async function() {
			const result = await api.getPaymentRequestDetailsBy(paymentRequestId);

			assertThat(result, is(merchantPaymentDetails()));
		});
	});

	describe("deletePaymentRequest", function() {
		const paymentRequestId = "dfafafadfajkgks";

		it("should throw error when paymentRequestId is missing", function() {
			assertThat(
				() => api.deletePaymentRequest(),
				throws(requiredParameterError("paymentRequestId"))
			);
		});

		it("should set request params", async function() {
			await api.deletePaymentRequest(paymentRequestId);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.DELETE,
				url: "/merchant/payments/paymentRequestId",
				pathParams: {
					paymentRequestId
				}
			}));
		});
	});

	describe("refundTransaction", function() {
		const transactionId = "fakfjadksjakldfjkalfjafj";
		const refundDetails = {
			reason: "I want a refund"
		}

		beforeEach(function() {
			apiClient.response = {
				data: {
					walletId: "dfadfadfdas",
					merchantReferenceId: "rewrewrer",
					paymentRequestId: "frewerrrre",
					type: "type",
					grossAmount: 123.3,
					executionTime: "2021-02-17T06:31:46.358Z",
					status: "PROCESSING",
					transactionId: "dsfdfasdasas"
				},
				meta: {}
			}
		})

		it("should throw error when transactionId is missing", function() {
			assertThat(
				() => api.refundTransaction(),
				throws(requiredParameterError("transactionId"))
			);
		});

		it("should throw error when refundDetails is missing", function() {
			assertThat(
				() => api.refundTransaction(transactionId),
				throws(requiredParameterError("refundDetails"))
			);
		});

		it("should set request params", async function() {
			await api.refundTransaction(transactionId, refundDetails);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.POST,
				url: "/merchant/transactions/:transactionId/refund",
				pathParams: {
					transactionId
				},
				body: {
					data: refundDetails
				},
				meta: {}
			}))
		});

		it("should refund transaction", async function() {
			const result = await api.refundTransaction(transactionId, refundDetails);

			assertThat(result, is(merchantTransactionSummary()));
		});
	});
});
