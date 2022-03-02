"use strict";

const mapProps = require("crocks/helpers/mapProps");
const map = require("crocks/pointfree/map");

const { toDate, toUpperCase } = require("../helpers/props");

const fromCustomerTransactionSummaryDTO = mapProps({
	executionTime: toDate,
	status: toUpperCase,
	rollback: toUpperCase,
	type: toUpperCase,
	instruments: map(
		mapProps({
			transactions: map(
				mapProps({
					type: toUpperCase,
					executionTime: toDate,
					status: toUpperCase
				})
			)
		})
	)
});

const fromCustomerTransactionSummariesDTO = mapProps({
	transactions: map(fromCustomerTransactionSummaryDTO)
});

const fromCustomerTransactionDetailsDTO = fromCustomerTransactionSummaryDTO;

module.exports = {
	fromCustomerTransactionDetailsDTO,
	fromCustomerTransactionSummaryDTO,
	fromCustomerTransactionSummariesDTO
};
