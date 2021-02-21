"use strict";

const { assertThat, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/merchant-transactions");
const { toBasketDTO } = require("../../src/transformers/basket");
const { toDynamicPayloadDTO } = require("../../src/transformers/dynamic-payload");

const { aNewBasket } = require("../data/test-basket");
const { aNewPosPayload, aNewMerchantPayload } = require("../data/test-merchant-payloads");
const {
	merchantTransactionDetails,
	merchantTransactionSummaries
} = require("../matchers/merchant-transaction-matchers");
const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");

const transactionSummary = {
	"transactionId": "63f5b77e-adcb-49a3-9c1c-7ec5a3b9aae7",
	"merchantId": "10006",
	"merchantReferenceId": "67a1d6e8-5120-417c-b846-238fa978f467",
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
	"status": "APPROVED",
	"walletId": "139492934"
}

describe("MerchantTransactionsApi", function() {
	let apiClient;

	let api;

	beforeEach(function() {
		apiClient = new StubApiClient()

		api = apiFactory(apiClient.client());
	})

	describe("list", function() {
		beforeEach(function() {
			apiClient.response = {
				data: {
					transactions: [ transactionSummary ]
				},
				meta: {}
			}
		})

		it("should set request params", async function() {
			await api.list();

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.GET,
				url: "/merchant/transactions",
				queryParams: {}
			}))
		});

		it("should set optional request params", async function() {
			const page = 10;
			const pageSize = 50;
			const endTime = new Date();
			const startTime = new Date();

			await api.list(page, pageSize, endTime, startTime);

			assertThat(apiClient.request.queryParams, is({
				page,
				pageSize,
				endTime: endTime.toISOString(),
				startTime: endTime.toISOString()
			}))
		});

		it("should return merchant transactions", async function() {
			const result = await api.list();

			assertThat(result, is(merchantTransactionSummaries()));
		});
	});

	describe("getById", function() {
		const transactionId = "gjkghdfjlsghjg";

		beforeEach(function() {
			apiClient.response = {
				data: {
					...transactionSummary,
					basket: toBasketDTO(aNewBasket()),
					posPayload: toDynamicPayloadDTO(aNewPosPayload()),
					merchantPayload: toDynamicPayloadDTO(aNewMerchantPayload())
				},
				meta: {}
			}
		})

		it("should throw error when transactionId is missing", async function() {
			assertThat(() => api.getById(), throws(requiredParameterError("transactionId")))
		});

		it("should set request params", async function() {
			await api.getById(transactionId);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.GET,
				url: "/merchant/transactions/:transactionId",
				pathParams: {
					transactionId
				}
			}))
		});

		it("should get merchant transaction details", async function() {
			const result = await api.getById(transactionId);

			assertThat(result, is(merchantTransactionDetails()));
		});
	});
});
