"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const chain = require("crocks/pointfree/chain");
const map = require("crocks/pointfree/map");
const pipe = require("crocks/helpers/pipe");
const resultToAsync = require("crocks/Async/resultToAsync");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { fromHealthCheckDTO } = require("../transformers/health-check");
const { getPropOrError } = require("../helpers/props");

const checkHealth = (client) => () =>
	pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(fromHealthCheckDTO),
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
