"use strict";

const mapProps = require("crocks/helpers/mapProps");

const { assertThat, equalTo, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/customer-payment-requests");
const { toBasketDTO } = require("../../src/transformers/basket");
const { X_EVERYDAY_PAY_WALLET } = require("../../src/headers/header-names");

const { aChallengeResponse } = require("../data/test-challenge-response");
const {
	aSelectedPaymentInstrument,
	aSecondaryPaymentInstrument
} = require("../data/test-payment-instrument");
const { aCustomerPaymentRequest } = require("../data/test-customer-payment-request");
const { customerPaymentRequest } = require("../matchers/customer-payment-request-matcher");
const { customerTransactionSummary } = require("../matchers/customer-transactions-matchers");
const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");

describe("CustomerPaymentRequestsApi", function() {
	let apiClient;

	let api;

	beforeEach(function() {
		apiClient = new StubApiClient()

		api = apiFactory(apiClient.client());

		apiClient.response = {
			data: mapProps({ basket: toBasketDTO }, aCustomerPaymentRequest()),
			meta: {}
		}
	})

	describe("getById", function() {
		it("should throw error if paymentRequestId is missing", async function() {
			assertThat(() => api.getById(), throws(requiredParameterError("paymentRequestId")));
		});

		it("should set request params", async function() {
			const paymentRequestId = "abc123";

			await api.getById(paymentRequestId);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.GET,
				url: "/customer/payments/:paymentRequestId",
				pathParams: {
					paymentRequestId
				}
			}))
		});

		it("should return CustomerPaymentRequest", async function() {
			const result = await api.getById("abc123");

			assertThat(result, is(customerPaymentRequest()));
		});

		it("should ignore missing basket", async function() {
			delete apiClient.response.data.basket;

			/** @type CustomerPaymentRequest */
			const result = await api.getById("abc123");

			assertThat(result.basket, is(undefined));
		});
	});

	describe("getByQRCodeId", function() {
		it("should throw error if qrCodeId is missing", async function() {
			assertThat(() => api.getByQRCodeId(), throws(requiredParameterError("qrCodeId")));
		});

		it("should set request params", async function() {
			const qrCodeId = "abc123";

			await api.getByQRCodeId(qrCodeId);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.GET,
				url: "/customer/qr/:qrCodeId",
				pathParams: {
					qrCodeId
				}
			}))
		});

		it("should return CustomerPaymentRequest", async function() {
			const result = await api.getByQRCodeId("abc123");

			assertThat(result, is(customerPaymentRequest()));
		});

		it("should ignore missing basket", async function() {
			delete apiClient.response.data.basket;

			/** @type CustomerPaymentRequest */
			const result = await api.getByQRCodeId("abc123");

			assertThat(result.basket, is(undefined));
		});
	});

	describe("makePayment", function() {
		it("should throw error if paymentRequestId is missing", function() {
			assertThat(() => api.makePayment(), throws(requiredParameterError("paymentRequestId")));
		});

		it("should throw error if primaryInstrument is missing", function() {
			assertThat(
				() => api.makePayment("abc123"),
				throws(requiredParameterError("primaryInstrument"))
			);
		});

		it("should set request params", async function() {
			const paymentRequestId = "fhgut738484dfjkskdk";
			const primaryPaymentInstrument = aSelectedPaymentInstrument();

			await api.makePayment(paymentRequestId, primaryPaymentInstrument);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.PUT,
				url: "/customer/payments/:paymentRequestId",
				headers: {
					[X_EVERYDAY_PAY_WALLET]: "false"
				},
				pathParams: {
					paymentRequestId
				},
				body: {
					data: {
						primaryInstrumentId: primaryPaymentInstrument.paymentInstrumentId,
						secondaryInstruments: [],
						challengeResponses: []
					},
					meta: {}
				}
			}))
		});

		it("should set optional parameters", async function() {
			const secondaryPaymentInstrument = aSecondaryPaymentInstrument();
			const clientReference = "this is a reference";
			const challengeResponse = aChallengeResponse();

			await api.makePayment(
				"abc123",
				aSelectedPaymentInstrument(),
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

		it("should make a payment", async function() {
			apiClient.response = {
				"data": {
					"transactionId": "63f5b77e-adcb-49a3-9c1c-7ec5a3b9aae7",
					"merchantId": "10006",
					"merchantReferenceId": "67a1d6e8-5120-417c-b846-238fa978f467",
					"clientReference": "12345",
					"paymentRequestId": "9f7db4ee-a7af-4a3f-a160-42f7202b1f82",
					"type": "PAYMENT",
					"grossAmount": 1000.5,
					"executionTime": "2021-02-17T06:31:47.617Z",
					"instruments": [
						{
							"paymentInstrumentId": "184748",
							"amount": 1000.5,
							"paymentTransactionRef": "1000000007538304"
						}
					],
					"status": "APPROVED"
				},
				"meta": {}
			}

			const result = await api.makePayment("fhgut738484dfjkskdk", aSelectedPaymentInstrument());

			assertThat(result, is(customerTransactionSummary()))
		});
	});
});
