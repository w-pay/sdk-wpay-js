"use strict";

const mapProps = require("crocks/helpers/mapProps");
const map = require("crocks/pointfree/map");

const { toDate, toUpperCase } = require("../helpers/props");

const fromMerchantTransactionDetailsDTO = mapProps({
	executionTime: toDate,
	status: toUpperCase,
	rollback: toUpperCase,
	type: toUpperCase
});

const fromMerchantTransactionSummaryDTO = mapProps({
	executionTime: toDate,
	status: toUpperCase,
	rollback: toUpperCase,
	type: toUpperCase
});

const fromMerchantTransactionSummariesDTO = mapProps({
	transactions: map(fromMerchantTransactionSummaryDTO)
});

module.exports = {
	fromMerchantTransactionDetailsDTO,
	fromMerchantTransactionSummariesDTO,
	fromMerchantTransactionSummaryDTO
};
