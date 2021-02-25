"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const mapProps = require("crocks/helpers/mapProps");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const {
	fromCustomerTransactionDetailsDTO,
	fromCustomerTransactionSummariesDTO
} = require("../transformers/customer-transactions");
const { fromData } = require("../transformers/data");
const { optionalParam, params } = require("../helpers/params");
const { requiredParameterError } = require("./api-errors");
const { toISOString } = require("../helpers/props");

const list = (client) => (paymentRequestId, page, pageSize, endTime, startTime) => {
	return asyncToPromise(
		pipeK(
			client,
			fromData(fromCustomerTransactionSummariesDTO)
		)({
			method: HttpRequestMethod.GET,
			url: "/customer/transactions",
			queryParams: mapProps(
				{
					startTime: toISOString,
					endTime: toISOString
				},
				params([
					optionalParam("paymentRequestId", paymentRequestId),
					optionalParam("page", page),
					optionalParam("pageSize", pageSize),
					optionalParam("endTime", endTime),
					optionalParam("startTime", startTime)
				])
			)
		})
	);
};

const getById = (client) => (transactionId) => {
	if (!transactionId) {
		throw requiredParameterError("transactionId");
	}

	return asyncToPromise(
		pipeK(
			client,
			fromData(fromCustomerTransactionDetailsDTO)
		)({
			method: HttpRequestMethod.GET,
			url: "/customer/transactions/:transactionId",
			pathParams: {
				transactionId
			}
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerTransactions').CustomerTransactionsApi} */
	return {
		list: list(client),
		getById: getById(client)
	};
};
