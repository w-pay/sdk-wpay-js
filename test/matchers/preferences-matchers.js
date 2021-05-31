"use strict";

const { assertThat, equalTo, is } = require("hamjest");

exports.preferencesFrom = (prefs) => ({
	matches(actual) {
		assertThat(actual, is(equalTo(prefs)));

		return true;
	},

	describeTo(description) {
		description.append(`Preferences from ${JSON.stringify(prefs)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});
