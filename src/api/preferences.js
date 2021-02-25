"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const curry = require("crocks/core/curry");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { fromData } = require("../transformers/data");
const { mapToObject } = require("../transformers/map");
const { objectToMap } = require("../transformers/object");
const { requiredParameterError } = require("./api-errors");

// getPreferences :: HttpRequest -> HttpApiClient -> () -> Async Error Preferences
const getPreferences = curry((request, client, _) => {
	return asyncToPromise(
		pipeK(
			client,
			fromData(objectToMap)
		)({
			...request,
			method: HttpRequestMethod.GET
		})
	);
});

// getPreferences :: HttpRequest -> HttpApiClient -> Preferences -> Async Error _
const setPreferences = curry((request, client, preferences) => {
	if (!preferences) {
		throw requiredParameterError("preferences");
	}

	return asyncToPromise(
		pipeK(client)({
			...request,
			method: HttpRequestMethod.POST,
			body: {
				data: mapToObject(preferences),
				meta: {}
			}
		})
	);
});

module.exports = {
	getPreferences,
	setPreferences
};
