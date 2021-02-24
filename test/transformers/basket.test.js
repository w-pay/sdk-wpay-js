"use strict";

const { assertThat, is } = require("hamjest");

const { fromBasketDTO, toBasketDTO } = require("../../src/transformers/basket");

const { aNewBasket, basketDTO } = require("../data/basket");
const { basketFrom } = require("../matchers/basket-matchers");

describe("Basket Transformers", function () {
	describe("to DTO", function () {
		it("should convert tags from map", function () {
			const dto = toBasketDTO(aNewBasket());

			assertThat(dto.items[0].tags["property1"], is("string"));
		});
	});

	describe("from DTO", function () {
		it("should convert dto to basket", function() {
			const dto = basketDTO();

			assertThat(fromBasketDTO(dto), is(basketFrom(dto)));
		});
	});
});
