"use strict";

const { assertThat, defined, is } = require("hamjest");

const { objFrom, mapFrom } = require("./map-matchers");

exports.basketFrom = (dto) => ({
	matches(actual) {
		const items = actual.items;

		assertThat(items, is(defined()));
		assertThat(items.length, is(dto.items.length));

		items.forEach((item, i) => {
			assertThat(item, is(basketItemFrom(dto.items[i])));
		});

		return true;
	},

	describeTo(description) {
		description.append(`A Basket from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

exports.basketDTOFrom = (model) => ({
	matches(actual) {
		const items = actual.items;

		assertThat(items, is(defined()));
		assertThat(items.length, is(model.items.length));

		items.forEach((item, i) => {
			assertThat(item, is(basketItemDTOFrom(model.items[i])));
		});

		return true;
	},

	describeTo(description) {
		description.append(`A BasketDTO from ${JSON.stringify(model)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const basketItemFrom = (dto) => ({
	matches(actual) {
		assertThat(actual, is(defined()));
		assertThat(actual.label, is(dto.label));
		assertThat(actual.description, is(dto.description));
		assertThat(actual.quantity, is(dto.quantity));
		assertThat(actual.unitPrice, is(dto.unitPrice));
		assertThat(actual.unitMeasure, is(dto.unitMeasure));
		assertThat(actual.totalPrice, is(dto.totalPrice));
		assertThat(actual.tags, is(defined()));
		assertThat(actual.tags, is(mapFrom(dto.tags)));

		return true;
	},

	describeTo(description) {
		description.append("An item with all properties");
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const basketItemDTOFrom = (model) => ({
	matches(actual) {
		assertThat(actual, is(defined()));
		assertThat(actual.label, is(model.label));
		assertThat(actual.description, is(model.description));
		assertThat(actual.quantity, is(model.quantity));
		assertThat(actual.unitPrice, is(model.unitPrice));
		assertThat(actual.unitMeasure, is(model.unitMeasure));
		assertThat(actual.totalPrice, is(model.totalPrice));
		assertThat(actual.tags, is(defined()));
		assertThat(actual.tags, is(objFrom(model.tags)));

		return true;
	},

	describeTo(description) {
		description.append("An item with all properties");
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});
