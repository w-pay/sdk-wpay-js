"use strict";

const map = require("crocks/pointfree/map");
const mapProps = require("crocks/helpers/mapProps");

const { mapToObject } = require("./map");
const { objectToMap } = require("./object");

// fromBasketDTO :: a -> Basket
const fromBasketDTO = mapProps({
	items: map(
		mapProps({
			tags: objectToMap
		})
	)
});

// toBasketDTO :: Basket -> a
const toBasketDTO = mapProps({
	items: map(
		mapProps({
			tags: mapToObject
		})
	)
});

module.exports = {
	fromBasketDTO,
	toBasketDTO
};
