"use strict";

const { assertThat, equalTo, is } = require("hamjest");

exports.dynamicPayloadFrom = (payload) => ({
	matches(actual) {
		assertThat(actual.schemaId, is(payload.schemaId));
		assertThat(actual.payload, is(equalTo(payload.payload)));

		return true;
	},

	describeTo(description) {
		description.append(`A DynamicPayload from ${JSON.stringify(payload)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});
