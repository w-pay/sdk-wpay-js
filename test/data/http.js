"use strict";

const { JSON_MIME_TYPE } = require("@sdk-creator/http-api-client");

function givenHttpResult(response) {
	return {
		request: {},
		response
	}
}

function givenHttpResponse(body = {}, headers = {}, statusCode = 200) {
	if (!headers["content-type"]) {
		headers["content-type"] = JSON_MIME_TYPE;
	}

	return {
		statusCode,
		headers,
		body: ((typeof body) === "object") ? JSON.stringify(body) : body
	}
}

module.exports = {
	givenHttpResponse,
	givenHttpResult
}
