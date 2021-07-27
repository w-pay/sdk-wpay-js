"use strict";

const { assertThat, is } = require("hamjest");

exports.fraudPayloadDTOFrom = (fraudPayload) => ({
	matches(actual) {
		assertThat(actual.fraud.message, is(fraudPayload.message));
		assertThat(actual.fraud.provider, is(fraudPayload.provider));
		assertThat(actual.fraud.format, is(fraudPayload.format));
		assertThat(actual.fraud.responseFormat, is(fraudPayload.responseFormat));
		assertThat(actual.fraud.version, is(fraudPayload.version));

		return true;
	},

	describeTo(description) {
		description.append(`A Fraud Payload from ${JSON.stringify(fraudPayload)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});
