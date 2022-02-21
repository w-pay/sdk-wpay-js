"use strict";

const getPropOr = require("crocks/helpers/getPropOr");
const objOf = require("crocks/helpers/objOf");
const pipe = require("crocks/helpers/pipe");

const { toUpperCase } = require("../helpers/props");

exports.fromHealthCheckDTO = pipe(
	getPropOr(undefined, "healthCheck"),
	toUpperCase,
	objOf("result")
);
