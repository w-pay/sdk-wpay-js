"use strict";

const Assign = require("crocks/Assign");
const curry = require("crocks/core/curry");
const isDefined = require("crocks/predicates/isDefined");
const map = require("crocks/pointfree/map");
const mreduce = require("crocks/helpers/mreduce");
const objOf = require("crocks/helpers/objOf");
const option = require("crocks/pointfree/option");
const pipe = require("crocks/helpers/pipe");
const safe = require("crocks/Maybe/safe");

// optionalParam = String -> a -> Object
const optionalParam = curry((name, prop) =>
	pipe(
		safe(isDefined),
		map(objOf(name)),
		option({})
	)(prop)
)

// params = [ Objects ] -> Object
const params = mreduce(Assign);

module.exports = {
	optionalParam,
	params
}
