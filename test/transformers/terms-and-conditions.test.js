"use strict";

const { assertThat, is } = require("hamjest");
const {
	fromTermsAndConditionsAcceptancesDTO
} = require("../../src/transformers/terms-and-conditions");
const { termsAndConditionsDTO } = require("../data/terms-and-conditions");
const {
	termsAndConditionsAcceptancesDTOFrom
} = require("../matchers/terms-and-conditions-matchers");

describe("Terms and Conditions Transformers", function () {
	describe("from DTO", function () {
		it("should convert terms and conditions", function () {
			const dto = termsAndConditionsDTO();

			assertThat(
				fromTermsAndConditionsAcceptancesDTO(dto),
				is(termsAndConditionsAcceptancesDTOFrom(dto))
			);
		});
	});
});
