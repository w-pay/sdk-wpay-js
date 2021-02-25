"use strict";

const Async = require("crocks/Async");

const bimap = require("crocks/pointfree/bimap");
const curry = require("crocks/core/curry");
const identity = require("crocks/combinators/identity");
const ifElse = require("crocks/logic/ifElse");
const pipe = require("crocks/helpers/pipe");
const pipeK = require("crocks/helpers/pipeK");

const {
	extractHttpBody,
	getHttpBody,
	getHttpResponse,
	isSuccessfulResult,
	jsonUnmarshaller
} = require("@api-sdk-creator/http-api-client");

const { HttpErrorException, JsonParsingException } = require("./api-errors");

// toHttpErrorException :: HttpResult -> Async Error
const toHttpErrorException = pipe(
	getHttpResponse,
	(response) => new HttpErrorException(response.statusCode, response.headers, response.body),
	Async.Rejected
);

// isSyntaxError :: Error -> Boolean
const isSyntaxError = (err) => err.name === "SyntaxError";

// toParsingError :: HttpResult -> Error -> JsonParsingException
const toParsingError = curry((result, error) => {
	const body = pipe(getHttpResponse, getHttpBody)(result);

	return ifElse(
		isSyntaxError,
		(err) => {
			const details = new Map();
			details.set("body", body);

			return new JsonParsingException(err.message, details);
		},
		identity
	)(error);
});

// unmarshallBodyOrError :: HttpResult -> Async Error HttpResult
const unmarshallBodyOrError = (result) =>
	pipe(jsonUnmarshaller(), bimap(toParsingError(result), identity))(result);

// resultHandler :: () -> HttpResult -> Async Error a
const resultHandler = () =>
	ifElse(
		isSuccessfulResult,
		pipeK(unmarshallBodyOrError, extractHttpBody),
		toHttpErrorException
	);

module.exports = {
	resultHandler
};
