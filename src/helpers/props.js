"use strict";

const curry = require("crocks/core/curry");
const getProp = require("crocks/Maybe/getProp");
const maybeToResult = require("crocks/Result/maybeToResult");

// getPropOrError :: String -> Object -> Result Error a
const getPropOrError = curry((prop, obj) =>
	maybeToResult(new Error(`'${prop}' is mandatory and missing`), getProp(prop, obj))
);

module.exports = {
	getPropOrError
}
