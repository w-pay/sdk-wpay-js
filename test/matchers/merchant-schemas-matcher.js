"use strict";

const { assertThat, equalTo, is } = require("hamjest");

const { dateFrom } = require("./date-matchers");

const merchantSchemaSummariesFrom = (dto) => ({
	matches(item) {
		const schemas = item.schemas;

		assertThat(schemas.length, is(dto.schemas.length));

		schemas.forEach((schema, i) => {
			assertThat(schema, is(merchantSchemaSummaryFrom(dto.schemas[i])));
		});

		return true;
	},

	describeTo(description) {
		description.append(`A MerchantSchemaSummaries from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const merchantSchemaSummaryFrom = (dto) => ({
	matches(item) {
		assertThat(item.schemaId, is(dto.schemaId));
		assertThat(item.type, is(dto.type));
		assertThat(item.description, is(dto.description));
		assertThat(item.created, is(dateFrom(dto.created)));

		return true;
	},

	describeTo(description) {
		description.append(`A MerchantSchemaSummary from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const merchantSchemaFrom = (dto) => ({
	matches(item) {
		assertThat(item.schema, is(equalTo(dto.schema)));
		assertThat(item.type, is(dto.type));
		assertThat(item.description, is(dto.description));
		assertThat(item.created, is(dateFrom(dto.created)));

		return true;
	},

	describeTo(description) {
		description.append(`A MerchantSchema from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const newMerchantSchemaDTOFrom = (model) => ({
	matches(item) {
		assertThat(item.schema, is(equalTo(model.schema)));
		assertThat(item.type, is(model.type));
		assertThat(item.description, is(model.description));

		return true;
	},

	describeTo(description) {
		description.append(`A NewMerchantSchema from ${JSON.stringify(model)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
})

module.exports = {
	merchantSchemaFrom,
	merchantSchemaSummariesFrom,
	merchantSchemaSummaryFrom,
	newMerchantSchemaDTOFrom
}
