"use strict";

const Assign = require("crocks/Assign");

const compose = require("crocks/helpers/compose");
const curry = require("crocks/helpers/curry");
const isDefined = require("crocks/predicates/isDefined");
const map = require("crocks/pointfree/map");
const mreduce = require("crocks/helpers/mreduce");
const objOf = require("crocks/helpers/objOf");
const option = require("crocks/pointfree/option");
const safe = require("crocks/Maybe/safe");

// optionalParam = String -> a -> Object
const optionalParam = (name) => compose(option({}), map(objOf(name)), safe(isDefined));

// params = [ Objects ] -> Object
const params = mreduce(Assign);

module.exports = {
	optionalParam: curry(optionalParam),
	params
};
