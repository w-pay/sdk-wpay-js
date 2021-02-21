"use strict";

const mapToObject = (map) => {
	const obj = {}

	map.forEach((value, key) => {
		if (value instanceof Map) {
			return obj[key] = mapToObject(value);
		}

		obj[key] = value;
	});

	return obj;
};

module.exports = {
	mapToObject
}
