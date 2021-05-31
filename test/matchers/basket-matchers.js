"use strict";

const { assertThat, defined, equalTo, is } = require("hamjest");

exports.basketFrom = (basket) => ({
	matches(actual) {
		const items = actual.items;

		assertThat(items, is(defined()));
		assertThat(items.length, is(basket.items.length));

		items.forEach((item, i) => {
			assertThat(item, is(basketItem(basket.items[i])));
		});

		return true;
	},

	describeTo(description) {
		description.append(`A Basket from ${JSON.stringify(basket)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const basketItem = (item) => ({
	matches(actual) {
		assertThat(actual, is(defined()));
		assertThat(actual.label, is(item.label));
		assertThat(actual.description, is(item.description));
		assertThat(actual.quantity, is(item.quantity));
		assertThat(actual.unitPrice, is(item.unitPrice));
		assertThat(actual.unitMeasure, is(item.unitMeasure));
		assertThat(actual.totalPrice, is(item.totalPrice));
		assertThat(actual.tags, is(defined()));
		assertThat(actual.tags, is(equalTo(item.tags)));

		return true;
	},

	describeTo(description) {
		description.append("An item with all properties");
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});
