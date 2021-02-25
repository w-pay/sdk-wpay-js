"use strict";

const identity = require("crocks/combinators/identity");
const pipeK = require("crocks/helpers/pipeK");

const { addHeaders, jsonMarshaller, resolveUrl } = require("@api-sdk-creator/http-api-client");

const { defaultHeaders } = require("./headers/default-headers");
const { resultHandler } = require("./api/result-handler");

const createApiClient = (httpClient, options) => {
	const headers = defaultHeaders(options).either((err) => {
		throw err;
	}, identity);

	return pipeK(
		// TODO: Test for this
		resolveUrl(options.baseUrl),
		addHeaders(headers),
		jsonMarshaller(),
		httpClient(),
		resultHandler()
	);
};

module.exports = {
	createApiClient
};
