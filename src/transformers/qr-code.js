"use strict";

const mapProps = require("crocks/helpers/mapProps");

const { toDate, toUpperCase } = require("../helpers/props");

const fromQrDTO =
	mapProps({
		referenceType: toUpperCase,
		expiryTime: toDate
	})

module.exports = {
	fromQrDTO
}
