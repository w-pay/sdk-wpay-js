"use strict";

const { assertThat, is } = require("hamjest");

const { mapFrom, objFrom } = require("./map-matchers");

exports.preferencesFrom = (dto) => ({
	matches(actual) {
		assertThat(actual, is(mapFrom(dto)));

		return true;
	},

	describeTo(description) {
		description.append(`Preferences from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

exports.preferencesDTOFrom = (model) => ({
	matches(actual) {
		assertThat(actual, is(objFrom(model)));

		return true;
	},

	describeTo(description) {
		description.append(`Preferences from ${model.toString()}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});
