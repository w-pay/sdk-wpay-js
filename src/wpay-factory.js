"use strict";

const ap = require("crocks/pointfree/ap");
const compose = require("crocks/helpers/compose");
const curry = require("crocks/core/curry");
const either = require("crocks/pointfree/either");
const fanout = require("crocks/Pair/fanout");
const identity = require("crocks/combinators/identity");
const map = require("crocks/pointfree/map");
const merge = require("crocks/pointfree/merge");
const pipe = require("crocks/helpers/pipe");
const pipeK = require("crocks/helpers/pipeK");

const { addHeaders, jsonMarshaller, resolveUrl } = require("@api-sdk-creator/http-api-client");

const { defaultHeaders } = require("./headers/default-headers");
const { getPropOrError } = require("./helpers/props");
const { resultHandler } = require("./api/result-handler");

// sdkApiClient :: HttpClientFactory -> String -> RequestHeadersFactory -> SdkApiClient
const sdkApiClient = curry((httpClient, baseUrl, headers) =>
	pipeK(
		resolveUrl(baseUrl),
		addHeaders(headers),
		jsonMarshaller(),
		httpClient(),
		resultHandler()
	)
);

const throwError = (err) => {
	throw err;
};

// createApiClient :: HttpClientFactory -> Object -> SdkApiClient
const createApiClient = (httpClient) =>
	pipe(
		fanout(defaultHeaders, compose(map(sdkApiClient(httpClient)), getPropOrError("baseUrl"))),
		merge(ap),
		either(throwError, identity)
	);

module.exports = {
	createApiClient: curry(createApiClient)
};
