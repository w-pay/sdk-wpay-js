"use strict";

exports.aNewBasket = () => ({
	items: [
		{
			label: "Item 1",
			description: "This is item 1",
			quantity: 3,
			unitPrice: 2.1,
			unitMeasure: "EACH",
			totalPrice: 6.3,
			tags: (function() {
				const tags = new Map();
				tags.set("property1", "string");
				tags.set("property2", "string");

				return tags;
			}())
		}
	]
});

exports.basketDTO = () => ({
	items: [
		{
			label: "Item 1",
			description: "This is item 1",
			quantity: 3,
			unitPrice: 2.1,
			unitMeasure: "EACH",
			totalPrice: 6.3,
			tags: {
				property1: "string",
				property2: "string"
			}
		}
	]
})
