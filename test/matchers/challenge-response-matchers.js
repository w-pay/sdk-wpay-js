"use strict";

const { assertThat, is } = require("hamjest");

const { uppercase } = require("./string-matchers");

const challengeResponsesDTOFrom = (challengeResponses = []) => ({
	matches(actual) {
		assertThat(actual.challengeResponses.length, is(challengeResponses.length));

		actual.challengeResponses.forEach((response, i) => {
			assertThat(response, is(challengeResponseFrom(challengeResponses[i])));
		});

		return true;
	},

	describeTo(description) {
		description.append(`A ChallengeResponse from ${JSON.stringify(challengeResponses)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const challengeResponseFrom = (dto) => ({
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
});

module.exports = {
	challengeResponsesDTOFrom,
	challengeResponseFrom
};
