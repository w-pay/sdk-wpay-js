"use strict";

/** @implements {import('../../types/api/ApiErrors').ApiException} */
class ApiException extends Error {}

/** @implements {import('../../types/api/ApiErrors').JsonParsingException} */
class JsonParsingException extends ApiException {
	constructor(message, details) {
		super(message);

		this.details = details;
	}
}

/** @implements {import('../../types/api/ApiErrors').HttpErrorException} */
class HttpErrorException extends ApiException {
	constructor(statusCode, responseHeaders, responseBody) {
		super(
			(function () {
				switch (statusCode) {
					case 400:
						return "Invalid Input";
					case 401:
						return "Unauthorized";
					case 422:
						return "Processing Error";
					default:
						return "Server Error";
				}
			})()
		);

		this.statusCode = statusCode;
		this.responseHeaders = responseHeaders;
		this.responseBody = responseBody;
	}
}

const requiredParameterError = (name) => new Error(`'${name}' is mandatory`);

module.exports = {
	JsonParsingException,
	HttpErrorException,
	requiredParameterError
};
