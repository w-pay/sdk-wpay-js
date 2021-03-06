"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const identity = require("crocks/combinators/identity");
const mapProps = require("crocks/helpers/mapProps");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { fromData } = require("../../transformers/data");
const { requiredParameterError } = require("../api-errors");
const { optionalParam, params } = require("../../helpers/params");
const { toISOString } = require("../../helpers/props");

// getProductById :: HttpApiClient -> (String) -> Promise DigitalPayGiftingProductDetail
const getProductById = (client) => (productId) => {
	if (!productId) {
		throw requiredParameterError("productId");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(identity)
		)({
			method: HttpRequestMethod.GET,
			url: "/gifting/products/:productId",
			pathParams: {
				productId
			}
		})
	);
};

// complete :: HttpApiClient -> (Number, Number, Date) -> Promise DigitalPayGiftingProduct[]
const listProducts = (client) => (page, pageSize, lastUpdateDateTime) => {
	return asyncToPromise(
		pipeK(
			client,
			fromData(identity)
		)({
			method: HttpRequestMethod.GET,
			url: "/gifting/products",
			queryParams: mapProps(
				{
					"last-updated-date-time": toISOString
				},
				params([
					optionalParam("page", page),
					optionalParam("page-size", pageSize),
					optionalParam("last-updated-date-time", lastUpdateDateTime)
				])
			)
		})
	);
};

// getQuote :: HttpApiClient -> (DigitalPayGiftingQuoteRequest) -> Promise DigitalPayGiftingQuoteResponse
const getQuote = (client) => (quoteRequest) => {
	if (!quoteRequest) {
		throw requiredParameterError("quoteRequest");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(identity)
		)({
			method: HttpRequestMethod.POST,
			url: "/gifting/products/quote",
			body: {
				data: quoteRequest,
				meta: {}
			}
		})
	);
};

// order :: HttpApiClient -> (DigitalPayGiftingOrderRequest, [ChallengeResponse]?, FraudPayload?) -> Promise DigitalPayGiftingOrderResponse
const order = (client) => (orderRequest, challengeResponses, fraud) => {
	if (!orderRequest) {
		throw requiredParameterError("orderRequest");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(identity)
		)({
			method: HttpRequestMethod.POST,
			url: "/gifting/products/order",
			body: {
				data: orderRequest,
				meta: {
					challengeResponses: challengeResponses ? challengeResponses : [],
					fraud
				}
			}
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../../types/api/DigitalPayApi/OpenPay').OpenPayApi} */
	return {
		getProductById: getProductById(client),
		listProducts: listProducts(client),
		getQuote: getQuote(client),
		order: order(client)
	};
};
