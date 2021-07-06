const { assertThat, is } = require("hamjest");

const { fraudPayloadDTOFrom } = require("./fraud-payload-matchers");
const { challengeResponsesDTOFrom } = require("./challenge-response-matchers");

exports.paymentMetaDTOFrom = (challengeResponses = undefined, fraudPayload = undefined) => ({
	matches(actual) {
		if (challengeResponses && challengeResponses.length > 0) {
			assertThat(actual.challengeResponses.length, is(challengeResponses.length));
			assertThat(actual, is(challengeResponsesDTOFrom(challengeResponses)));
		} else {
			assertThat(actual.challengeResponses, is(undefined));
		}

		if (fraudPayload) {
			assertThat(actual, is(fraudPayloadDTOFrom(fraudPayload)));
		} else {
			assertThat(actual.fraud, is(undefined));
		}

		return true;
	},

	describeTo(description) {
		description.append(
			`Payment meta containing ${JSON.stringify({
				challengeResponses,
				fraudPayload
			})}`
		);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});
