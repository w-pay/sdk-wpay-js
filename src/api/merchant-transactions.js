"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const mapProps = require("crocks/helpers/mapProps");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { fromData } = require("../transformers/data");
const {
	fromMerchantTransactionDetailsDTO,
	fromMerchantTransactionSummariesDTO
} = require("../transformers/merchant-transactions");
const { optionalParam, params } = require("../helpers/params");
const { requiredParameterError } = require("./api-errors");
const { toISOString } = require("../helpers/props");

const list = (client) => (page, pageSize, endTime, startTime) => {
	return asyncToPromise(pipeK(
		client,
		fromData(fromMerchantTransactionSummariesDTO)
	)({
		method: HttpRequestMethod.GET,
		url: "/merchant/transactions",
		queryParams: mapProps({
				startTime: toISOString,
				endTime: toISOString
			},
			params([
				optionalParam("page", page),
				optionalParam("pageSize", pageSize),
				optionalParam("endTime", endTime),
				optionalParam("startTime", startTime)
			]))
	}))
}

const getById = (client) => (transactionId) => {
	if (!transactionId) {
		throw requiredParameterError("transactionId");
	}

	return asyncToPromise(pipeK(
		client,
		fromData(fromMerchantTransactionDetailsDTO)
	)({
		method: HttpRequestMethod.GET,
		url: "/merchant/transactions/:transactionId",
		pathParams: {
			transactionId
		}
	}))
}

module.exports = (client) => {
	/** @implements {import('../../types/api/MerchantTransactions').MerchantTransactionsApi} */
	return {
		list: list(client),
		getById: getById(client)
	};
}
