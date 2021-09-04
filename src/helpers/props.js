"use strict";

const { getProp } = require("@epistemology-factory/crocks-ext/Result");

// getPropOrError :: String -> Object -> Result Error a
const getPropOrError = getProp((prop) => new Error(`'${prop}' is mandatory and missing`));

// toDate :: String -> Date
const toDate = (s) => new Date(s);

// toISOString :: Date -> String
const toISOString = (d) => d.toISOString();

// toUpperCase :: String -> String
const toUpperCase = (s) => s.toUpperCase();

// toURL :: String -> URL
const toURL = (s) => new URL(s);

module.exports = {
	getPropOrError,
	toDate,
	toISOString,
	toUpperCase,
	toURL
};
