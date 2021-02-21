"use strict";

const {
	assertThat,
	defined,
	greaterThan,
	greaterThanOrEqualTo,
	is,
	not
} = require("hamjest");

const { blankOrMissingString } = require("./string-matchers");

exports.isBasket = () => {
	return new BasketMatcher();
}

class BasketMatcher {
	matches(actual) {
		const matcher = new BasketItemMatcher();
		const items = actual.items;

		assertThat(items, is(defined()));
		assertThat(items.length, greaterThanOrEqualTo(1));

		return items.reduce((result, item) => result && matcher.matches(item), true);
	}

	describeTo(description) {
		description.append("A basket with at least one item");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

class BasketItemMatcher {
	matches(actual) {
		assertThat(actual, is(defined()));
		assertThat(actual.label, not(blankOrMissingString()));
		assertThat(actual.description, not(blankOrMissingString()));
		assertThat(actual.quantity, greaterThan(0));
		assertThat(actual.unitPrice, greaterThan(0));
		assertThat(actual.unitMeasure, not(blankOrMissingString()));
		assertThat(actual.totalPrice, greaterThan(0));
		assertThat(actual.tags, is(defined()));
		assertThat(actual.tags.size, greaterThan(0));

		return true;
	}

	describeTo(description) {
		description.append("An item with all properties");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}
