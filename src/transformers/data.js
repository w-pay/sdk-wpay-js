"use strict";

const Async = require("crocks/Async");

const compose = require("crocks/helpers/compose");
const curry = require("crocks/core/curry");
const either = require("crocks/pointfree/either");
const identity = require("crocks/combinators/identity");
const map = require("crocks/pointfree/map");
const pipe = require("crocks/helpers/pipe");
const resultToAsync = require("crocks/Async/resultToAsync");
const tryCatch = require("crocks/Result/tryCatch");

const { getPropOrError } = require("../helpers/props");

// transform :: (Object -> Object) -> Object -> Async Error Object
const transform = (fn) => compose(resultToAsync, tryCatch(fn));

// fromData :: (Object -> Object) -> Object -> Async Error Object
const fromData = (fn) =>
	pipe(getPropOrError("data"), map(transform(fn)), either(Async.Rejected, identity));

module.exports = {
	transform: curry(transform),
	fromData: curry(fromData)
};
