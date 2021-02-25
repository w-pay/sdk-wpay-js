"use strict";

const mapProps = require("crocks/helpers/mapProps");

const { mapToObject } = require("./map");
const { objectToMap } = require("./object");

const fromDynamicPayloadDTO = mapProps({
	payload: objectToMap
});

const toDynamicPayloadDTO = mapProps({
	payload: mapToObject
});

module.exports = {
	fromDynamicPayloadDTO,
	toDynamicPayloadDTO
};
