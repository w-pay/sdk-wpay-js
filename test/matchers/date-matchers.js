"use strict";

const { assertThat, equalTo, instanceOf, is, string } = require("hamjest");

exports.dateFrom = (str) => ({
	matches(actual) {
		assertThat(actual, instanceOf(Date));
		assertThat(actual.toISOString(), is(str));

		return true;
	},

	describeTo(description) {
		description.append(`A Date from ${str}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

exports.isoStringFrom = (date) => ({
	matches(actual) {
		assertThat(actual, is(string()));
		assertThat(actual, is(equalTo(date.toISOString())));

		return true;
	},

	describeTo(description) {
		description.append(`An ISO string from ${date.toString()}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});
