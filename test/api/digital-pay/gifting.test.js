"use strict";
const { assertThat, hasProperties, is, throws, equalTo } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../../src/api/digital-pay/gifting");

const { aChallengeResponse } = require("../../data/challenge-response");
const { fraudPayloadDTO } = require("../../data/fraud-payload");
const { requiredParameterError } = require("../../matchers/required-parameters");
const { body, withData, withMeta } = require("../../matchers/request-body-matchers");
const { challengeResponsesDTOFrom } = require("../../matchers/challenge-response-matchers");
const { giftingMetaDTOFrom } = require("../../matchers/gifting-meta-matchers");
const { StubApiClient } = require("../../stub-api-client");
const {
	giftingProductDetail,
	giftingProductList,
	giftingQuoteRequest,
	giftingQuoteResponse,
	giftingOrderRequest,
	giftingOrderResponse
} = require("../../data/gifting-payloads");

describe("GiftingApi", function () {
	let apiClient;

	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("getProductById", function () {
		beforeEach(function () {
			apiClient.response = {
				data: giftingProductDetail(),
				meta: {}
			};
		});

		it("should throw error when productId is missing", async function () {
			assertThat(() => api.getProductById(), throws(requiredParameterError("productId")));
		});

		it("should set request params", async function () {
			await api.getProductById("product-1");

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/gifting/products/:productId",
					pathParams: {
						productId: "product-1"
					}
				})
			);
		});

		it("should get product details", async function () {
			const result = await api.getProductById("product-1");

			assertThat(result, is({ data: giftingProductDetail(), meta: {} }));
		});
	});

	describe("listProducts", function () {
		beforeEach(function () {
			apiClient.response = {
				data: giftingProductList(),
				meta: {}
			};
		});

		it("should set request params", async function () {
			await api.listProducts();

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/gifting/products",
					queryParams: {}
				})
			);
		});

		it("should set optional query params", async function () {
			const lastUpdateDateTime = new Date("2017-10-26T04:56:25.046Z");
			await api.listProducts(1, 20, lastUpdateDateTime);

			assertThat(
				apiClient.request.queryParams,
				is({
					page: 1,
					"page-size": 20,
					"last-updated-date-time": lastUpdateDateTime.toISOString()
				})
			);
		});

		it("should get product list", async function () {
			const result = await api.listProducts();

			assertThat(result, is({ data: giftingProductList(), meta: {} }));
		});
	});

	describe("getQuote", function () {
		beforeEach(function () {
			apiClient.response = {
				data: giftingQuoteResponse(),
				meta: {}
			};
		});

		it("should throw error when quote request is missing", function () {
			assertThat(() => api.getQuote(), throws(requiredParameterError("quoteRequest")));
		});

		it("should set request params", async function () {
			const request = giftingQuoteRequest();
			await api.getQuote(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/gifting/products/quote",
					body: is(body(withData(equalTo(request))))
				})
			);
		});

		it("should obtain gifting quote", async function () {
			const result = await api.getQuote(giftingQuoteRequest());

			assertThat(result, is({ data: giftingQuoteResponse(), meta: {} }));
		});
	});

	describe("order", function () {
		beforeEach(function () {
			apiClient.response = {
				data: giftingOrderResponse(),
				meta: {}
			};
		});

		it("should throw error when order request is missing", function () {
			assertThat(() => api.order(), throws(requiredParameterError("orderRequest")));
		});

		it("should set request params", async function () {
			const request = giftingOrderRequest();
			await api.order(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/gifting/products/order",
					body: is(body(withData(equalTo(request)), withMeta(challengeResponsesDTOFrom([]))))
				})
			);
		});

		it("should set optional request params", async function () {
			const request = giftingOrderRequest();
			const challengeResponses = [aChallengeResponse()];
			const fraudPayload = fraudPayloadDTO();
			await api.order(request, challengeResponses, fraudPayload);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/gifting/products/order",
					body: is(
						body(
							withData(equalTo(request)),
							withMeta(giftingMetaDTOFrom(challengeResponses, fraudPayload))
						)
					)
				})
			);
		});

		it("should complete gifting order", async function () {
			const result = await api.order(giftingOrderRequest());

			assertThat(result, is({ data: giftingOrderResponse(), meta: {} }));
		});
	});
});
