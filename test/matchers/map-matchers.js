"use strict";

const { assertThat, instanceOf, is, object } = require("hamjest");

const mapFrom = (obj) => ({
	matches(actual) {
		const keys = Object.keys(obj);

		assertThat(actual, instanceOf(Map));
		assertThat(actual.size, is(keys.length));

		const equalProps = (key) => {
			const a = actual.get(key);
			const b = obj[key];

			if (a instanceof Map) {
				assertThat(a, is(mapFrom(b)));

				return true;
			}

			return a === b;
		};

		return keys.reduce((acc, key) => acc && equalProps(key), true);
	},

	describeTo(description) {
		description.append(`A Map from ${JSON.stringify(obj)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const objFrom = (map) => ({
	matches(actual) {
		assertThat(actual, object());
		assertThat(Object.keys(actual).length, is(map.size));

		let result = true;

		const equalValues = (a, b) => {
			if (b instanceof Map) {
				assertThat(a, is(objFrom(b)));

				return true;
			}

			return a === b;
		};

		map.forEach((value, key) => result && equalValues(actual[key], value));

		return result;
	},

	describeTo(description) {
		description.append(`An object from ${map.toString()}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

module.exports = {
	mapFrom,
	objFrom
};
