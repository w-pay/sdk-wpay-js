"use strict";

exports.aNewBasket = () =>
	new TestBasket();

class TestBasket {
	constructor() {
		this.items = [ new TestBasketItem() ];
	}
}

class TestBasketItem {
	constructor() {
		this.label = "Item 1";
		this.description = "This is item 1";
		this.quantity = 3;
		this.unitPrice = 2.1;
		this.unitMeasure = "EACH";
		this.totalPrice = 6.3;
		this.tags = (function() {
			const tags = new Map();
			tags.set("property1", "string");
			tags.set("property2", "string");

			return tags;
		})();
	}
}
