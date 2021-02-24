"use strict";

const { assertThat, equalTo, is } = require("hamjest");

exports.urlFrom = (str) => ({
	matches(actual) {
		assertThat(actual.toString(), is(equalTo(str)));

		return true;
	},

	describeTo(description) {
		description.append(`A URL from ${str}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
})
