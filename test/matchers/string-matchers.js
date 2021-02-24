"use strict";

const { anyOf, equalTo } = require("hamjest");

exports.blankOrMissingString = () => {
	return anyOf(equalTo(undefined), equalTo(null), equalTo(""));
}

exports.uppercase = (str) => {
	return {
		matches(actual) {
			return actual === str.toUpperCase()
		},

		describeTo(description) {
			description.append(str.toUpperCase());
		},

		describeMismatch(value, description) {
			description.appendValue(value);
		}
	}
}
