"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { fromHealthCheckDTO } = require("../transformers/health-check");
const { fromData } = require("../transformers/data");

const checkHealth = (client) => () =>
	asyncToPromise(pipeK(
		client,
		fromData(fromHealthCheckDTO)
	)({
		method: HttpRequestMethod.GET,
		url: "/",
	}))

module.exports = (client) => {
	/** @implements {import('../../types/api/Administration').AdministrationApi} */
	return {
		checkHealth: checkHealth(client)
	};
}
