"use strict";

const { assertThat, is } = require("hamjest");

const { fromPreferencesDTO, toPreferencesDTO } = require("../../src/transformers/preferences");

const { preferences, preferencesDTO } = require("../data/preferences");
const { preferencesFrom, preferencesDTOFrom } = require("../matchers/preferences-matchers");

describe("Preferences Transformers", function() {
	describe("to DTO", function() {
		it("should convert preferences", function() {
			const prefs = preferences();

			assertThat(toPreferencesDTO(prefs), is(preferencesDTOFrom(prefs)));
		});
	});

	describe("from DTO", function() {
		it("should convert preferences", function() {
			const dto = preferencesDTO();

			assertThat(fromPreferencesDTO(dto), is(preferencesFrom(dto)));
		});
	});
});
