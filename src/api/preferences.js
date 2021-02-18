"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const chain = require("crocks/pointfree/chain");
const curry = require("crocks/core/curry");
const map = require("crocks/pointfree/map");
const pipe = require("crocks/helpers/pipe");
const resultToAsync = require("crocks/Async/resultToAsync");

const { HttpRequestMethod } = require("@sdk-creator/http-api-client");

const { getPropOrError } = require("../helpers/props");
const { mapToObject } = require("../transformers/map");
const { objectToMap } = require("../transformers/object");
const { requiredParameterError } = require("./api-errors");

// getPreferences :: HttpRequest -> HttpApiClient -> () -> Async Error Preferences
const getPreferences = curry((request, client, _) => {
	return pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(objectToMap),
			resultToAsync
		)),
		asyncToPromise
	)({
		...request,
		method: HttpRequestMethod.GET
	})
});

// getPreferences :: HttpRequest -> HttpApiClient -> Preferences -> Async Error _
const setPreferences = curry((request, client, preferences) => {
	if (!preferences) {
		throw requiredParameterError("preferences")
	}

	return pipe(
		client,
		asyncToPromise
	)({
		...request,
		method: HttpRequestMethod.POST,
		body: {
			data: mapToObject(preferences),
			meta: {}
		}
	})
})

module.exports = {
	getPreferences,
	setPreferences
}
