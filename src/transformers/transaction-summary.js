"use strict";

const mapProps = require("crocks/helpers/mapProps");

const { toDate, toUpperCase } = require("../helpers/props");

const fromTransactionSummaryDTO =
	mapProps({
		executionTime: toDate,
		status: toUpperCase,
		type: toUpperCase,
	});

module.exports = {
	fromTransactionSummaryDTO
}
