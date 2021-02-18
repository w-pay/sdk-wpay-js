"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const chain = require("crocks/pointfree/chain");
const map = require("crocks/pointfree/map");
const objOf = require("crocks/helpers/objOf");
const pipe = require("crocks/helpers/pipe");
const resultToAsync = require("crocks/Async/resultToAsync");

const { HttpRequestMethod } = require("@sdk-creator/http-api-client");

const { getPropOrError, toUpperCase } = require("../helpers/props");

const checkHealth = (client) => () =>
	pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			chain(getPropOrError("healthCheck")),
			map(pipe(toUpperCase, objOf("result"))),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.GET,
		url: "/",
	})

module.exports = (client) => {
	/** @implements {import('../../types/api/Administration').AdministrationApi} */
	return {
		checkHealth: checkHealth(client)
	};
}
