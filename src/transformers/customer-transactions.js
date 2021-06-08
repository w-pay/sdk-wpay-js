"use strict";

const mapProps = require("crocks/helpers/mapProps");
const map = require("crocks/pointfree/map");

const { toDate, toUpperCase } = require("../helpers/props");

const fromCustomerTransactionSummaryDTO = mapProps({
	executionTime: toDate,
	status: toUpperCase,
	rollback: toUpperCase,
	type: toUpperCase
});

const fromCustomerTransactionSummariesDTO = mapProps({
	transactions: map(fromCustomerTransactionSummaryDTO)
});

const fromCustomerTransactionDetailsDTO = mapProps({
	executionTime: toDate,
	status: toUpperCase,
	rollback: toUpperCase,
	type: toUpperCase
});

module.exports = {
	fromCustomerTransactionDetailsDTO,
	fromCustomerTransactionSummaryDTO,
	fromCustomerTransactionSummariesDTO
};
