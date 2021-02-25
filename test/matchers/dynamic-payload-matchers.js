"use strict";

const { assertThat, is } = require("hamjest");

const { mapFrom, objFrom } = require("./map-matchers");

exports.dynamicPayloadFrom = (dto) => ({
	matches(actual) {
		assertThat(actual.schemaId, is(dto.schemaId));
		assertThat(actual.payload, is(mapFrom(dto.payload)));

		return true;
	},

	describeTo(description) {
		description.append(`A DynamicPayload from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

exports.dynamicPayloadDTOFrom = (model) => ({
	matches(actual) {
		assertThat(actual.schemaId, is(model.schemaId));
		assertThat(actual.payload, is(objFrom(model.payload)));

		return true;
	},

	describeTo(description) {
		description.append(`A DynamicPayloadDTO from ${model.toString()}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});
