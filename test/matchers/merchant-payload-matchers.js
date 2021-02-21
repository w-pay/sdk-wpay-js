"use strict";

const { allOf, assertThat, defined, instanceOf, is, not } = require("hamjest");

const { blankOrMissingString } = require("./string-matchers");

exports.isDynamicPayload = () =>
	new PayloadMatcher();

class PayloadMatcher {
	matches(item) {
		assertThat(item.schemaId, not(blankOrMissingString()));
		assertThat(item.payload, is(allOf(defined(), instanceOf(Map))));

		return true;
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}

	describeTo(description) {
		description.append("Payload details");
	}
}
