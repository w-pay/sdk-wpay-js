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
			tags: {
				property1: "string",
				property2: "string"
			}
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
});
