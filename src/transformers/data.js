"use strict";

const Async = require("crocks/Async");
const curry = require("crocks/core/curry");
const either = require("crocks/pointfree/either");
const identity = require("crocks/combinators/identity");
const map = require("crocks/pointfree/map");
const pipe = require("crocks/helpers/pipe");
const resultToAsync = require("crocks/Async/resultToAsync");
const tryCatch = require("crocks/Result/tryCatch");

const { getPropOrError } = require("../helpers/props");

// transform :: (Object -> Object) -> Object -> Async Error Object
const transform = curry((fn, obj) => pipe(tryCatch(fn), resultToAsync)(obj));

// fromData :: (Object -> Object) -> Object -> Async Error Object
const fromData = curry((fn, obj) =>
	pipe(getPropOrError("data"), map(transform(fn)), either(Async.Rejected, identity))(obj)
);

module.exports = {
	transform,
	fromData: fromData
};
