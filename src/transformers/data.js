"use strict";

const chain = require("crocks/pointfree/chain");
const compose = require("crocks/helpers/compose");
const curry = require("crocks/core/curry");
const resultToAsync = require("crocks/Async/resultToAsync");
const tryCatch = require("crocks/Result/tryCatch");

const { getPropOrError } = require("../helpers/props");

// fromData :: (Object -> Object) -> Object -> Async Error Object
const fromData = (fn) => compose(resultToAsync, chain(tryCatch(fn)), getPropOrError("data"));

module.exports = {
	fromData: curry(fromData)
};
