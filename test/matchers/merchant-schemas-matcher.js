"use strict";

const {
	allOf,
	assertThat,
	defined,
	greaterThan,
	instanceOf,
	is,
	not
} = require("hamjest");

const { blankOrMissingString } = require("./string-matchers");

exports.merchantSchemaSummaries = () =>
	new MerchantSchemaSummariesMatcher();

class MerchantSchemaSummariesMatcher {
	matches(item) {
		const schemaMatcher = new MerchantSummarySchemaMatcher();
		const schemas = item.schemas;

		assertThat(schemas.length, greaterThan(0));

		return schemas.reduce((result, it) => result && schemaMatcher.matches(it), true);
	}

	describeTo(description) {
		description.append("A list of schemas");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

exports.merchantSchemaSummary = () =>
	new MerchantSummarySchemaMatcher();

class MerchantSummarySchemaMatcher {
	matches(item) {
		assertThat(item.schemaId, not(blankOrMissingString()));
		assertThat(item.type, not(blankOrMissingString()));
		assertThat(item.description, not(blankOrMissingString()));
		assertThat(item.created, is(allOf(defined(), instanceOf(Date))));

		return true;
	}

	describeTo(description) {
		description.append("Merchant Schema Summary");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

exports.merchantSchema = () =>
	new MerchantSchemaMatcher();

class MerchantSchemaMatcher {
	matches(item) {
		assertThat(item.schema, is(defined()));
		assertThat(item.type, not(blankOrMissingString()));
		assertThat(item.description, not(blankOrMissingString()));
		assertThat(item.created, is(allOf(defined(), instanceOf(Date))));

		return true;
	}

	describeTo(description) {
		description.append("A Merchant Schema Summary");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}
