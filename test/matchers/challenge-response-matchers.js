"use strict";

const { assertThat, is } = require("hamjest");

const { uppercase } = require("./string-matchers");

exports.challengeResponseFrom = (dto) => ({
	matches(actual) {
		assertThat(actual.instrumentId, is(dto.instrumentId));
		assertThat(actual.type, is(uppercase(dto.type)));
		assertThat(actual.token, is(dto.token));
		assertThat(actual.reference, is(dto.reference));

		return true;
	},

	describeTo(description) {
		description.append(`A ChallengeResponse from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
})
