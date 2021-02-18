"use strict";

const objectToMap = (obj) => {
	return Object.keys(obj).reduce((map, key) => {
		const value = obj[key];

		if (typeof value === "object" && !Array.isArray(value)) {
			return map.set(key, objectToMap(value));
		}

		return map.set(key, obj[key]);
	}, new Map());
}

module.exports = {
	objectToMap
}
