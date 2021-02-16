"use strict";

const identity = require("crocks/combinators/identity");
const pipeK = require("crocks/helpers/pipeK");

const { addHeaders, jsonMarshaller, jsonUnmarshaller, resolveUrl } = require("@sdk-creator/http-api-client");

const { defaultHeaders } = require("./headers/default-headers");

const createApiClient = (httpClient, token, options) => {
	// TODO: Replace me when token is part of the options
	options.accessToken = token;

	const headers = defaultHeaders(options)
		.either((err) => { throw err }, identity);

	return pipeK(
		// TODO: Test for this
		resolveUrl(options.baseUrl),
		addHeaders(headers),
		jsonMarshaller(),
		httpClient(),
		jsonUnmarshaller()
	)
}

module.exports = {
	createApiClient
}
