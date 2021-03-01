"use strict";

const { v4: uuid } = require("uuid");

const { assertThat, equalTo, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/merchant-payments");

const {
	aNewPaymentRequest,
	createPaymentRequestResultDTO
} = require("../data/payment-request");
const { basketDTOFrom } = require("../matchers/basket-matchers");
const { body, withData } = require("../matchers/request-body-matchers");
const { dynamicPayloadDTOFrom } = require("../matchers/dynamic-payload-matchers");
const {
	merchantPaymentDetailsFrom,
	merchantPaymentSummariesFrom,
	paymentRequestCreatedFrom
} = require("../matchers/merchant-payments-matchers");
const {
	merchantPaymentDetailsDTO,
	merchantPaymentSummariesDTO
} = require("../data/merchant-payments");
const { merchantTransactionSummaryDTO } = require("../data/merchant-transactions");
const { merchantTransactionSummaryFrom } = require("../matchers/merchant-transaction-matchers");
const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");

describe("MerchantPaymentsApi", function () {
	let apiClient;

	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("listPayments", function () {
		beforeEach(function () {
			apiClient.response = {
				data: merchantPaymentSummariesDTO(),
				meta: {}
			};
		});

		it("should set request params", async function () {
			await api.listPayments();

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/instore/merchant/payments",
					queryParams: {}
				})
			);
		});

		it("should pass optional params", async function () {
			const type = "pos";
			const page = 1;
			const pageSize = 10;

			await api.listPayments(type, page, pageSize);

			assertThat(
				apiClient.request.queryParams,
				is({
					type,
					page,
					pageSize
				})
			);
		});

		it("should list payments", async function () {
			const result = await api.listPayments();

			assertThat(result, is(merchantPaymentSummariesFrom(apiClient.response.data)));
		});
	});

	describe("createPaymentRequest", function () {
		beforeEach(function () {
			apiClient.response = {
				data: createPaymentRequestResultDTO(),
				meta: {}
			};
		});

		it("should throw error when paymentRequest is missing", function () {
			assertThat(
				() => api.createPaymentRequest(),
				throws(requiredParameterError("paymentRequest"))
			);
		});

		it("should set request params", async function () {
			const request = aNewPaymentRequest();
			await api.createPaymentRequest(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/instore/merchant/payments",
					body: is(
						body(
							withData(
								hasProperties({
									merchantReferenceId: is(request.merchantReferenceId),
									grossAmount: is(request.grossAmount),
									generateQR: is(request.generateQR),
									maxUses: is(request.maxUses),
									timeToLivePayment: is(request.timeToLivePayment),
									timeToLiveQR: is(request.timeToLiveQR),
									specificWalletId: is(request.specificWalletId),
									basket: basketDTOFrom(request.basket),
									posPayload: dynamicPayloadDTOFrom(request.posPayload),
									merchantPayload: dynamicPayloadDTOFrom(request.merchantPayload)
								})
							)
						)
					)
				})
			);
		});

		it("should create payment request", async function () {
			const result = await api.createPaymentRequest(aNewPaymentRequest());

			assertThat(result, is(paymentRequestCreatedFrom(apiClient.response.data)));
		});
	});

	describe("getPaymentRequestDetailsBy", function () {
		const paymentRequestId = uuid();

		beforeEach(function () {
			apiClient.response = {
				data: merchantPaymentDetailsDTO(),
				meta: {}
			};
		});

		it("should throw error when paymentRequestId is missing", function () {
			assertThat(
				() => api.getPaymentRequestDetailsBy(),
				throws(requiredParameterError("paymentRequestId"))
			);
		});

		it("should set request params", async function () {
			await api.getPaymentRequestDetailsBy(paymentRequestId);

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/instore/merchant/payments/:paymentRequestId",
					pathParams: {
						paymentRequestId
					}
				})
			);
		});

		it("should get payment request details", async function () {
			const result = await api.getPaymentRequestDetailsBy(paymentRequestId);

			assertThat(result, is(merchantPaymentDetailsFrom(apiClient.response.data)));
		});
	});

	describe("deletePaymentRequest", function () {
		const paymentRequestId = uuid();

		it("should throw error when paymentRequestId is missing", function () {
			assertThat(
				() => api.deletePaymentRequest(),
				throws(requiredParameterError("paymentRequestId"))
			);
		});

		it("should set request params", async function () {
			await api.deletePaymentRequest(paymentRequestId);

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.DELETE,
					url: "/instore/merchant/payments/paymentRequestId",
					pathParams: {
						paymentRequestId
					}
				})
			);
		});
	});

	describe("refundTransaction", function () {
		const transactionId = uuid();
		const refundDetails = {
			reason: "I want a refund"
		};

		beforeEach(function () {
			apiClient.response = {
				data: merchantTransactionSummaryDTO(),
				meta: {}
			};
		});

		it("should throw error when transactionId is missing", function () {
			assertThat(
				() => api.refundTransaction(),
				throws(requiredParameterError("transactionId"))
			);
		});

		it("should throw error when refundDetails is missing", function () {
			assertThat(
				() => api.refundTransaction(transactionId),
				throws(requiredParameterError("refundDetails"))
			);
		});

		it("should set request params", async function () {
			await api.refundTransaction(transactionId, refundDetails);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/instore/merchant/transactions/:transactionId/refund",
					pathParams: {
						transactionId
					},
					body: is(body(withData(equalTo(refundDetails))))
				})
			);
		});

		it("should refund transaction", async function () {
			const result = await api.refundTransaction(transactionId, refundDetails);

			assertThat(result, is(merchantTransactionSummaryFrom(apiClient.response.data)));
		});
	});
});
