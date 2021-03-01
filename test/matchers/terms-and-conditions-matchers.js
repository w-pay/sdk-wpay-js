"use strict";

const { assertThat, is } = require("hamjest");

const { mapFrom } = require("./map-matchers");

exports.termsAndConditionsAcceptancesDTOFrom = (dto) => ({
	matches(item) {
		assertThat(item.termsAndConditionsAcceptances.length, is(dto.termsAndConditionsAcceptances.length));

		item.termsAndConditionsAcceptances.forEach((termsAndConditionsAcceptance, i) => {
			assertThat(termsAndConditionsAcceptance, is(termsAndConditionsAcceptanceDTOFrom(dto.termsAndConditionsAcceptances[i])));
		});

		return true;
	},

	describeTo(description) {
		description.append(`A TermsAndConditionsAcceptances from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});


const termsAndConditionsAcceptanceDTOFrom = (dto) => ({
	matches(actual) {
		assertThat(actual, is(mapFrom(dto)));

		return true;
	},

	describeTo(description) {
		description.append(`A TermsAndConditionsAcceptance from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});