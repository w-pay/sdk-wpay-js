"use strict";

const { assertThat, defined, is } = require("hamjest");

const body = (dataMatcher, metaMatcher = withEmptyMeta()) => ({
	matches(actual) {
		assertThat(actual.data, is(dataMatcher));
		assertThat(actual.meta, is(metaMatcher));

		return true;
	},

	describeTo(description) {
		description.append(`An API request body`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
})

const withData = (matcher) => ({
	matches(actual) {
		assertThat(actual, is(defined()));
		assertThat(actual, is(matcher));

		return true;
	},

	describeTo(description) {
		description.append(`API request data`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
})

const withEmptyMeta = () => ({
	matches(actual) {
		assertThat(actual, is(defined()));
		assertThat(actual, is({}));

		return true;
	},

	describeTo(description) {
		description.append(`A empty meta object`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
})

module.exports = {
	body,
	withData,
	withEmptyMeta
}
