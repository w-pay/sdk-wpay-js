"use strict";

const { assertThat, is } = require("hamjest");

const {
	fromChallengeResponseDTO,
	toChallengeResponseDTO
} = require("../../src/transformers/challenge-response");

const { aChallengeResponse, challengeResponseDTO } = require("../data/challenge-response");
const { challengeResponseFrom } = require("../matchers/challenge-response-matchers");

describe("ChallengeResponse Transformers", function() {
	describe("to DTO", function() {
		it("should pass through object", function() {
			const challengeResponse = aChallengeResponse();

			assertThat(toChallengeResponseDTO(challengeResponse), is(challengeResponse));
		})
	});

	describe("from DTO", function() {
		it("should convert dto to challenge response", function() {
			const dto = challengeResponseDTO();

			assertThat(fromChallengeResponseDTO(dto), is(challengeResponseFrom(dto)));
		});
	});
});
