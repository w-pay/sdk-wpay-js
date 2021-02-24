"use strict";

const map = require("crocks/pointfree/map");
const mapProps = require("crocks/helpers/mapProps");

const { toDate } = require("../helpers/props");

const fromMerchantSchemaSummaryDTO =
	mapProps({
		created: toDate
	})

const fromMerchantSchemaSummariesDTO =
	mapProps({
		schemas: map(fromMerchantSchemaSummaryDTO)
	})

const fromMerchantSchemaDTO =
	mapProps({
		created: toDate
	})

const toNewMerchantSchemaDTO =
	mapProps({})

module.exports = {
	fromMerchantSchemaSummariesDTO,
	fromMerchantSchemaSummaryDTO,
	fromMerchantSchemaDTO,
	toNewMerchantSchemaDTO
}
