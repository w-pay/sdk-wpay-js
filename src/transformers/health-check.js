"use strict";

const compose = require("crocks/helpers/compose");
const map = require("crocks/pointfree/map");
const objOf = require("crocks/helpers/objOf");
const pipe = require("crocks/helpers/pipe");

const { getPropOrError } = require("../helpers/props");
const { toUpperCase } = require("../helpers/props");

exports.fromHealthCheckDTO = pipe(
	getPropOrError("healthCheck"),
	map(compose(objOf("result"), toUpperCase))
);
