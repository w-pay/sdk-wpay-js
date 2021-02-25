"use strict";

const curry = require("crocks/core/curry");
const identity = require("crocks/combinators/identity");
const pipeK = require("crocks/helpers/pipeK");

const { addHeaders, jsonMarshaller, resolveUrl } = require("@api-sdk-creator/http-api-client");

const { defaultHeaders } = require("./headers/default-headers");
const { resultHandler } = require("./api/result-handler");

// createApiClient :: HttpClientFactory -> Object -> SdkApiClient
const createApiClient = curry((httpClient, options) => {
	const headers = defaultHeaders(options).either((err) => {
		throw err;
	}, identity);

	return pipeK(
		resolveUrl(options.baseUrl),
		addHeaders(headers),
		jsonMarshaller(),
		httpClient(),
		resultHandler()
	);
});

module.exports = {
	createApiClient
};
