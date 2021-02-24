"use strict";

const mapProps = require("crocks/helpers/mapProps");

const { toDate, toISOString, toUpperCase } = require("../helpers/props");

const fromQrDTO =
	mapProps({
		referenceType: toUpperCase,
		expiryTime: toDate
	})

const toQrDTO =
	mapProps({
		expiryTime: toISOString
	})

module.exports = {
	fromQrDTO,
	toQrDTO
}
