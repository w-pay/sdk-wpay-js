"use strict";

const { assertThat, is } = require("hamjest");

const { uppercase } = require("./string-matchers");

exports.healthCheckFrom = (dto) => ({
	matches(actual) {
		assertThat(actual.result, is(uppercase(dto.healthCheck)));

		return true;
	},

	describeTo(description) {
		description.append(`A HealthCheck from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
})
