"use strict";

const chain = require("crocks/pointfree/chain");
const compose = require("crocks/helpers/compose");
const resultToAsync = require("crocks/Async/resultToAsync");
const tryCatch = require("crocks/Result/tryCatch");

const { getPropOrError } = require("../helpers/props");

// fromMeta :: (Object -> Object) -> Object -> Async Error Object
const fromMeta = (fn) => compose(resultToAsync, chain(tryCatch(fn)), getPropOrError("meta"));

module.exports = {
	fromMeta
};
