"use strict";

const mapProps = require("crocks/helpers/mapProps");

const { toDate } = require("../helpers/props");

// fromSchemaDTO :: Object -> Object
const fromSchemaDTO =
	mapProps({
		created: toDate
	})

module.exports = {
	fromSchemaDTO
}
