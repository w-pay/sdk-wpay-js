"use strict";

const identity = require("crocks/combinators/identity");
const either = require("crocks/pointfree/either");
const map = require("crocks/pointfree/map");
const objOf = require("crocks/helpers/objOf");
const pipe = require("crocks/helpers/pipe");

const { getPropOrError } = require("../helpers/props");
const { toUpperCase } = require("../helpers/props");

exports.fromHealthCheckDTO =
	pipe(
		getPropOrError("healthCheck"),
		map(pipe(toUpperCase, objOf("result"))),
		either((err) => { throw err }, identity)
	)
