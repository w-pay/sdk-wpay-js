"use strict";

const curry = require("crocks/core/curry");
const getProp = require("crocks/Maybe/getProp");
const maybeToResult = require("crocks/Result/maybeToResult");

// getPropOrError :: String -> Object -> Result Error a
const getPropOrError = curry((prop, obj) =>
	maybeToResult(new Error(`'${prop}' is mandatory and missing`), getProp(prop, obj))
);

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
