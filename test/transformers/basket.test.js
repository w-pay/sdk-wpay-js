"use strict";

const { assertThat, is } = require("hamjest");

const { fromBasketDTO, toBasketDTO } = require("../../src/transformers/basket");

const { aNewBasket } = require("../data/test-basket");

describe("Basket Transformers", function () {
	describe("to DTO", function () {
		const basket = aNewBasket();

		it("should convert tags from map", function () {
			const dto = toBasketDTO(basket);

			assertThat(dto.items[0].tags["property1"], is("string"));
		});
	});

	describe("from DTO", function () {
		const dto = {
			items: [
				{
					tags: {
						key: "value"
					}
				}
			]
		};

		it("should convert tags to map", function() {
			const basket = fromBasketDTO(dto);

			assertThat(basket.items[0].tags.get("key"), is("value"));
		});
	});
});
