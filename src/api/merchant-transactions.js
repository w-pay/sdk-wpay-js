"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const chain = require("crocks/pointfree/chain");
const map = require("crocks/pointfree/map");
const mapProps = require("crocks/helpers/mapProps");
const pipe = require("crocks/helpers/pipe");
const resultToAsync = require("crocks/Async/resultToAsync");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const {
	fromMerchantTransactionDetailsDTO,
	fromMerchantTransactionSummariesDTO
} = require("../transformers/merchant-transactions");
const { getPropOrError } = require("../helpers/props");
const { optionalParam, params } = require("../helpers/params");
const { requiredParameterError } = require("./api-errors");
const { toISOString } = require("../helpers/props");

const list = (client) => (page, pageSize, endTime, startTime) => {
	return pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(fromMerchantTransactionSummariesDTO),
			resultToAsync
		)),
		asyncToPromise
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
	})
}

const getById = (client) => (transactionId) => {
	if (!transactionId) {
		throw requiredParameterError("transactionId");
	}

	return pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(fromMerchantTransactionDetailsDTO),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.GET,
		url: "/merchant/transactions/:transactionId",
		pathParams: {
			transactionId
		}
	})
}

module.exports = (client) => {
	/** @implements {import('../../types/api/MerchantTransactions').MerchantTransactionsApi} */
	return {
		list: list(client),
		getById: getById(client)
	};
}
