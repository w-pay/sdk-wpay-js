"use strict";

const { anyOf, equalTo } = require("hamjest");

exports.blankOrMissingString = () => {
	return anyOf(equalTo(undefined), equalTo(null), equalTo(""));
}
